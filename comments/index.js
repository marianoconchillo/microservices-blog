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

    comments.push({ id: commentId, content, status: "pending" });

    commentsByPostId[id] = comments;

    try {
        await axios.post("http://event-bus-srv:4005/events", {
            type: "CommentCreated",
            data: {
                id: commentId,
                content,
                postId: id,
                status: "pending",
            },
        });

        res.status(201).json(comments);
    } catch (error) {
        console.log(error.message);
    }
});

app.post("/events", async (req, res) => {
    const { type, data } = req.body;

    if (type === "CommentModerated") {
        const { postId, id, status, content } = data;
        const comments = commentsByPostId[postId];
        const comment = comments.find((comment) => comment.id === id);
        comment.status = status;

        try {
            await axios.post("http://event-bus-srv:4005/events", {
                type: "CommentUpdated",
                data: {
                    id,
                    postId,
                    status,
                    content,
                },
            });

            res.send({});
        } catch (error) {
            console.log(error.message);
        }
    }
});

const PORT = 4001;

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});
