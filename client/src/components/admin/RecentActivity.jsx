const RecentActivity = ({ loading, data }) => {
    return (
        <section className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
                <h3>Recent Activity</h3>
            </div>
            <div className="border-border bg-surface flex flex-col gap-2 rounded-xl border p-4">
                {loading ? (
                    <div className="text-textmute text-sm">
                        Loading activity...
                    </div>
                ) : data.length > 0 ? (
                    data.map(({ _id, title, roomId, user, createdAt }) => {
                        const roomName = roomId?.name ?? "Unknown room";
                        const userName =
                            user?.name ?? user?.email ?? "Unknown user";
                        const activityTime = new Date(createdAt).toLocaleString(
                            "en-IN",
                            {
                                day: "numeric",
                                month: "short",
                                hour: "numeric",
                                minute: "2-digit",
                                hour12: true,
                            },
                        );

                        return (
                            <div
                                key={_id}
                                className="border-border flex flex-col gap-1 border-b py-2 last:border-b-0"
                            >
                                <div className="text-sm font-medium">
                                    {title}
                                </div>
                                <div className="text-textmute text-sm">
                                    {userName} booked {roomName}
                                </div>
                                <div className="text-textmute text-xs">
                                    {activityTime}
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="text-textmute text-sm">
                        No recent activity yet.
                    </div>
                )}
            </div>
        </section>
    );
};

export default RecentActivity;
