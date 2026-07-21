import { Link } from "react-router";
import { ArrowUpRightIcon } from "../../icons";

const StatCards = ({ data }) => {
    const cardDetails = [
        {
            title: "Today's Bookings",
            value: data?.totalBookingsToday ?? 0,
            path: "/admin/bookings",
        },
        {
            title: "Upcoming Bookings",
            value: data?.upcomingBookings ?? 0,
            path: "/admin/bookings",
        },
        {
            title: "Total Users",
            value: data?.totalUsers ?? 0,
            path: "/admin/manage",
        },
        {
            title: "Total Rooms",
            value: data?.totalRooms ?? 0,
            path: "/admin/manage",
        },
    ];

    return (
        <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-4">
            {cardDetails.map(({ title, value, path }) => (
                <Link key={title} to={path} className="cursor-pointer">
                    <div className="border-border active:bg-border bg-surface lg:hover:bg-border flex w-full flex-col gap-2 rounded-xl border p-4">
                        <div className="flex justify-between">
                            <span className="text-lg">{title}</span>
                            <ArrowUpRightIcon className="size-4" />
                        </div>
                        <span className="text-4xl font-bold">{value}</span>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default StatCards;
