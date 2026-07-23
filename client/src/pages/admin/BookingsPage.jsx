import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import BookingsList from "../../components/BookingsList";
import api from "../../api/axios";

const BookingsPage = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState("upcoming");

    const fetchBookings = async () => {
        try {
            const res = await api.get("/admin/bookings");
            setBookings(res.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const now = new Date();
    const upcoming = bookings.filter((booking) => new Date(booking.end) > now);
    const past = bookings.filter((booking) => new Date(booking.end) <= now);

    return (
        <section className="my-4 flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h2 className="font-semibold">Bookings</h2>
            </div>

            <div className="border-border bg-surface flex gap-1 rounded-xl border p-1">
                <button
                    onClick={() => setView("upcoming")}
                    className={`flex flex-1 items-center justify-center rounded-lg py-2 text-sm font-medium transition-all ${view === "upcoming" ? "bg-text text-bg shadow" : "text-textmute active:bg-border md:hover:bg-border"}`}
                >
                    Upcoming ({upcoming.length})
                </button>
                <button
                    onClick={() => setView("past")}
                    className={`flex flex-1 items-center justify-center rounded-lg py-2 text-sm font-medium transition-all ${view === "past" ? "bg-text text-bg shadow" : "active:bg-border text-textmute md:hover:bg-border"}`}
                >
                    Past ({past.length})
                </button>
            </div>

            {loading ? (
                <div className="flex flex-col gap-4">
                    <Skeleton height={24} width={160} borderRadius={8} />
                    <div className="grid gap-4 md:grid-cols-2">
                        <Skeleton height={132} borderRadius={12} />
                        <Skeleton height={132} borderRadius={12} />
                    </div>
                </div>
            ) : (
                <BookingsList
                    bookings={view === "upcoming" ? upcoming : past}
                    isPast={view === "past"}
                    refetch={fetchBookings}
                />
            )}
        </section>
    );
};

export default BookingsPage;
