import { Router } from "express";
import { auth } from "../middleware/authMiddleware.js";
import Booking from "../models/Booking.js";
import Room from "../models/Room.js";

const router = Router();

router.post("/", auth, async (req, res) => {
    try {
        const { title, roomId, date, startTime, endTIme } = req.body;
        if (!title || !roomId || !date) return res.status(400).json({ msg: "Missing fields" });

        const payload = {
            title,
            room: roomId,
            user: req.user.id,
            date,
            startTime,
            endTime,
            slot,
        };

        // const booking = await Booking.create(payload);

        // res.status(201).json(booking);
    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({ msg: "Slot already booked" });
        }

        console.error(err);
        return res.status(500).json({ msg: "Server error" });
    }
});

router.get("/availability", async (req, res) => {
    try {
        const { date } = req.query;
        if (!date) return res.status(400).json({ msg: "Date required" });

        const rooms = await Room.find().select("name");
        const bookings = await Booking.find({ date }).populate("roomId", "name").select("room startTime endTime");

        const map = {};
        rooms.forEach((room) => (map[room._id] = { roomId: room._id, roomName: room.name, bookedSlots: [] }));

        bookings.forEach((b) => map[b.roomId._id].bookedSlots.push({ start: b.startTime, end: b.endTime }));

        res.json(Object.values(map));
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server error" });
    }
});

export default router;
