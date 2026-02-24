import { Router } from "express";
import { auth } from "../middleware/authMiddleware.js";
import Booking from "../models/Booking.js";
import Room from "../models/Room.js";

const router = Router();

router.post("/", auth, async (req, res) => {
    try {
        const { title, roomId, user, date, startTime, endTime } = req.body;

        if (!title || !roomId || !date) return res.status(400).json({ msg: "Missing fields" });

        if (startTime >= endTime) return res.status(400).json({ msg: "Invalid time range" });

        const baseDate = new Date(`${date}T00:00:00`);
        const start = new Date(baseDate);
        start.setMinutes(startTime);
        const end = new Date(baseDate);
        end.setMinutes(endTime);

        const conflict = await Booking.findOne({
            roomId,
            start: { $lt: end },
            end: { $gt: start },
        });

        if (conflict) return res.status(400).json({ msg: "Slot already booked" });

        const existingBookings = await Booking.find({
            roomId,
            date,
        });

        const booking = await Booking.create({ title, roomId, user, start, end });

        res.status(201).json(booking);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server error" });
    }
});

router.get("/availability", async (req, res) => {
    try {
        const { date } = req.query;
        if (!date) return res.status(400).json({ msg: "Date required" });

        const dayStart = new Date(`${date}T00:00:00`);
        const dayEnd = new Date(`${date}T23:59:59.999`);

        const rooms = await Room.find().select("name");

        const bookings = await Booking.find({ start: { $lt: dayEnd }, end: { $gt: dayStart } }).populate(
            "roomId",
            "name",
        );

        const map = {};

        rooms.forEach((room) => (map[room._id] = { roomId: room._id, roomName: room.name, bookedSlots: [] }));

        bookings.forEach((b) => map[b.roomId._id].bookedSlots.push({ start: b.start, end: b.end }));

        res.json(Object.values(map));
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server error" });
    }
});

export default router;
