import express from "express";
import cors from "cors";
import axios from "axios";
import { randomBytes } from "crypto";

const app = express();

app.use(express.json());
app.use(cors());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
    const { id } = req.params;
    res.json(commentsByPostId[id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    const commentId = randomBytes(4).toString("hex");

    const comments = commentsByPostId[id] || [];

    comments.push({ id: commentId, content });

    commentsByPostId[id] = comments;

    await axios.post("http://localhost:4005/events", {
        type: "CommentCreated",
        data: {
            id: commentId,
            content,
            postId: id,
        },
    });

    res.status(201).json(comments);
});

app.post("/events", (req, res) => {
    console.log("Event Received: ", req.body.type);
    res.send({});
});

const PORT = 4001;

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});
