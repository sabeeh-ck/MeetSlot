import { Request, Response, Router } from "express";
import Booking from "../models/Booking.js";
import { auth } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/bookings", auth, async (req: Request, res: Response) => {
    try {
        const bookings = await Booking.find({ user: req.userId }).populate("roomId", "name").sort({ start: 1 });

        res.json(bookings);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

router.delete("/delete/:id", auth, async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const deletedItem = await Booking.findByIdAndDelete({ _id: id, user: req.userId });

        if (!deletedItem) {
            res.status(404).json({ message: "Item not found" });
            return;
        }

        res.status(200).json({ message: "Item deleted: ", deleted: deletedItem });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete item", error });
    }
});

export default router;
