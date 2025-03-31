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

app.listen(PORT, () => console.log(`Analytics server running on port ${PORT}`));
