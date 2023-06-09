import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

const events = [];

app.post("/events", (req, res) => {
    const event = req.body;

    events.push(event);

    const axiosCalls = [
        axios
            .post("http://posts-clusterip-srv:4000/events", event)
            .catch((err) => console.log(err.message)),
        axios
            .post("http://comments-srv:4001/events", event)
            .catch((err) => console.log(err.message)),
        axios
            .post("http://query-srv:4002/events", event)
            .catch((err) => console.log(err.message)),
        axios
            .post("http://moderation-srv:4003/events", event)
            .catch((err) => console.log(err.message)),
    ];

    Promise.all(axiosCalls);

    res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
    res.send(events);
});

const PORT = 4005;

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});
