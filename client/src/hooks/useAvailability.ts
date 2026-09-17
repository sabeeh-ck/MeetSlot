import { useEffect, useState } from "react";
import api from "../api/axios";

type BookedSlot = { start: string; end: string };

export type Availability = {
    roomId: string;
    roomName: string;
    bookedSlots: BookedSlot[];
};

export const useAvailability = (date: string) => {
    const [availability, setAvailability] = useState<Availability[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchAvailability = async (): Promise<void> => {
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
