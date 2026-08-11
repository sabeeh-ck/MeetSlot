import { Fragment } from "react";
import Skeleton from "react-loading-skeleton";

const RecentActivity = ({ loading, data }) => {
    return (
        <section className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
                <h3>Recent Activity</h3>
            </div>

            {loading ? (
                <Skeleton
                    height={500}
                    containerClassName="leading-px "
                    className="w-full"
                    borderRadius={12}
                />
            ) : (
                <div className="border-border bg-surface flex flex-col gap-2 rounded-xl border p-4">
                    {data.length > 0 ? (
                        data.map(
                            (
                                { _id, title, roomId, user, createdAt },
                                index,
                            ) => {
                                const roomName = roomId?.name ?? "Unknown room";
                                const userName =
                                    user?.name ?? user?.email ?? "Unknown user";
                                const activityTime = new Date(
                                    createdAt,
                                ).toLocaleString("en-IN", {
                                    day: "numeric",
                                    month: "short",
                                    hour: "numeric",
                                    minute: "2-digit",
                                    hour12: true,
                                });

                                return (
                                    <Fragment key={_id}>
                                        <div className="flex flex-col gap-1 py-2 last:border-b-0">
                                            <div className="text-sm font-medium capitalize">
                                                {title}
                                            </div>
                                            <div className="text-textmute text-sm">
                                                {userName} booked {roomName}
                                            </div>
                                            <div className="text-textmute text-xs">
                                                {activityTime}
                                            </div>
                                        </div>

                                        {index < data.length - 1 && (
                                            <hr className="border-border" />
                                        )}
                                    </Fragment>
                                );
                            },
                        )
                    ) : (
                        <div className="text-textmute text-sm">
                            No recent activity yet.
                        </div>
                    )}
                </div>
            )}
        </section>
    );
};

export default RecentActivity;
