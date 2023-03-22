import axios from "axios";
import { useEffect, useState } from "react";

interface Comment {
    commentId: string;
    content: string;
}

interface Props {
    postId: string;
}

export const CommentList = ({ postId }: Props) => {
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        const getComment = async () => {
            const { data } = await axios.get(
                `http://localhost:4001/posts/${postId}/comments`
            );
            setComments(data);
        };

        getComment();
    }, []);

    return (
        <ul className="list-disc list-inside">
            {Object.values(comments).map((comment: Comment) => (
                <li key={comment.commentId}>{comment.content}</li>
            ))}
        </ul>
    );
};
