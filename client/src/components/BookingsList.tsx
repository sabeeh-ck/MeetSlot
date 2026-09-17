import { Link } from "react-router-dom";
import BookingCard from "./BookingCard";
import Skeleton from "react-loading-skeleton";
import { PlusIcon } from "../icons";
import { Booking } from "../hooks/useBookings";

type BookingsListProps = {
    bookings: Booking[];
    isPast: boolean;
    loading: boolean;
    refetch: () => void;
};

const BookingsList = ({
    bookings,
    isPast,
    loading,
    refetch,
}: BookingsListProps) => {
    const today = new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
    const tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    const tomorrow = tomorrowDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    const sortedBookings = [...bookings].sort((a, b) => {
        const aStart = new Date(a.start).getTime();
        const bStart = new Date(b.start).getTime();

        return isPast ? bStart - aStart : aStart - bStart;
    });

    const groupedBookings = sortedBookings?.length
        ? sortedBookings.reduce<Record<string, Booking[]>>(
              (groups, booking) => {
                  let dateLabel = new Date(booking.start).toLocaleDateString(
                      "en-US",
                      {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                      },
                  );

                  if (dateLabel === today) dateLabel = "Today";
                  else if (dateLabel === tomorrow) dateLabel = "Tomorrow";

                  if (!groups[dateLabel]) groups[dateLabel] = [];

                  groups[dateLabel].push(booking);
                  return groups;
              },
              {},
          )
        : {};

    return (
        <div className="mx-4 mt-36 mb-4 flex h-full flex-1 flex-col gap-7 lg:mt-4 lg:ml-68 lg:h-auto">
            {loading ? (
                <div className="flex flex-col">
                    <Skeleton
                        height={24}
                        width={160}
                        borderRadius={8}
                        containerClassName="leading-px"
                        className="mb-2"
                    />
                    <div className="grid gap-3 md:grid-cols-2">
                        <Skeleton
                            height={118}
                            borderRadius={12}
                            containerClassName="leading-px"
                        />
                        <Skeleton
                            height={118}
                            borderRadius={12}
                            containerClassName="leading-px"
                        />
                    </div>
                    <Skeleton
                        height={24}
                        width={160}
                        borderRadius={8}
                        containerClassName="leading-px"
                        className="mt-7 mb-2"
                    />
                    <div className="grid gap-3 md:grid-cols-2">
                        <Skeleton
                            height={118}
                            borderRadius={12}
                            containerClassName="leading-px"
                        />
                        <Skeleton
                            height={118}
                            borderRadius={12}
                            containerClassName="leading-px"
                        />
                        <Skeleton
                            height={118}
                            borderRadius={12}
                            containerClassName="leading-px"
                        />
                    </div>
                </div>
            ) : bookings?.length > 0 ? (
                <>
                    {Object.keys(groupedBookings).map((date) => (
                        <section key={date}>
                            <p className="mb-2 font-bold">{date}</p>

                            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                {groupedBookings[date].map(
                                    (booking: Booking) => (
                                        <BookingCard
                                            key={booking._id}
                                            booking={booking}
                                            isPast={isPast}
                                            refetch={refetch}
                                        />
                                    ),
                                )}
                            </div>
                        </section>
                    ))}
                </>
            ) : (
                <div className="text-textmute flex flex-1 flex-col items-center justify-center gap-4 py-4">
                    <span>No bookings to show.</span>
                    <div>
                        <Link
                            to={"/admin/new-meeting"}
                            className="active:bg-text active:text-bg lg:hover:text-bg lg:hover:bg-text border-textmute text-text flex items-center justify-center gap-2 rounded-lg border px-4 py-2 font-bold active:scale-95"
                        >
                            <PlusIcon className="h-5" />
                            <p className="select-none">Book a meeting</p>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookingsList;
