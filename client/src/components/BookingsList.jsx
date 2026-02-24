import { useNavigate } from "react-router-dom";
import { minutesTo12Hour } from "../utils/time";

const BookingsList = ({ bookings, isPast, onAction }) => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-1 flex-col gap-4">
            {bookings?.length === 0 ? (
                <div className="mx-auto my-auto flex flex-col items-center gap-2">
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
                bookings.map(
                    ({
                        _id,
                        title,
                        date,
                        start,
                        end,
                        roomId: { name: roomName },
                    }) => {
                        const startTime = minutesTo12Hour(
                            new Date(start).getHours() * 60 +
                                new Date(start).getMinutes(),
                        );

                        const endTime = minutesTo12Hour(
                            new Date(end).getHours() * 60 +
                                new Date(end).getMinutes(),
                        );

                        return (
                            <div
                                key={_id}
                                className="bg-surface border-border flex justify-between rounded-xl border p-4"
                            >
                                <div className="flex flex-col gap-1">
                                    <h3 className="font-semibold">{title}</h3>
                                    <p>{date}</p>
                                    <p>{roomName}</p>
                                    <p>{`${startTime} - ${endTime}`}</p>
                                </div>
                                {!isPast && (
                                    <div className="flex items-center">
                                        <button className="border-border md:hover:bg-border active:bg-border rounded-lg border px-4 py-1">
                                            Cancel
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    },
                )
            )}
        </div>
    );
};

export default BookingsList;
