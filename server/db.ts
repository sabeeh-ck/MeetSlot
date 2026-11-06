import mongoose from "mongoose";

const connectDB = async () => {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) throw new Error("MONGO_URI is not defined");

    try {
        await mongoose.connect(mongoUri);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

export default connectDB;
