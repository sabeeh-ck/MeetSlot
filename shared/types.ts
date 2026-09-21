export type User = {
    _id: string;
    name: string;
    email: string;
    role: "employee" | "admin";
    createdAt: string;
    updatedAt: string;
    __v: number;
};

export type Room = {
    _id: string;
    name: string;
    location: string;
    capacity: number;
    has_projector: boolean;
    has_whiteboard: boolean;
};

export type RecentActivity = {
    _id: string;
    title: string;
    roomId: Room;
    user: Pick<User, "_id" | "name" | "email">;
    start: string;
    end: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
};

export type MasterSchedule = {
    __v: number;
    _id: string;
    createdAt: string;
    end: string;
    roomId: Pick<Room, "_id" | "name">;
    start: string;
    title: string;
    updatedAt: string;
    user: Pick<User, "_id" | "name" | "email">;
};

export type DashboardData = {
    totalBookingsToday: number;
    totalRooms: number;
    totalUsers: number;
    upcomingBookings: number;
    masterSchedule: MasterSchedule[];
    recentActivity: RecentActivity[];
};
