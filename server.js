import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logFile = path.join(__dirname, "analytics.log");

app.post("/log", (req, res) => {
    const logEntry = {
        action: req.body.action,
        timestamp: new Date().toISOString(),
    };
    console.log(JSON.stringify(logEntry));
    fs.appendFileSync(logFile, JSON.stringify(logEntry) + "\n");

    res.json({ message: "Logged successfully!" });
});

app.listen(PORT, () => console.log(`Analytics server running on port ${PORT}`));
