import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import BookingsList from "../components/BookingsList";
import { useAuth } from "../context/AuthContext";
import { useBookings } from "../hooks/useBookings";

const MyMeetingsPage = () => {
    const { user } = useAuth();
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
                width={75}
                borderRadius={10}
            />
            <div className="flex flex-col gap-4">
                <Skeleton className="h-35" borderRadius={12} />
                <Skeleton className="h-35" borderRadius={12} />
            </div>
            <Skeleton
                className="mt-6 mb-2"
                height={20}
                width={100}
                borderRadius={10}
            />
            <div className="flex flex-col gap-4">
                <Skeleton className="h-35" borderRadius={12} />
                <Skeleton className="h-35" borderRadius={12} />
            </div>
        </div>
    );

    return (
        <div className="lg:p-4">
            <section className="my-2 flex flex-col gap-6">
                <div className="">
                    <h2>My meetings</h2>
                </div>

                <div className="border-border bg-surface flex gap-1 rounded-xl border p-1">
                    <button
                        onClick={() => setView("upcoming")}
                        className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all ${view === "upcoming" ? "bg-text text-bg shadow" : "text-textmute active:bg-border md:hover:bg-border"}`}
                    >
                        Upcoming ({upcoming.length})
                    </button>
                    <button
                        onClick={() => setView("past")}
                        className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all ${view === "past" ? "bg-text text-bg shadow" : "active:bg-border text-textmute md:hover:bg-border"}`}
                    >
                        Past ({past.length})
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
