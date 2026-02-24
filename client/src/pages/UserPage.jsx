import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import BookingsList from "../components/BookingsList";
import { useAuth } from "../context/AuthContext";
import { useBookings } from "../hooks/useBookings";

const UserPage = () => {
    const { user } = useAuth();
    const { bookings, loading, refetch } = useBookings(user._id);

    const [view, setView] = useState("upcoming");

    const now = new Date();
    const upcoming = bookings.filter((b) => new Date(b.end) > now);
    const past = bookings.filter((b) => new Date(b.end) <= now);

    const SkeletonLoad = () => (
        <div className="flex flex-col gap-4">
            <Skeleton className="h-35" borderRadius={8} />
            <Skeleton className="h-35" borderRadius={8} />
            <Skeleton className="h-35" borderRadius={8} />
            <Skeleton className="h-35" borderRadius={8} />
        </div>
    );

    return (
        <main className="p-4">
            <section className="my-2 flex min-h-[70vh] flex-col gap-4">
                <div className="">
                    <h2>My meetings</h2>
                </div>

                <div className="bg-surface border-border flex rounded-xl border p-1">
                    <button
                        onClick={() => setView("upcoming")}
                        className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all ${view === "upcoming" ? "bg-text text-bg shadow" : "text-textmute"}`}
                    >
                        Upcoming ({upcoming.length})
                    </button>
                    <button
                        onClick={() => setView("past")}
                        className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all ${view === "past" ? "bg-text text-bg shadow" : "text-textmute"}`}
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
                        onAction={refetch}
                    />
                )}
            </section>
        </main>
    );
};

export default UserPage;
