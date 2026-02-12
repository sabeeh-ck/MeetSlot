import { useEffect, useState } from "react";
import { minutesTo12Hour } from "../utils/time";
import { useWindowWidth } from "../hooks/useWindowWidth";

const BookingForm = ({
    selectedDate,
    setSelectedDate,
    selectedSlots,
    setSelectedSlots,
    selectedRoom,
    setSelectedRoom,
    availability,
}) => {
    const today = new Date().toISOString().split("T")[0];

    const [formData, setFormData] = useState({
        title: "",
        date: selectedDate,
        room: selectedRoom,
        startTime: "",
        endTime: "",
    });

    useEffect(() => {
        setFormData({
            title: "",
            date: selectedDate,
            room: selectedRoom,
            startTime: selectedSlots?.[0],
            endTime: selectedSlots?.length ? selectedSlots.at(-1) + 30 : null,
        });
    }, [selectedDate, selectedRoom, selectedSlots]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "date") {
            setSelectedDate(value || today);
            setSelectedSlots({
                "Room A": [],
                "Room B": [],
            });
        } else if (name === "room") {
            setSelectedRoom(value);
        } else setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.title || !formData.date || !formData.room) return;

        console.log(formData);

        // const payload = {
        //     title: formData.title,
        //     roomId: formData.room,
        // };
    };

    const { isMobile, isLaptop } = useWindowWidth();

    return (
        <section className="flex flex-col">
            <form
                className="flex flex-col gap-4 text-sm"
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                    }
                }}
                onSubmit={handleSubmit}
            >
                <div className="flex flex-col gap-2">
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

                <div className="flex w-full flex-col gap-2">
                    <label htmlFor="date">Date</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onClick={(e) => e.target.showPicker()}
                        onChange={handleChange}
                        disabled={isMobile}
                        min={today}
                    />
                </div>

                <div className="flex w-full flex-col gap-2">
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
                    <div className="flex w-full flex-col gap-2">
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

                    <div className="flex w-full flex-col gap-2">
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

                <button className="bg-text text-bg mx-auto my-4 rounded-lg px-8 py-2">
                    Confirm
                </button>
            </form>
        </section>
    );
};

export default BookingForm;
