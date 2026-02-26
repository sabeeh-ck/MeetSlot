import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import SlotTimeline from "../components/SlotTimeline";
import RoomSelector from "../components/RoomSelector";
import BottomSheet from "../components/BottomSheet";
import BookingForm from "../components/BookingForm";
import { minutesTo12Hour, today } from "../utils/time";
import { useWindowWidth } from "../hooks/useWindowWidth";
import { useAvailability } from "../hooks/useAvailability";
import DateSelector from "../components/DateSelector";
import Skeleton from "react-loading-skeleton";

const IndexPage = () => {
    const { isMobile, isLaptop } = useWindowWidth();

    const [selectedRoom, setSelectedRoom] = useState("");
    const [selectedSlots, setSelectedSlots] = useState({});
    const [selectedDate, setSelectedDate] = useState(today);
    const [sheet, setSheet] = useState(null);

    const { availability, loading, refetch } = useAvailability(selectedDate);

    useEffect(() => {
        if (availability.length > 0 && !selectedRoom) {
            setSelectedRoom(availability[0].roomId);
        }
    }, [availability]);

    const formattedDate = (() => {
        const [year, month, day] = selectedDate.split("-").map(Number);
        const date = new Date(year, month - 1, day);
        const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
        return `${String(day).padStart(2, "0")}/${String(month).padStart(2, "0")} ${weekday}`;
    })();

    const currentRoom = isLaptop ? availability[0]?.roomId : selectedRoom;

    return (
        <main>
            <div>
                <section className="bg-bg sticky top-16 z-30 flex w-full flex-col gap-4 pt-4 md:hidden">
                    <RoomSelector
                        availability={availability}
                        loading={loading}
                        selectedRoom={selectedRoom}
                        setSelectedRoom={setSelectedRoom}
                        sheet={sheet}
                        setSheet={setSheet}
                    />

                    <DateSelector
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                        setSelectedSlots={setSelectedSlots}
                        loading={loading}
                    />

                    <div className="mb-4 flex gap-4 font-medium">
                        {loading ? (
                            <Skeleton
                                height={20}
                                width={105}
                                containerClassName="leading-none flex-1"
                                borderRadius={10}
                            />
                        ) : (
                            <p>{formattedDate}</p>
                        )}

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
                                refetch={refetch}
                                setSheet={setSheet}
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
                            loading={loading}
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
                                    loading={loading}
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>

            {isMobile && selectedSlots[selectedRoom]?.length > 0 && (
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
                            refetch={refetch}
                            setSelectedDate={setSelectedDate}
                            setSelectedRoom={setSelectedRoom}
                            setSelectedSlots={setSelectedSlots}
                            setSheet={setSheet}
                        />
                    </BottomSheet>
                )}
            </AnimatePresence>
        </main>
    );
};

export default IndexPage;
