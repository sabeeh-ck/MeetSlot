import { useNavigate } from "react-router";
import { ArrowUpRightIcon, PlusIcon } from "../../icons";

const TodaysMeetings = ({ data }) => {
    const navigate = useNavigate();

    return (
        <section className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
                <h3>Today's Bookings</h3>
                <a
                    onClick={() => navigate("/admin/bookings")}
                    className="lg:hover:border-text flex cursor-pointer items-center gap-2 border-b border-transparent leading-0"
                >
                    <span className="">see all</span>
                    <ArrowUpRightIcon className="size-4" />
                </a>
            </div>
            <div className="border-border bg-surface flex flex-col gap-2 rounded-xl border p-4">
                <div className="text-textmute grid grid-cols-6">
                    <span>No</span>
                    <span>Start</span>
                    <span>End</span>
                    <span>Room</span>
                    <span>Title</span>
                    <span>Booked by</span>
                </div>
                <hr className="border-border" />
                {data?.length > 0 ? (
                    [...data]
                        .sort((a, b) => new Date(a.start) - new Date(b.start))
                        .map(
                            (
                                {
                                    roomId: { name: roomName },
                                    start,
                                    end,
                                    title,
                                    user: { name: userName },
                                },
                                index,
                            ) => {
                                const startTime = new Date(
                                    start,
                                ).toLocaleTimeString("en-IN", {
                                    hour: "numeric",
                                    minute: "2-digit",
                                    hour12: true,
                                    timeZone: "UTC",
                                });

                                const endTime = new Date(
                                    end,
                                ).toLocaleTimeString("en-IN", {
                                    hour: "numeric",
                                    minute: "2-digit",
                                    hour12: true,
                                    timeZone: "UTC",
                                });

                                return (
                                    <div className="grid grid-cols-6">
                                        <span>{index + 1}</span>
                                        <span>{startTime}</span>
                                        <span>{endTime}</span>
                                        <span>{roomName}</span>
                                        <span>{title}</span>
                                        <span>{userName}</span>
                                    </div>
                                );
                            },
                        )
                ) : (
                    <div className="text-textmute flex flex-col items-center justify-center gap-4 py-4">
                        <span>No bookings for today.</span>
                        <div>
                            <button
                                onClick={() => navigate("/admin/new-meeting")}
                                className="active:bg-text md:hover:text-bg md:hover:bg-text border-textmute text-text flex items-center justify-center gap-2 rounded-lg border px-4 py-2"
                            >
                                <PlusIcon className="h-5" />
                                <p className="select-none">Book a meeting</p>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default TodaysMeetings;
