import { model, Schema } from "mongoose";

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        role: {
            type: String,
            enum: ["admin", "employee"],
            default: "employee",
        },
        otp: {
            type: {
                code: String,
                expiresAt: Date,
            },
            select: false,
        },
    },
    { timestamps: true },
);

export default model("User", userSchema);
