import { PostCreate } from "./PostCreate";
import { PostList } from "./PostList";

const App = () => {
    return (
        <div className="container mx-auto p-5 flex flex-col space-y-5">
            <h1 className="text-3xl">Create Post</h1>
            <PostCreate />
            <hr className="w-1/2" />
            <h1 className="text-3xl">Posts</h1>
            <PostList />
        </div>
    );
};

export default App;
