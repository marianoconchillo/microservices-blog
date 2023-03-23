interface Comment {
    id: string;
    content: string;
    status: "approved" | "rejected" | "pending";
}

interface Props {
    comments: Comment[];
}

export const CommentList = ({ comments }: Props) => {
    return (
        <ul className="list-disc list-inside">
            {Object.values(comments).map((comment: Comment) => (
                <li key={comment.id}>
                    {comment.status === "approved"
                        ? `${comment.content}`
                        : comment.status === "pending"
                        ? `This comment is awaiting moderation`
                        : `This comment has been rejected`}
                </li>
            ))}
        </ul>
    );
};
