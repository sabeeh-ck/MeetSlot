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
            // 2026-02-13
            // {
            //     title: "meeting A1",
            //     roomId: rooms[1]._id,
            //     user: user._id,
            //     date: "2026-02-13",
            //     startTime: "09:00",
            //     endTime: "10:30", // 1.5h
            // },
            // {
            //     title: "meeting A2",
            //     roomId: rooms[0]._id,
            //     user: user._id,
            //     date: "2026-02-13",
            //     startTime: "09:30",
            //     endTime: "10:30", // 1h
            // },
            // {
            //     title: "meeting A3",
            //     roomId: rooms[1]._id,
            //     user: user._id,
            //     date: "2026-02-13",
            //     startTime: "11:00",
            //     endTime: "13:00", // 2h
            // },
            // {
            //     title: "meeting A4",
            //     roomId: rooms[0]._id,
            //     user: user._id,
            //     date: "2026-02-13",
            //     startTime: "11:00",
            //     endTime: "12:30", // 1.5h
            // },

            // // 2026-02-14
            // {
            //     title: "meeting B1",
            //     roomId: rooms[0]._id,
            //     user: user._id,
            //     date: "2026-02-14",
            //     startTime: "08:30",
            //     endTime: "09:30",
            // },
            // {
            //     title: "meeting B2",
            //     roomId: rooms[1]._id,
            //     user: user._id,
            //     date: "2026-02-14",
            //     startTime: "09:00",
            //     endTime: "10:00",
            // },
            // {
            //     title: "meeting B3",
            //     roomId: rooms[0]._id,
            //     user: user._id,
            //     date: "2026-02-14",
            //     startTime: "10:00",
            //     endTime: "12:00", // 2h
            // },
            // {
            //     title: "meeting B4",
            //     roomId: rooms[1]._id,
            //     user: user._id,
            //     date: "2026-02-14",
            //     startTime: "11:00",
            //     endTime: "12:30",
            // },

            // 2026-02-12
            {
                title: "meeting C1",
                roomId: rooms[1]._id,
                user: user._id,
                date: "2026-02-12",
                startTime: "09:30",
                endTime: "10:30",
            },
            {
                title: "meeting C2",
                roomId: rooms[0]._id,
                user: user._id,
                date: "2026-02-12",
                startTime: "10:00",
                endTime: "11:30",
            },
            {
                title: "meeting C3",
                roomId: rooms[1]._id,
                user: user._id,
                date: "2026-02-12",
                startTime: "11:00",
                endTime: "13:00", // 2h
            },
            {
                title: "meeting C4",
                roomId: rooms[0]._id,
                user: user._id,
                date: "2026-02-12",
                startTime: "13:00",
                endTime: "14:00",
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
