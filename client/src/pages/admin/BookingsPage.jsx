import { useEffect, useState } from "react";
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
        <section className="flex w-full flex-1 flex-col gap-6 lg:flex-row lg:gap-0">
            <div className="lg:border-border bg-bg fixed flex h-32 w-full flex-col gap-5 pb-4 lg:h-full lg:w-64 lg:border-r">
                <div className="mx-4 mt-4 flex items-center justify-between">
                    <h2 className="font-semibold">Bookings</h2>
                </div>

                <div className="border-border bg-surface lg:bg-bg mx-4 flex gap-1 rounded-xl border p-1 lg:flex-col lg:gap-2 lg:border-0 lg:p-0">
                    <button
                        onClick={() => setView("upcoming")}
                        className={`flex flex-1 items-center justify-center gap-1 rounded-lg py-2 text-sm font-medium transition-all md:scale-100! lg:justify-between lg:px-2 ${view === "upcoming" ? "bg-text text-bg lg:text-text lg:bg-border shadow lg:shadow-none" : "lg:text-text text-textmute active:bg-border lg:hover:bg-border"}`}
                    >
                        <span>Upcoming</span>
                        <span className="lg:hidden">-</span>
                        <span>{upcoming.length}</span>
                    </button>

                    <button
                        onClick={() => setView("past")}
                        className={`flex flex-1 items-center justify-center gap-1 rounded-lg py-2 text-sm font-medium transition-all md:scale-100! lg:justify-between lg:px-2 ${view === "past" ? "bg-text text-bg lg:text-text lg:bg-border shadow lg:shadow-none" : "lg:text-text active:bg-border text-textmute lg:hover:bg-border"}`}
                    >
                        <span>Past</span>
                        <span className="lg:hidden">-</span>
                        <span>{past.length}</span>
                    </button>
                </div>
            </div>

            <div className="from-bg via-bg/25 pointer-events-none fixed top-48 left-0 z-40 h-8 w-full bg-linear-to-b to-transparent lg:hidden" />

            <BookingsList
                loading={loading}
                bookings={view === "upcoming" ? upcoming : past}
                isPast={view === "past"}
                refetch={fetchBookings}
            />
        </section>
    );
};

export default BookingsPage;
