import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/posts", (req, res) => {});

app.post("/events", (req, res) => {});

const PORT = 4002;

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});
