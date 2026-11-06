export type UserRole = "employee" | "admin";

export type UserType = {
    _id: string;
    name: string;
    email: string;
    role: UserRole;
    createdAt: string;
    updatedAt: string;
    __v: number;
};

export type Booking = {
    __v: number;
    _id: string;
    createdAt: string;
    end: string;
    roomId: Record<string, string>;
    start: string;
    title: string;
    updatedAt: string;
    user: string;
};

export type RoomType = {
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
    roomId: RoomType;
    user: Pick<UserType, "_id" | "name" | "email">;
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
    roomId: Pick<RoomType, "_id" | "name">;
    start: string;
    title: string;
    updatedAt: string;
    user: Pick<UserType, "_id" | "name" | "email">;
};

export type DashboardData = {
    totalBookingsToday: number;
    totalRooms: number;
    totalUsers: number;
    upcomingBookings: number;
    masterSchedule: MasterSchedule[];
    recentActivity: RecentActivity[];
};

export type Availability = {
    roomId: string;
    roomName: string;
    bookedSlots: { start: string; end: string }[];
};

export type CreateBookingInput = {
    title: string;
    roomId: string;
    date: string;
    startTime: number | null;
    endTime: number | null;
};
