import axios from "axios";
import { useState } from "react";

export const PostCreate = () => {
    const [title, setTitle] = useState<string>("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        await axios.post("http://localhost:4000/posts", {
            title,
        });

        setTitle("");
    };

    return (
        <div className="py-2 w-1/2">
            <form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
                <label className="text-2xl">Title</label>
                <input
                    className="border rounded p-2 focus:outline-none text-gray-700"
                    placeholder="Post title ..."
                    value={title}
                    onChange={(e: any) => setTitle(e.target.value)}
                />
                <button
                    className="rounded-full bg-gray-800 w-1/3 py-2 text-white"
                    type="submit"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};
