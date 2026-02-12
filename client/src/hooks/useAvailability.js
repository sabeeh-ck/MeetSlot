import { useEffect, useState } from "react";
import api from "../api/axios";

export const useAvailability = (date) => {
    const [availability, setAvailability] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!date) return;

        const fetchAvailability = async () => {
            const start = Date.now();
            setLoading(true);

            try {
                const res = await api.get(
                    `/bookings/availability?date=${date}`,
                );

                setAvailability(res.data);
            } catch (error) {
                console.log(error);
            } finally {
                const elapsed = Date.now() - start;
                const minDelay = 700;
                // setLoading(false);

                setTimeout(
                    () => {
                        setLoading(false);
                    },
                    Math.max(minDelay - elapsed, 0),
                );
            }
        };

        fetchAvailability();
    }, [date]);

    return { availability, loading };
};
