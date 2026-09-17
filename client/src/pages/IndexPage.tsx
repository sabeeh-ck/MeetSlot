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
import Toast, { ToastState, ToastType } from "../components/Toast";
import { Room } from "../../../shared/types";

type SelectedSlots = Record<string, number[]>;

const IndexPage = () => {
    const { isMobile, isLaptop } = useWindowWidth();

    const [selectedRoom, setSelectedRoom] = useState("");
    const [selectedSlots, setSelectedSlots] = useState<SelectedSlots>({});
    const [selectedDate, setSelectedDate] = useState(today);
    const [sheet, setSheet] = useState<"form" | "room" | null>(null);
    const [toast, setToast] = useState<ToastState>({
        type: "info",
        message: "",
    });

    const { availability, loading, refetch } = useAvailability(selectedDate);

    useEffect(() => {
        if (availability.length > 0 && !selectedRoom)
            setSelectedRoom(availability[0].roomId);
    }, [availability]);

    const showToast = (type: ToastType, message: string) =>
        setToast({ type, message });

    const closeToast = () => setToast(null);

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
                <section className="bg-bg fixed top-16 z-30 flex h-34 w-full flex-col gap-4 pt-4 md:hidden">
                    <RoomSelector
                        availability={availability}
                        loading={loading}
                        selectedRoom={selectedRoom}
                        onSelect={(room: Room["_id"]) => {
                            setSelectedRoom(room);
                            setSheet(null);
                        }}
                        sheet={sheet}
                        openSheet={() => setSheet("room")}
                        closeSheet={() => setSheet(null)}
                    />

                    <DateSelector
                        selectedDate={selectedDate}
                        onSelect={(date) => {
                            setSelectedDate(date);
                            setSelectedSlots({});
                        }}
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
                                    (selectedSlots[selectedRoom].at(-1) ?? 0) +
                                        30,
                                )}
                            </p>
                        )}
                    </div>
                </section>

                <div className="from-bg via-bg/25 pointer-events-none fixed top-50 left-0 z-40 h-8 w-full bg-linear-to-b to-transparent md:hidden" />

                <div className="mt-38 w-full gap-6 md:m-0 md:grid md:grid-cols-2 md:pb-4 lg:grid-cols-3">
                    {!isMobile && (
                        <aside className="sticky top-20 hidden h-fit gap-4 md:z-30 md:flex md:flex-col">
                            <h3>Create Meeting</h3>

                            <BookingForm
                                selectedDate={selectedDate}
                                selectedSlots={selectedSlots[selectedRoom]}
                                selectedRoom={selectedRoom}
                                availability={availability}
                                onDateChange={(date) => {
                                    setSelectedDate(date);
                                    setSelectedSlots({});
                                }}
                                onRoomChange={(room) => setSelectedRoom(room)}
                                onSubmit={async () => {
                                    setSheet(null);
                                    setSelectedSlots({});
                                    await refetch();
                                }}
                                showToast={showToast}
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
                                    currentRoom={roomId}
                                    availability={availability}
                                    loading={loading}
                                />
                            ))}
                    </div>
                </div>
            </div>

            {isMobile && selectedSlots[selectedRoom]?.length > 0 && (
                <button
                    className="bg-text text-bg drop-shadow-bg border-border fixed right-6 bottom-24 rounded-full border p-4 drop-shadow-lg"
                    onClick={() => setSheet("form")}
                >
                    <PlusIcon className="size-6" />
                </button>
            )}

            <BottomSheet
                isOpen={sheet === "form"}
                closeSheet={() => setSheet(null)}
            >
                <BookingForm
                    selectedDate={selectedDate}
                    selectedSlots={selectedSlots[selectedRoom]}
                    selectedRoom={selectedRoom}
                    availability={availability}
                    onDateChange={(date) => {
                        setSelectedDate(date);
                        setSelectedSlots({});
                    }}
                    onRoomChange={(room) => setSelectedRoom(room)}
                    onSubmit={async () => {
                        setSheet(null);
                        setSelectedSlots({});
                        await refetch();
                    }}
                    showToast={showToast}
                />
            </BottomSheet>

            <Toast
                isOpen={toast !== null}
                onClose={closeToast}
                type={toast?.type ?? "info"}
            >
                {toast?.message ?? ""}
            </Toast>
        </div>
    );
};

export default IndexPage;
