import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

const logSchema = new mongoose.Schema({
    timestamp: Date,
    action: String,
});

const Log = mongoose.model("Log", logSchema);

app.post("/log", async (req, res) => {
    await Log.create({ timestamp: new Date(), action: req.body.action });
    console.log("Log saved to MongoDB");
    res.json({ message: "Logged successfully!" });
});

app.get("/logs", async (req, res) => {
    try {
        const logs = await Log.find().sort({ timestamp: -1 });
        res.json(logs);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch logs" });
    }
});

app.listen(PORT, () => console.log(`Analytics server running on port ${PORT}`));
