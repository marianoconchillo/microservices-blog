import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

const posts = {};

const handleEvent = (type, data) => {
    if (type === "PostCreated") {
        const { id, title } = data;
        posts[id] = { id, title, comments: [] };
    }

    if (type === "CommentCreated") {
        const { id, content, postId, status } = data;
        const post = posts[postId];
        post.comments.push({ id, content, status });
    }

    if (type === "CommentUpdated") {
        const { id, content, postId, status } = data;
        const post = posts[postId];
        const comment = post.comments.find((comment) => comment.id === id);
        comment.status = status;
        comment.content = content;
    }
};

app.get("/posts", (req, res) => {
    res.send(posts);
});

app.post("/events", (req, res) => {
    const { type, data } = req.body;
    handleEvent(type, data);
    res.send({});
});

const PORT = 4002;

app.listen(PORT, async () => {
    console.log(`Server running on PORT ${PORT}`);
    try {
        const { data } = await axios.get("http://localhost:4005/events");

        data.forEach((event) => {
            console.log("Processing event: ", event.type);
            handleEvent(event.type, event.data);
        });
    } catch (error) {
        console.log(error.message);
    }
});
