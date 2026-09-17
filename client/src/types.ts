import { Room, User } from "../../shared/types";

type Sheet = "room" | "form";

export type ManageUser = Pick<User, "email" | "name" | "role">;

export type ManageRoom = Pick<
    Room,
    "capacity" | "has_projector" | "has_whiteboard" | "location" | "name"
>;
