import { HydratedDocument, model, Schema } from "mongoose";

type RoomFields = {
    name: string;
    capacity: number;
    location: string;
    has_projector: boolean;
    has_whiteboard: boolean;
};

const roomSchema = new Schema<RoomFields>(
    {
        name: { type: String, required: true, unique: true },
        capacity: { type: Number, default: 1, required: true },
        location: { type: String, required: true },
        has_projector: { type: Boolean, required: true },
        has_whiteboard: { type: Boolean, required: true },
    },
    { timestamps: true },
);

export type RoomDocument = HydratedDocument<RoomFields>;

export default model<RoomFields>("Room", roomSchema);
