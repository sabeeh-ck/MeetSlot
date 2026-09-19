import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { minutesTo12Hour } from "../utils/time";
import { useWindowWidth } from "../hooks/useWindowWidth";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { LoaderIcon, SaveIcon } from "../icons";
import { Availability } from "../hooks/useAvailability";
import { isAxiosError } from "axios";
import { useToast } from "../context/ToastContext";

type BookingFormProps = {
    selectedDate: string;
    selectedRoom: string;
    selectedSlots: number[];
    availability: Availability[];
    onSubmit: () => void;
    onDateChange: (date: string) => void;
    onRoomChange: (room: string) => void;
};

type FormData = {
    title: string;
    date: string;
    room: string;
    startTime: number | null;
    endTime: number | null;
};

const BookingForm = ({
    selectedDate,
    onDateChange,
    selectedSlots,
    selectedRoom,
    onRoomChange,
    availability,
    onSubmit,
}: BookingFormProps) => {
    const today = new Date().toISOString().split("T")[0];
    const { user } = useAuth();
    const { showToast } = useToast();

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        title: "",
        date: selectedDate,
        room: selectedRoom,
        startTime: null,
        endTime: null,
    });

    useEffect(() => {
        setFormData({
            title: "",
            date: selectedDate,
            room: selectedRoom,
            startTime: selectedSlots?.[0],
            endTime: selectedSlots?.length
                ? (selectedSlots.at(-1) ?? 0) + 30
                : null,
        });
    }, [selectedDate, selectedRoom, selectedSlots]);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        const { name, value } = e.target;

        if (name === "date") onDateChange(value || today);
        else if (name === "room") onRoomChange(value);
        else setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.title || !formData.date || !formData.room) return;

        const payload = {
            title: formData.title,
            roomId: formData.room,
            user: user?._id,
            date: formData.date,
            startTime: formData.startTime,
            endTime: formData.endTime,
        };

        try {
            setLoading(true);

            await api.post("/bookings", payload);

            onSubmit();
            showToast("Booking Successfull", "success");
        } catch (error: unknown) {
            if (isAxiosError<{ msg?: string }>(error)) {
                const message = error.response?.data.msg ?? error.message;
                showToast(message, "error");
            } else {
                console.error(error);
            }
        } finally {
            setLoading(false);
        }
    };

    const { isMobile, isLaptop } = useWindowWidth();

    return (
        <section className="flex flex-col gap-4">
            <h1 className="text-base!">Create booking</h1>
            <form
                className="flex flex-col gap-3 text-sm"
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                    }
                }}
                onSubmit={handleSubmit}
            >
                <div className="flex flex-col gap-1">
                    <label htmlFor="purpose">
                        Meeting title <span className="text-red-700">*</span>
                    </label>
                    <input
                        type="text"
                        name="title"
                        onChange={handleChange}
                        value={formData.title}
                        id="purpose"
                        placeholder="Enter a title"
                        required
                    />
                </div>

                <div className="flex w-full flex-col gap-1">
                    <label htmlFor="date">Date</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onClick={(e) => e.currentTarget.showPicker()}
                        onChange={handleChange}
                        disabled={isMobile}
                        min={today}
                    />
                </div>

                <div className="flex w-full flex-col gap-1">
                    <label htmlFor="room">Room</label>
                    <select
                        id="room"
                        name="room"
                        value={formData.room}
                        onChange={handleChange}
                        disabled={isMobile || isLaptop}
                    >
                        {availability?.map(({ roomName, roomId }) => (
                            <option key={roomId} value={roomId}>
                                {roomName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex gap-4">
                    <div className="flex w-full flex-col gap-1">
                        <label htmlFor="startTime">Beginning</label>
                        <input
                            type="text"
                            id="startTime"
                            name="startTime"
                            value={minutesTo12Hour(formData.startTime)}
                            onChange={handleChange}
                            disabled
                            required
                        />
                    </div>

                    <div className="flex w-full flex-col gap-1">
                        <label htmlFor="endTime">Ending</label>
                        <input
                            type="text"
                            id="endTime"
                            name="endTime"
                            value={minutesTo12Hour(formData.endTime)}
                            onChange={handleChange}
                            disabled
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-text text-bg absolute top-8 right-4 rounded-full px-4 py-2"
                >
                    <span className="flex items-center gap-1">
                        {loading ? (
                            <LoaderIcon className="size-4 animate-spin" />
                        ) : (
                            <SaveIcon className="size-4" />
                        )}
                        Save
                    </span>
                </button>
            </form>
        </section>
    );
};

export default BookingForm;
