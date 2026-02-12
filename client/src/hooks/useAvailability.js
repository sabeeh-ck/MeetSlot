import { useEffect, useState } from "react";
import api from "../api/axios";

export const useAvailability = (date) => {
    const [availability, setAvailability] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!date) return;

        const fetchAvailability = async () => {
            try {
                setLoading(true);
                const res = await api.get(
                    `/bookings/availability?date=${date}`,
                );

                setAvailability(res.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchAvailability();
    }, [date]);

    return { availability, loading };
};
