import { useEffect, useState } from "react";
import api from "../api/axios";

export const useAvailability = (date) => {
    const [availability, setAvailability] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAvailability = async () => {
        const start = Date.now();
        setLoading(true);

        try {
            const res = await api.get(`/bookings/availability?date=${date}`);

            setAvailability([...res.data]);
        } catch (error) {
            console.log(error);
        } finally {
            const elapsed = Date.now() - start;
            const minDelay = 700;
            const remainingTime = Math.max(minDelay - elapsed, 0);

            return new Promise((resolve) => {
                setTimeout(() => {
                    setLoading(false);
                    resolve();
                }, remainingTime);
            });
        }
    };

    useEffect(() => {
        if (!date) return;

        fetchAvailability();
    }, [date]);

    return { availability, loading, refetch: fetchAvailability };
};
