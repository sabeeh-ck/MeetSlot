import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./db.js";

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get("/test", (req, res) => res.json("test ok"));

app.post("/login", (req, res) => {
    const { email } = req.body;
    res.json({ email });
});

app.listen(4000);

//saX7RqEBNOa8j3fc
