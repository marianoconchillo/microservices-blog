import express from "express";
import axios from "axios";

const app = express();

app.use(express.json());

app.post("/events", async (req, res) => {
    const { type, data } = req.body;

    if (type === "CommentCreated") {
        const status = data.content.includes("orange")
            ? "rejected"
            : "approved";

        try {
            await axios.post("http://localhost:4005/events", {
                type: "CommentModerated",
                data: {
                    id: data.id,
                    postId: data.postId,
                    content: data.content,
                    status,
                },
            });

            res.send({});
        } catch (error) {
            console.log(error.message);
        }
    }
});

const PORT = 4003;

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});
