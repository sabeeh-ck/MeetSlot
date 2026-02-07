import {
    CalendarIconSolid,
    CalendarIconOutline,
    ChevronUpDownIcon,
} from "../icons";
import SlotTimeline from "../components/SlotTimeline";
import { useEffect, useRef, useState } from "react";
import RoomSelector from "../components/RoomSelector";
import BottomSheet from "../components/BottomSheet";
import { AnimatePresence } from "motion/react";
import MeetingForm from "../components/MeetingForm";
import { minutesToTime } from "../utils/time";

const IndexPage = () => {
    const [selectedRoom, setSelectedRoom] = useState("");
    const [selectedSlots, setSelectedSlots] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [sheet, setSheet] = useState("");

    useEffect(() => {
        setSelectedRoom("Room 1");
        setSelectedDate(new Date().toISOString().split("T")[0]);
    }, []);

    const dateInputRef = useRef(null);

    const toggleSelectedRoom = (room) => setSelectedRoom(room);

    const formattedDate = (() => {
        const [year, month, day] = selectedDate.split("-").map(Number);
        const date = new Date(year, month - 1, day);
        const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
        return `${String(day).padStart(2, "0")}/${String(month).padStart(2, "0")} ${weekday}`;
    })();

    const today = new Date().toISOString().split("T")[0];
    const tomorrow = new Date(Date.now() + 86400000)
        .toISOString()
        .split("T")[0];

    return (
        <main>
            <section className="bg-bg sticky top-14 z-30 flex w-full flex-col gap-4 py-4">
                <div className="flex w-full items-center gap-2">
                    <h2>{selectedRoom}</h2>
                    <button onClick={() => setSheet("room")}>
                        <ChevronUpDownIcon
                            className={`text-text md:hover:bg-border border-border active:bg-border h-8 rounded-lg border py-1 text-sm ${sheet === "room" ? "bg-border" : "bg-surface"} `}
                        />
                    </button>
                </div>
                <div className="flex w-full items-center gap-2">
                    <button
                        onClick={() => setSelectedDate(today)}
                        className={`rounded-full border px-4 py-1 text-sm ${
                            selectedDate === today
                                ? "border-text bg-text text-bg md:hover:bg-border"
                                : "border-border active:bg-border md:hover:bg-border bg-surface"
                        }`}
                    >
                        Today
                    </button>

                    <button
                        onClick={() => setSelectedDate(tomorrow)}
                        className={`rounded-full border px-4 py-1 text-sm ${
                            selectedDate === tomorrow
                                ? "border-text bg-text text-bg md:hover:bg-border"
                                : "border-border md:hover:bg-border active:bg-border bg-surface"
                        }`}
                    >
                        Tomorrow
                    </button>

                    <button
                        className={`rounded-full border px-4 py-1 text-sm ${
                            selectedDate !== today && selectedDate !== tomorrow
                                ? "border-text bg-text text-bg md:hover:bg-border"
                                : "border-border md:hover:bg-border active:bg-border bg-surface"
                        }`}
                        onClick={() =>
                            dateInputRef.current.showPicker?.() ||
                            dateInputRef.current.click()
                        }
                    >
                        {selectedDate !== today && selectedDate !== tomorrow ? (
                            <CalendarIconSolid className="h-5" />
                        ) : (
                            <CalendarIconOutline className="h-5" />
                        )}
                    </button>

                    <input
                        ref={dateInputRef}
                        type="date"
                        hidden
                        min={today}
                        onChange={(e) =>
                            setSelectedDate(e.target.value || today)
                        }
                    />
                </div>

                <div className="flex gap-4 font-bold">
                    {formattedDate}

                    {selectedSlots.length !== 0 && (
                        <p>
                            {minutesToTime(selectedSlots[0])} -{" "}
                            {minutesToTime(selectedSlots.at(-1) + 30)}
                        </p>
                    )}
                </div>
            </section>

            <SlotTimeline
                selectedSlots={selectedSlots}
                setSelectedSlots={setSelectedSlots}
            />

            {selectedSlots.length !== 0 && (
                <section className="sticky bottom-8 mt-4 flex flex-col items-center gap-2">
                    <button
                        className="bg-text text-bg rounded-xl px-4 py-2"
                        onClick={() => setSheet("form")}
                    >
                        Create Meeting
                    </button>
                </section>
            )}

            <AnimatePresence>
                {sheet === "room" && (
                    <BottomSheet open={sheet} closeSheet={() => setSheet("")}>
                        <RoomSelector
                            selectedRoom={selectedRoom}
                            selectRoom={toggleSelectedRoom}
                            closeSheet={() => setSheet("")}
                        />
                    </BottomSheet>
                )}

                {sheet === "form" && (
                    <BottomSheet open={sheet} closeSheet={() => setSheet("")}>
                        <MeetingForm
                            selectedDate={selectedDate}
                            selectedSlots={selectedSlots}
                            closeSheet={() => setSheet("")}
                        />
                    </BottomSheet>
                )}
            </AnimatePresence>
        </main>
    );
};

export default IndexPage;
