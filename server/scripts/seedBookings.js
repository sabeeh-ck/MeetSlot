import mongoose from "mongoose";
import dotenv from "dotenv";
import Booking from "../models/Booking.js";
import Room from "../models/Room.js";
import User from "../models/User.js";

dotenv.config();

const seedBookings = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        const rooms = await Room.find();
        const user = await User.findOne();

        if (!rooms.length || !user) {
            throw new Error("Rooms or User missing");
        }

        const bookings = [
            {
                title: "test meeting 1",
                roomId: rooms[0]._id,
                user: user._id,
                date: "2026-02-11",
                startTime: "10:00",
                endTime: "10:30",
            },
            {
                title: "test meeting 5",
                roomId: rooms[0]._id,
                user: user._id,
                date: "2026-02-11",
                startTime: "12:30",
                endTime: "15:30",
            },
            {
                title: "test meeting 2",
                roomId: rooms[1]._id,
                user: user._id,
                date: "2026-02-10",
                startTime: "12:00",
                endTime: "14:30",
            },
            {
                title: "test meeting 3",
                roomId: rooms[1]._id,
                user: user._id,
                date: "2026-02-10",
                startTime: "10:00",
                endTime: "12:00",
            },
            {
                title: "test meeting 4",
                roomId: rooms[1]._id,
                user: user._id,
                date: "2026-02-11",
                startTime: "10:30",
                endTime: "11:30",
            },
        ];

        // await Booking.deleteMany({ date: "2026-02-10" });
        await Booking.insertMany(bookings);

        console.log("✅ Test bookings seeded");
        process.exit();
    } catch (err) {
        console.error("❌ Seeding bookings failed", err);
        process.exit(1);
    }
};

seedBookings();
