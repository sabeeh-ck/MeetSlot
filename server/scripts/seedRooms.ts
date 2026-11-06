import "dotenv/config";
import { connect } from "mongoose";
import Room from "../models/Room.js";
import { RoomType } from "../../shared/types.js";

const rooms: Omit<RoomType, "_id">[] = [
    // { name: "Room A", capacity: 4 },
    // { name: "Room B", capacity: 6 },
];

const seedRooms = async () => {
    try {
        await connect(process.env.MONGO_URI as string);

        await Room.deleteMany();

        await Room.insertMany(rooms);

        console.log("✅ Rooms seeded");
        process.exit();
    } catch (err) {
        console.error("❌ Seeding failed", err);
        process.exit(1);
    }
};

seedRooms();
