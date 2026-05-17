const TodaysMeetings = ({ data }) => {
    return (
        <section className="flex flex-col gap-2">
            <h3>Today's Bookings</h3>
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
                {data?.map(
                    ({
                        __v,
                        roomId: { name: roomName },
                        start,
                        end,
                        title,
                        user: { name: userName },
                    }) => {
                        const startTime = new Date(start).toLocaleTimeString(
                            "en-IN",
                            {
                                hour: "numeric",
                                minute: "2-digit",
                                hour12: true,
                            },
                        );

                        const endTime = new Date(end).toLocaleTimeString(
                            "en-IN",
                            {
                                hour: "numeric",
                                minute: "2-digit",
                                hour12: true,
                            },
                        );
                        return (
                            <div className="grid grid-cols-6">
                                <span>{__v + 1}</span>
                                <span>{startTime}</span>
                                <span>{endTime}</span>
                                <span>{roomName}</span>
                                <span>{title}</span>
                                <span>{userName}</span>
                            </div>
                        );
                    },
                )}
            </div>
        </section>
    );
};

export default TodaysMeetings;
