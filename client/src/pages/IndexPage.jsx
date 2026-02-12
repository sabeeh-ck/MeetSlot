import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "motion/react";

import SlotTimeline from "../components/SlotTimeline";
import RoomSelector from "../components/RoomSelector";
import BottomSheet from "../components/BottomSheet";
import BookingForm from "../components/BookingForm";
import { minutesTo12Hour } from "../utils/time";
import { useWindowWidth } from "../hooks/useWindowWidth";
import {
    CalendarIconSolid,
    CalendarIconOutline,
    ChevronUpDownIcon,
} from "../icons";
import { useAvailability } from "../hooks/useAvailability";

const IndexPage = () => {
    const today = new Date().toISOString().split("T")[0];
    const tomorrow = new Date(Date.now() + 86400000)
        .toISOString()
        .split("T")[0];
    const { isMobile, isTablet, isLaptop } = useWindowWidth();

    const [selectedRoom, setSelectedRoom] = useState("");
    const [selectedSlots, setSelectedSlots] = useState({});
    const [selectedDate, setSelectedDate] = useState(today);
    const [sheet, setSheet] = useState(null);

    const dateInputRef = useRef(null);

    const toggleSelectedRoom = (roomId) => setSelectedRoom(roomId);

    const { availability, loading } = useAvailability(selectedDate);

    useEffect(() => {
        if (availability.length > 0 && !selectedRoom) {
            setSelectedRoom(availability[0].roomId);
        }
    }, [availability]);

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
                value={selectedDate}
                hidden
                min={today}
                onChange={(e) => setSelectedDate(e.target.value || today)}
            />
        </>
    );

    const currentRoom = isLaptop ? availability[0]?.roomId : selectedRoom;

    return (
        <main>
            <div>
                <section className="bg-bg sticky top-16 z-30 flex w-full flex-col gap-4 pt-4 md:hidden">
                    <div className="flex w-full items-center gap-2">
                        <RoomSelector
                            availability={availability}
                            selectedRoom={selectedRoom}
                            setSelectedRoom={setSelectedRoom}
                            sheet={sheet}
                            setSheet={setSheet}
                        />
                    </div>

                    <div className="flex w-full items-center gap-2">
                        <DateSelector />
                    </div>

                    <div className="mb-4 flex gap-4 font-medium">
                        <p>{formattedDate}</p>

                        {selectedSlots[selectedRoom]?.length > 0 && (
                            <p>
                                {minutesTo12Hour(
                                    selectedSlots[selectedRoom][0],
                                )}{" "}
                                -{" "}
                                {minutesTo12Hour(
                                    selectedSlots[selectedRoom].at(-1) + 30,
                                )}
                            </p>
                        )}
                    </div>
                </section>

                <div className="w-full gap-6 md:grid md:grid-cols-2 md:py-4 lg:grid-cols-3">
                    {!isMobile && (
                        <aside className="sticky top-20 hidden h-fit gap-4 md:z-30 md:flex md:flex-col">
                            <h3>Create Meeting</h3>
                            <BookingForm
                                selectedDate={selectedDate}
                                setSelectedDate={setSelectedDate}
                                selectedSlots={selectedSlots[selectedRoom]}
                                setSelectedSlots={setSelectedSlots}
                                selectedRoom={selectedRoom}
                                setSelectedRoom={setSelectedRoom}
                                availability={availability}
                            />
                        </aside>
                    )}
                    <div className="flex gap-4 lg:col-span-2">
                        <SlotTimeline
                            key={
                                isLaptop
                                    ? "desktop-room-a"
                                    : `mobile-${selectedRoom}`
                            }
                            currentRoom={currentRoom}
                            selectedSlots={selectedSlots[currentRoom]}
                            selectSlot={(slots) =>
                                setSelectedSlots({
                                    [currentRoom]: slots,
                                })
                            }
                            selectedRoom={selectedRoom}
                            setSelectedRoom={setSelectedRoom}
                            date={selectedDate}
                            availability={availability}
                        />

                        {isLaptop && (
                            <>
                                <SlotTimeline
                                    key="desktop-room-b"
                                    selectedSlots={
                                        selectedSlots[availability[1]?.roomId]
                                    }
                                    selectSlot={(slots) =>
                                        setSelectedSlots({
                                            [availability[1]?.roomId]: slots,
                                        })
                                    }
                                    selectedRoom={selectedRoom}
                                    setSelectedRoom={setSelectedRoom}
                                    date={selectedDate}
                                    currentRoom={availability[1]?.roomId}
                                    availability={availability}
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>

            {isMobile && selectedSlots[selectedRoom]?.length !== 0 && (
                <div className="fixed inset-x-0 bottom-10 flex w-full flex-col items-center">
                    <button
                        className="bg-text text-bg rounded-xl px-4 py-2"
                        onClick={() => setSheet("form")}
                    >
                        Create Meeting
                    </button>
                </div>
            )}

            <AnimatePresence>
                {sheet === "form" && (
                    <BottomSheet open={sheet} closeSheet={() => setSheet(null)}>
                        <BookingForm
                            selectedDate={selectedDate}
                            selectedSlots={selectedSlots[selectedRoom]}
                            selectedRoom={selectedRoom}
                            closeSheet={() => setSheet(null)}
                            availability={availability}
                        />
                    </BottomSheet>
                )}
            </AnimatePresence>
        </main>
    );
};

export default IndexPage;
