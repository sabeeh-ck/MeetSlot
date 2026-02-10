import { useEffect, useState } from "react";
import { minutesToTime } from "../utils/time";
import { useWindowWidth } from "../hooks/useWindowWidth";

const BookingForm = ({ selectedDate, selectedSlots, selectedRoom }) => {
    const [formData, setFormData] = useState({
        meetingTitle: "",
        selectedDate,
        selectedRoom,
        startTime: "",
        endTime: "",
    });

    useEffect(
        () =>
            setFormData({
                meetingTitle: "",
                selectedDate,
                selectedRoom,
                startTime: selectedSlots[0],
                endTime: selectedSlots.at(-1),
            }),
        [selectedDate, selectedRoom, selectedSlots],
    );

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            title: formData.meetingTitle,
        };

        if (!meetingTitle || !selectedDate || !selectedRoom) return;
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
                        name="meetingTitle"
                        onChange={handleChange}
                        value={formData.meetingTitle}
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
                        name="selectedDate"
                        value={formData.selectedDate}
                        onClick={(e) => e.target.showPicker()}
                        onChange={handleChange}
                        disabled={isMobile}
                    />
                </div>

                <div className="flex w-full flex-col gap-2">
                    <label htmlFor="room">Room</label>
                    <select
                        id="room"
                        name="selectedRoom"
                        value={formData.selectedRoom}
                        onChange={handleChange}
                        disabled={isMobile || isLaptop}
                    >
                        <option value="Room A">Room A</option>
                        <option value="Room B">Room B</option>
                    </select>
                </div>

                <div className="flex gap-4">
                    <div className="flex w-full flex-col gap-2">
                        <label htmlFor="startTime">Beginning</label>
                        <input
                            type="time"
                            id="startTime"
                            name="startTime"
                            value={minutesToTime(formData.startTime)}
                            onChange={handleChange}
                            disabled
                            required
                        />
                    </div>

                    <div className="flex w-full flex-col gap-2">
                        <label htmlFor="endTime">Ending</label>
                        <input
                            type="time"
                            id="endTime"
                            name="endTime"
                            value={minutesToTime(formData.endTime + 30)}
                            onChange={handleChange}
                            disabled
                            required
                        />
                    </div>
                </div>

                <button className="bg-text text-bg mx-auto my-4 rounded-lg px-8 py-2">
                    {isMobile ? "Confirm" : "Save"}
                </button>
            </form>
        </section>
    );
};

export default BookingForm;
