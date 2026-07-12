import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const seedUser = async () => {
    const userEmail = process.env.TEST_USER_EMAIL;

    try {
        await mongoose.connect(process.env.MONGO_URI);

        await User.deleteMany({ email: userEmail });

        const user = await User.create({
            email: userEmail,
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
