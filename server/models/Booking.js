import { model, Schema, Types } from "mongoose";

const bookingSchema = new Schema(
    {
        title: { type: String, required: true },
        roomId: { type: Types.ObjectId, ref: "Room", required: true },
        user: { type: Types.ObjectId, ref: "User", required: true },
        start: { type: Date, required: true },
        end: { type: Date, required: true },
    },
    { timestamps: true },
);

bookingSchema.index({ roomId: 1, start: 1, end: 1 }, { unique: true });

export default model("Booking", bookingSchema);
