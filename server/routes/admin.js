import { Router } from "express";
import Booking from "../models/Booking.js";
import Room from "../models/Room.js";
import User from "../models/User.js";

const router = Router();

router.get("/dashboard", async (req, res) => {
    try {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const now = new Date();

        const [totalBookingsToday, totalRooms, totalUsers, upcomingBookings, masterSchedule, recentActivity] =
            await Promise.all([
                Booking.countDocuments({
                    start: { $gte: startOfDay, $lte: endOfDay },
                }),

                Room.countDocuments(),

                User.countDocuments(),

                Booking.countDocuments({ start: { $gte: now } }),

                Booking.find({ start: { $gte: startOfDay, $lte: endOfDay } })
                    .populate("roomId", "name")
                    .populate("user", "name email"),

                Booking.find({})
                    .sort({ createdAt: -1 })
                    .limit(5)
                    .populate("roomId", "name")
                    .populate("user", "name email"),
            ]);

        res.status(200).json({
            totalBookingsToday,
            totalRooms,
            totalUsers,
            upcomingBookings,
            masterSchedule,
            recentActivity,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch admin dashboard data",
            error: error.message,
        });
    }
});

router.get("/bookings", async (req, res) => {
    try {
        const bookings = await Booking.find({})
            .sort({ start: 1 })
            .populate("roomId", "name")
            .populate("user", "name email");

        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch admin bookings", error: error.message });
    }
});

router.get("/manage", async (req, res) => {
    try {
        const [users, rooms] = await Promise.all([
            User.find({}).sort({ createdAt: -1 }),
            Room.find({}).sort({ name: 1 }),
        ]);

        res.status(200).json({ users, rooms });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch manage data", error: error.message });
    }
});

router.get("/rooms", async (req, res) => {
    try {
        const rooms = await Room.find({}).sort({ createdAt: -1 });

        res.status(200).json({ rooms });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch data", error: error.message });
    }
});

router.post("/manage/users", async (req, res) => {
    try {
        const { name, email, role } = req.body;

        if (!name || !email) {
            return res.status(400).json({ message: "Name and email are required" });
        }

        const normalizedEmail = email.trim().toLowerCase();
        const existingUser = await User.findOne({ email: normalizedEmail });

        if (existingUser) {
            return res.status(400).json({ message: "A user with that email already exists" });
        }

        const user = await User.create({
            name: name.trim(),
            email: normalizedEmail,
            role: role === "admin" ? "admin" : "employee",
        });

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: "Failed to create user", error: error.message });
    }
});

router.put("/manage/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, role } = req.body;

        if (!name || !email) {
            return res.status(400).json({ message: "Name and email are required" });
        }

        const normalizedEmail = email.trim().toLowerCase();
        const existingUser = await User.findOne({ email: normalizedEmail, _id: { $ne: id } });

        if (existingUser) {
            return res.status(400).json({ message: "A user with that email already exists" });
        }

        const user = await User.findByIdAndUpdate(
            id,
            {
                name: name.trim(),
                email: normalizedEmail,
                role: role === "admin" ? "admin" : "employee",
            },
            { new: true },
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Failed to update user", error: error.message });
    }
});

router.delete("/manage/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete user", error: error.message });
    }
});

router.post("/manage/rooms", async (req, res) => {
    try {
        const { name, capacity } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Room name is required" });
        }

        const room = await Room.create({
            name: name.trim(),
            capacity: capacity ? Number(capacity) : 1,
        });

        res.status(201).json(room);
    } catch (error) {
        res.status(500).json({ message: "Failed to create room", error: error.message });
    }
});

router.put("/manage/rooms/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, capacity } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Room name is required" });
        }

        const room = await Room.findByIdAndUpdate(
            id,
            {
                name: name.trim(),
                capacity: capacity ? Number(capacity) : 1,
            },
            { new: true },
        );

        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }

        res.status(200).json(room);
    } catch (error) {
        res.status(500).json({ message: "Failed to update room", error: error.message });
    }
});

router.delete("/manage/rooms/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRoom = await Room.findByIdAndDelete(id);

        if (!deletedRoom) {
            return res.status(404).json({ message: "Room not found" });
        }

        res.status(200).json({ message: "Room deleted" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete room", error: error.message });
    }
});

export default router;
