import { CalendarIcon, ChevronUpDownIcon } from "@heroicons/react/24/solid";
import SlotTimeline from "../components/SlotTimeline";
import { useEffect, useState } from "react";
import RoomSelector from "../components/RoomSelector";
import BottomSheet from "../components/BottomSheet";
import { AnimatePresence } from "motion/react";
import MeetingForm from "../components/MeetingForm";

const IndexPage = () => {
    const [selectedRoom, setSelectedRoom] = useState("");
    const [selectedSlots, setSelectedSlots] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [activeSheet, setActiveSheet] = useState("");

    useEffect(() => {
        setSelectedRoom("Room 1");
        setSelectedDate(new Date().toISOString().split("T")[0]);
    }, []);

    const toggleSelectedRoom = (room) => setSelectedRoom(room);

    const formattedDate = (() => {
        const [year, month, day] = selectedDate.split("-").map(Number);
        const date = new Date(year, month - 1, day);
        const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
        return `${String(day).padStart(2, "0")}/${String(month).padStart(2, "0")} ${weekday}`;
    })();

    return (
        <main>
            <section className="flex w-full gap-2">
                <h1>{selectedRoom}</h1>
                <button onClick={() => setActiveSheet("room")}>
                    <ChevronUpDownIcon className="h-6" />
                </button>
            </section>

            <section className="flex w-full flex-col gap-4">
                <div className="flex w-full items-center gap-2">
                    <button
                        onClick={() =>
                            setSelectedDate(
                                new Date().toISOString().split("T")[0],
                            )
                        }
                        className="border-textmute rounded-full border px-4 py-1 text-sm"
                    >
                        Today
                    </button>

                    <button
                        onClick={() =>
                            setSelectedDate(
                                new Date(Date.now() + 86400000)
                                    .toISOString()
                                    .split("T")[0],
                            )
                        }
                        className="border-border rounded-full border px-4 py-1 text-sm"
                    >
                        Tomorrow
                    </button>

                    <button className="border-border rounded-full border px-4 py-1 text-sm">
                        <CalendarIcon className="h-5" />
                    </button>
                </div>

                <div className="text-sm">{formattedDate}</div>
            </section>

            <SlotTimeline
                selectedSlots={selectedSlots}
                setSelectedSlots={setSelectedSlots}
            />

            {selectedSlots.length !== 0 && (
                <button
                    className="bg-text text-bg sticky bottom-8 rounded-xl px-4 py-2"
                    onClick={() => setActiveSheet("form")}
                >
                    Create Meeting
                </button>
            )}

            <AnimatePresence>
                {activeSheet === "room" && (
                    <BottomSheet
                        open={activeSheet}
                        closeSheet={() => setActiveSheet("")}
                    >
                        <RoomSelector
                            selectedRoom={selectedRoom}
                            selectRoom={toggleSelectedRoom}
                            closeSheet={() => setActiveSheet("")}
                        />
                    </BottomSheet>
                )}

                {activeSheet === "form" && (
                    <BottomSheet
                        open={activeSheet}
                        closeSheet={() => setActiveSheet("")}
                    >
                        <MeetingForm
                            selectedDate={selectedDate}
                            selectedSlots={selectedSlots}
                            closeSheet={() => setActiveSheet("")}
                        />
                    </BottomSheet>
                )}
            </AnimatePresence>
        </main>
    );
};

export default IndexPage;
