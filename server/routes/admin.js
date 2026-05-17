import { Router } from "express";
import Booking from "../models/Booking.js";
import User from "../models/User.js";

const router = Router();

router.get("/dashboard", async (req, res) => {
    try {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const [totalBookings, masterSchedule, users, recentActivity] = await Promise.all([
            Booking.countDocuments({ start: { $gte: startOfDay, $lte: endOfDay } }),

            Booking.find({ start: { $gte: startOfDay, $lte: endOfDay } })
                .populate("roomId", "name")
                .populate("user", "name email"),
        ]);

        res.status(200).json({
            totalBookings,
            masterSchedule,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch admin dashboard data",
            error: error.message,
        });
    }
});

export default router;
