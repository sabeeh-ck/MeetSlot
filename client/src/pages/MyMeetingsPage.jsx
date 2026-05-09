import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import BookingsList from "../components/BookingsList";
import { useAuth } from "../context/AuthContext";
import { useBookings } from "../hooks/useBookings";
import { useWindowWidth } from "../hooks/useWindowWidth";

const MyMeetingsPage = () => {
    const { user } = useAuth();
    const { isLaptop, isTablet } = useWindowWidth();
    const { bookings, loading, refetch } = useBookings(user._id);

    const [view, setView] = useState("upcoming");

    const now = new Date();
    const upcoming = bookings.filter((b) => new Date(b.end) > now);
    const past = bookings.filter((b) => new Date(b.end) <= now);

    const SkeletonLoad = () => (
        <div>
            <Skeleton
                className="mb-2"
                height={20}
                width={120}
                borderRadius={10}
            />
            <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
                <Skeleton height={isLaptop ? 132 : 112} borderRadius={12} />
                <Skeleton height={isLaptop ? 132 : 112} borderRadius={12} />
                {isTablet && (
                    <Skeleton height={isLaptop ? 132 : 112} borderRadius={12} />
                )}
            </div>
            <Skeleton
                className="mt-6 mb-2"
                height={20}
                width={120}
                borderRadius={10}
            />
            <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
                <Skeleton height={isLaptop ? 132 : 112} borderRadius={12} />
                <Skeleton height={isLaptop ? 132 : 112} borderRadius={12} />
            </div>
        </div>
    );

    return (
        <div className="my-4 flex flex-1 flex-col">
            <section className="flex flex-1 flex-col gap-6">
                <div className="">
                    <h2>My meetings</h2>
                </div>

                <div className="border-border bg-surface flex gap-1 rounded-xl border p-1">
                    <button
                        onClick={() => setView("upcoming")}
                        className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium transition-all ${view === "upcoming" ? "bg-text text-bg shadow" : "text-textmute active:bg-border md:hover:bg-border"}`}
                    >
                        Upcoming{" "}
                        {loading ? (
                            <Skeleton
                                width={16}
                                height={20}
                                containerClassName="leading-none"
                                borderRadius={8}
                                baseColor="#E0E0E0"
                                highlightColor="#F5F5F5"
                            />
                        ) : (
                            `(${upcoming.length})`
                        )}
                    </button>
                    <button
                        onClick={() => setView("past")}
                        className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium transition-all ${view === "past" ? "bg-text text-bg shadow" : "active:bg-border text-textmute md:hover:bg-border"}`}
                    >
                        Past{" "}
                        {loading ? (
                            <Skeleton
                                width={16}
                                height={20}
                                containerClassName="leading-none"
                                borderRadius={8}
                            />
                        ) : (
                            `(${past.length})`
                        )}
                    </button>
                </div>

                {loading ? (
                    <SkeletonLoad />
                ) : (
                    <BookingsList
                        bookings={view === "upcoming" ? upcoming : past}
                        isPast={view === "past"}
                        refetch={refetch}
                    />
                )}
            </section>
        </div>
    );
};

export default MyMeetingsPage;
