import { HydratedDocument, model, Schema } from "mongoose";
import type { UserRole } from "../../shared/types.js";

type UserFields = {
    name: string;
    email: string;
    role: UserRole;
    otp?: {
        code?: string;
        expiresAt: Date;
    };
};

const userSchema = new Schema<UserFields>(
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

export type UserDocument = HydratedDocument<UserFields>;

export default model<UserFields>("User", userSchema);
