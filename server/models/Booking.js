import { model, Schema, Types } from "mongoose";

const bookingSchema = new Schema(
    {
        title: { type: String, required: true },
        roomId: { type: Types.ObjectId, ref: "Room", required: true },
        user: { type: Types.ObjectId, ref: "User", required: true },
        date: { type: String, required: true },
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
    },
    { timestamps: true },
);

bookingSchema.index({ roomId: 1, date: 1, startTime: 1, endTime: 1 }, { unique: true });

export default model("Booking", bookingSchema);
