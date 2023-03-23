import express from "express";
import cors from "cors";
import axios from "axios";
import { randomBytes } from "crypto";

const app = express();

app.use(express.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
    res.json(posts);
});

app.post("/posts", async (req, res) => {
    const id = randomBytes(4).toString("hex");
    const { title } = req.body;

    posts[id] = { id, title };

    try {
        await axios.post("http://localhost:4005/events", {
            type: "PostCreated",
            data: { id, title },
        });

        res.status(201).send(posts[id]);
    } catch (error) {
        console.log(error.message);
    }
});

app.post("/events", (req, res) => {
    console.log("Event Received: ", req.body.type);
    res.send({});
});

const PORT = 4000;

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});
