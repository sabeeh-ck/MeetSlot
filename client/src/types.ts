import { RoomType, UserType } from "../../shared/types";

type Sheet = "room" | "form";

export type ManageUser = Pick<UserType, "email" | "name" | "role">;

export type ManageRoom = Pick<
    RoomType,
    "capacity" | "has_projector" | "has_whiteboard" | "location" | "name"
>;
