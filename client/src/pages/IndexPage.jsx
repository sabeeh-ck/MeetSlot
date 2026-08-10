import { useEffect, useState } from "react";
import SlotTimeline from "../components/SlotTimeline";
import RoomSelector from "../components/RoomSelector";
import BottomSheet from "../components/BottomSheet";
import BookingForm from "../components/BookingForm";
import { minutesTo12Hour, today } from "../utils/time";
import { useWindowWidth } from "../hooks/useWindowWidth";
import { useAvailability } from "../hooks/useAvailability";
import DateSelector from "../components/DateSelector";
import Skeleton from "react-loading-skeleton";
import { PlusIcon } from "../icons";

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
        <div className="mx-4">
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

                <div className="w-full gap-6 md:grid md:grid-cols-2 md:pb-4 lg:grid-cols-3">
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

                    <div className="scrollbar-thin scrollbar-track-surface scrollbar-thumb-border flex items-start gap-4 overflow-y-auto lg:col-span-2 lg:h-[calc(100dvh-80px)] lg:snap-x lg:snap-mandatory lg:overflow-x-auto">
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

                        {isLaptop &&
                            availability.slice(1).map(({ roomId }) => (
                                <SlotTimeline
                                    key={roomId}
                                    selectedSlots={selectedSlots[roomId]}
                                    selectSlot={(slots) =>
                                        setSelectedSlots({
                                            [roomId]: slots,
                                        })
                                    }
                                    selectedRoom={selectedRoom}
                                    setSelectedRoom={setSelectedRoom}
                                    date={selectedDate}
                                    currentRoom={roomId}
                                    availability={availability}
                                    loading={loading}
                                />
                            ))}
                    </div>
                </div>
            </div>

            {isMobile && selectedSlots[selectedRoom]?.length > 0 && (
                <div className="fixed right-4 bottom-24 flex flex-col items-end">
                    <button
                        className="bg-text text-bg drop-shadow-bg rounded-2xl p-4 drop-shadow-lg"
                        onClick={() => setSheet("form")}
                    >
                        <PlusIcon className="size-8" />
                    </button>
                </div>
            )}

            <BottomSheet
                open={sheet === "form"}
                closeSheet={() => setSheet(null)}
            >
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
        </div>
    );
};

export default IndexPage;
