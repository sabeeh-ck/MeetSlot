import { useNavigate } from "react-router-dom";
import BookingCard from "./BookingCard";

const BookingsList = ({ bookings, isPast, refetch }) => {
    const navigate = useNavigate();

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

    const sortedBookings = [...bookings].sort(
        (a, b) => new Date(a.start) - new Date(b.start),
    );

    const groupedBookings =
        sortedBookings?.length !== 0 &&
        sortedBookings.reduce((groups, booking) => {
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
        }, {});

    return (
        <div className="flex h-full flex-1 flex-col gap-6">
            {bookings?.length === 0 ? (
                <div className="mx-auto my-auto flex flex-col items-center justify-center gap-2">
                    <p className="text-textmute">
                        {isPast
                            ? "No booking history found."
                            : "You're all clear! No meetings scheduled."}
                    </p>
                    <button
                        className="border-border bg-surface md:hover:bg-border active:bg-border rounded-lg border p-2 text-sm"
                        onClick={() => navigate("/")}
                    >
                        Create New Meeting
                    </button>
                </div>
            ) : (
                <>
                    {Object.keys(groupedBookings).map((date) => (
                        <section key={date}>
                            <p className="mb-2 font-bold">{date}</p>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                {groupedBookings[date].map((booking) => (
                                    <BookingCard
                                        key={booking._id}
                                        booking={booking}
                                        isPast={isPast}
                                        refetch={refetch}
                                    />
                                ))}
                            </div>
                        </section>
                    ))}
                </>
            )}
        </div>
    );
};

export default BookingsList;
