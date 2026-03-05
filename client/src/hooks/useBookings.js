import { useCallback, useEffect, useState } from "react";
import api from "../api/axios";

export const useBookings = (userId) => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchBookings = useCallback(async () => {
        if (!userId) return;

        const start = Date.now();
        setLoading(true);

        try {
            const res = await api.get(`/user/bookings`);
            setBookings(res.data);
        } catch (err) {
            console.log(err);
        } finally {
            const elapsed = Date.now() - start;
            const minDelay = 700;
            const remainingTime = Math.max(minDelay - elapsed, 0);

            setTimeout(() => {
                setLoading(false);
            }, remainingTime);
        }
    }, [userId]);

    useEffect(() => {
        fetchBookings();
    }, [fetchBookings]);

    return { bookings, loading, refetch: fetchBookings };
};
