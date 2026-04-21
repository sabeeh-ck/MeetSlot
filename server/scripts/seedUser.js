import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const seedUser = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        await User.deleteMany({ email: process.env.TEST_USER_EMAIL });

        const user = await User.create({
            email: process.env.TEST_USER_EMAIL,
            name: "Test User",
            role: "employee",
        });

        console.log("✅ Test user seeded", user._id);
        process.exit();
    } catch (err) {
        console.error("❌ User seeding failed", err);
        process.exit(1);
    }
};

seedUser();
