import axios from "axios";
import { useEffect, useState } from "react";
import { CommentCreate } from "./CommentCreate";
import { CommentList } from "./CommentList";

interface Post {
    id: string;
    title: string;
}

export const PostList = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const getPosts = async () => {
            const { data } = await axios.get("http://localhost:4000/posts");
            setPosts(data);
        };

        getPosts();
    }, []);

    return (
        <div className="flex flex-row space-x-5">
            {Object.values(posts).map((post: Post) => (
                <div
                    className="max-w-sm rounded overflow-hidden shadow-lg bg-sky-500/50 px-6 py-4"
                    key={post.id}
                >
                    <div className="font-bold text-xl mb-2">{post.title}</div>
                    <CommentList postId={post.id} />
                    <CommentCreate postId={post.id} />
                </div>
            ))}
        </div>
    );
};
