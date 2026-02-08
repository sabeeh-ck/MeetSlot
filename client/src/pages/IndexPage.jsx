import {
    CalendarIconSolid,
    CalendarIconOutline,
    ChevronUpDownIcon,
} from "../icons";
import SlotTimeline from "../components/SlotTimeline";
import { useRef, useState } from "react";
import RoomSelector from "../components/RoomSelector";
import BottomSheet from "../components/BottomSheet";
import { AnimatePresence } from "motion/react";
import MeetingForm from "../components/MeetingForm";
import { minutesToTime } from "../utils/time";
import { useMediaQuery } from "../hooks/useMediaQuery";

const IndexPage = () => {
    const today = new Date().toISOString().split("T")[0];
    const tomorrow = new Date(Date.now() + 86400000)
        .toISOString()
        .split("T")[0];
    const isMobile = useMediaQuery("(max-width: 768px)");

    const [selectedRoom, setSelectedRoom] = useState("Room 1");
    const [selectedSlots, setSelectedSlots] = useState([]);
    const [selectedDate, setSelectedDate] = useState(today);
    const [sheet, setSheet] = useState(null);

    const dateInputRef = useRef(null);

    const toggleSelectedRoom = (room) => setSelectedRoom(room);

    const formattedDate = (() => {
        const [year, month, day] = selectedDate.split("-").map(Number);
        const date = new Date(year, month - 1, day);
        const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
        return `${String(day).padStart(2, "0")}/${String(month).padStart(2, "0")} ${weekday}`;
    })();

    const dateSelector = [
        {
            content: "Today",
            action: () => setSelectedDate(today),
            isSelected: selectedDate === today,
        },
        {
            content: "Tomorrow",
            action: () => setSelectedDate(tomorrow),
            isSelected: selectedDate === tomorrow,
        },
        {
            content:
                selectedDate === today || selectedDate === tomorrow ? (
                    <CalendarIconOutline className="h-5" />
                ) : (
                    <CalendarIconSolid className="h-5" />
                ),
            action: () =>
                dateInputRef.current?.showPicker?.() ??
                dateInputRef.current?.click(),
            isSelected: selectedDate !== today && selectedDate !== tomorrow,
        },
    ];

    const DateSelector = () => (
        <>
            {" "}
            {dateSelector.map(({ content, action, isSelected }, i) => (
                <button
                    key={i}
                    onClick={action}
                    className={`rounded-full border px-4 py-1 text-sm ${
                        isSelected
                            ? "border-text bg-text text-bg md:hover:border-textmute md:hover:bg-textmute"
                            : "border-border active:bg-border md:hover:bg-border bg-surface"
                    }`}
                >
                    {content}
                </button>
            ))}
            <input
                ref={dateInputRef}
                type="date"
                hidden
                min={today}
                onChange={(e) => setSelectedDate(e.target.value || today)}
            />
        </>
    );

    console.log(selectedSlots);

    return (
        <main>
            <section className="pt-4">
                <section className="bg-bg sticky top-16 z-30 flex w-full flex-col gap-4 md:hidden">
                    <div className="flex w-full items-center gap-2">
                        <h2 className="select-none">{selectedRoom}</h2>
                        <button onClick={() => setSheet("room")}>
                            <ChevronUpDownIcon
                                className={`md:hover:bg-border border-border active:bg-border h-8 rounded-lg border py-1 text-sm ${sheet === "room" ? "bg-border" : "bg-surface"} `}
                            />
                        </button>
                    </div>

                    <div className="flex w-full items-center gap-2">
                        <DateSelector />
                    </div>

                    <div className="mb-4 flex gap-4 font-medium">
                        {formattedDate}

                        {selectedSlots.length !== 0 && (
                            <p>
                                {minutesToTime(selectedSlots[0])} -{" "}
                                {minutesToTime(selectedSlots.at(-1) + 30)}
                            </p>
                        )}
                    </div>
                </section>

                <section className="flex w-full gap-4 md:grid md:grid-cols-3 md:gap-4">
                    {!isMobile && (
                        <aside className="sticky top-20 hidden h-fit gap-4 md:z-30 md:flex md:flex-col">
                            <h3>Create Meeting</h3>
                            <MeetingForm
                                selectedDate={selectedDate}
                                selectedSlots={selectedSlots}
                            />
                        </aside>
                    )}

                    <SlotTimeline
                        key={isMobile ? selectedRoom : "desktop-room-1"}
                        selectedSlots={selectedSlots}
                        setSelectedSlots={setSelectedSlots}
                        room={isMobile ? selectedRoom : "Room 1"}
                    />

                    {!isMobile && (
                        <>
                            <SlotTimeline
                                selectedSlots={selectedSlots}
                                setSelectedSlots={setSelectedSlots}
                                room="Room 2"
                            />
                        </>
                    )}
                </section>
            </section>

            {isMobile && selectedSlots.length !== 0 && (
                <section className="sticky bottom-8 mt-10 flex flex-col items-center gap-2">
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
                    <BottomSheet open={sheet} closeSheet={() => setSheet(null)}>
                        <RoomSelector
                            selectedRoom={selectedRoom}
                            selectRoom={toggleSelectedRoom}
                            closeSheet={() => setSheet(null)}
                        />
                    </BottomSheet>
                )}

                {sheet === "form" && (
                    <BottomSheet open={sheet} closeSheet={() => setSheet(null)}>
                        <MeetingForm
                            selectedDate={selectedDate}
                            selectedSlots={selectedSlots}
                            closeSheet={() => setSheet(null)}
                        />
                    </BottomSheet>
                )}
            </AnimatePresence>
        </main>
    );
};

export default IndexPage;
