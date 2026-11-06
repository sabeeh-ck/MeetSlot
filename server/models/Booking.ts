import { HydratedDocument, model, Schema, Types } from "mongoose";

type BookingFields = {
    title: string;
    roomId: Types.ObjectId;
    user: Types.ObjectId;
    start: Date;
    end: Date;
};

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

export type BookingDocument = HydratedDocument<BookingFields>;

bookingSchema.index({ roomId: 1, start: 1, end: 1 }, { unique: true });

export default model<BookingFields>("Booking", bookingSchema);
