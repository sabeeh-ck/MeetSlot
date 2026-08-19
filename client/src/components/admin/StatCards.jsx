import { Link } from "react-router-dom";
import { ArrowUpRightIcon } from "../../icons";
import Skeleton from "react-loading-skeleton";

const StatCards = ({ data, loading }) => {
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
            path: "/admin/users",
        },
        {
            title: "Total Rooms",
            value: data?.totalRooms ?? 0,
            path: "/admin/rooms",
        },
    ];

    return (
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {cardDetails.map(({ title, value, path }) => {
                if (loading)
                    return (
                        <Skeleton
                            key={title}
                            className="h-27.5"
                            borderRadius={12}
                        />
                    );

                return (
                    <Link
                        key={title}
                        to={path}
                        className="border-border active:bg-border bg-surface lg:hover:bg-border flex h-27.5 w-full cursor-pointer flex-col justify-center gap-2 rounded-xl border px-4"
                    >
                        <div className="flex justify-between">
                            <span className="text-lg">{title}</span>
                            <ArrowUpRightIcon className="size-4" />
                        </div>
                        <span className="text-4xl font-bold">{value}</span>
                    </Link>
                );
            })}
        </div>
    );
};

export default StatCards;
