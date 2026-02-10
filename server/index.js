import express from "express";
import cors from "cors";

import { config } from "dotenv";
config();

import authRoutes from "./routes/auth.routes.js";
import bookingRoutes from "./routes/bookings.js";
import connectDB from "./db.js";
import User from "./models/User.js";

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/auth", authRoutes);
app.use("/bookings", bookingRoutes);

app.get("/test", (req, res) => res.json("test ok"));

app.post("/login", (req, res) => {
    const { email } = req.body;
    res.json({ email });
});

app.post("/users/test", async (req, res) => {
    try {
        const user = await User.create({
            email: "test@meetslot.com",
            name: "Test User",
        });

        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(4000, () => {
    console.log("Server running on port 4000");
});
