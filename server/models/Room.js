import { model, Schema } from "mongoose";

const roomSchema = new Schema({
    name: { type: String, required: true, unique: true },
    capacity: { type: Number, default: 1 },
});

export default model("Room", roomSchema);
