import axios from "axios";
import { useState } from "react";

interface Props {
    postId: string;
}

export const CommentCreate = ({ postId }: Props) => {
    const [content, setContent] = useState<string>("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
            content,
        });
        setContent("");
    };

    return (
        <form className="flex flex-col space-y-2" onSubmit={handleSubmit}>
            <label className="text-lg">New Comment</label>
            <input
                className="border rounded p-2 focus:outline-none text-gray-700"
                value={content}
                onChange={(e: any) => setContent(e.target.value)}
            />
            <button
                className="rounded bg-gray-800 py-2 px-5 text-white w-fit"
                type="submit"
            >
                Submit
            </button>
        </form>
    );
};
