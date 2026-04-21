import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { config } from "dotenv";
config();

import authRoutes from "./routes/auth.routes.js";
import bookingRoutes from "./routes/bookings.js";
import userRoutes from "./routes/users.js";
import adminRoutes from "./routes/admin.js";
import connectDB from "./db.js";

const app = express();

const PORT = process.env.PORT || 4000;

app.use(
    cors({
        origin: true,
        credentials: true,
    }),
);

app.use(express.json());
app.use(cookieParser());

connectDB();

app.use("/auth", authRoutes);
app.use("/bookings", bookingRoutes);
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);

app.listen(PORT, () => {
    console.log("Server running on port 4000");
});
