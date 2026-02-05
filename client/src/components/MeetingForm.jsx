import { useEffect, useState } from "react";
import { minutesToTime } from "../utils/time";

const MeetingForm = ({ selectedDate, selectedSlots, closeSheet }) => {
    const [formData, setFormData] = useState({
        meetingTitle: "",
        selectedDate: "",
        startTime: "",
        endTime: "",
    });

    useEffect(
        () =>
            setFormData((prev) => ({
                ...prev,
                selectedDate: selectedDate,
                startTime: selectedSlots[0],
                endTime: selectedSlots.at(-1),
            })),
        [],
    );

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="flex flex-col">
            <form className="flex flex-col gap-4 text-sm">
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
                        onChange={handleChange}
                    />
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
                        />
                    </div>
                </div>

                <button className="bg-text text-bg mx-auto mt-15 rounded-2xl px-8 py-2">
                    Save
                </button>
            </form>
        </div>
    );
};

export default MeetingForm;
