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

export type DashboardData = {
    totalBookingsToday: number;
    totalRooms: number;
    totalUsers: number;
    upcomingBookings: number;
    masterSchedule: [];
    recentActivity: RecentActivity[];
};
