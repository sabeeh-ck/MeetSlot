import { Request, Response, Router } from "express";
import { auth } from "../middleware/authMiddleware.js";
import Booking from "../models/Booking.js";
import Room from "../models/Room.js";
import { CreateBookingInput } from "../../shared/types.js";

const router = Router();

type AvailabilityRoom = {
    roomId: string;
    roomName: string;
    bookedSlots: { start: Date; end: Date }[];
};

router.post("/", auth, async (req: Request<{}, unknown, CreateBookingInput>, res: Response) => {
    try {
        const { title, roomId, date, startTime, endTime } = req.body;

        if (!title || !roomId || !date) return res.status(400).json({ msg: "Missing fields" });

        if (startTime == null || endTime == null || startTime >= endTime)
            return res.status(400).json({ msg: "Invalid time range" });

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

        const booking = await Booking.create({ title, roomId, user: req.userId, start, end });

        res.status(201).json(booking);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server error" });
    }
});

router.get("/availability", async (req: Request, res: Response) => {
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

        const map: Record<string, AvailabilityRoom> = {};

        rooms.forEach((room) => {
            const roomId = room._id.toString();
            map[roomId] = { roomId, roomName: room.name, bookedSlots: [] };
        });

        bookings.forEach((b) => {
            const bookingRoomId = (b.roomId?._id ?? b.roomId).toString();
            if (bookingRoomId && map[bookingRoomId]) {
                map[bookingRoomId].bookedSlots.push({ start: b.start, end: b.end });
            }
        });

        res.json(Object.values(map));
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server error" });
    }
});

export default router;
