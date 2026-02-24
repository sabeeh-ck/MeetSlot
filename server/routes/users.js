import { Router } from "express";
import Booking from "../models/Booking.js";
import { auth } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/bookings", auth, async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.userId }).populate("roomId", "name").sort({ start: 1 });

        res.json(bookings);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
