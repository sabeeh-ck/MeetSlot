import { useEffect } from "react";
import { ChevronUpDownIcon } from "../icons";
import BottomSheet from "./BottomSheet";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { AnimatePresence } from "motion/react";

const RoomSelector = ({
    selectedRoom,
    setSelectedRoom,
    availability,
    loading,
    sheet,
    setSheet,
}) => {
    useEffect(() => {
        setSelectedRoom(availability[0]?.roomId);
    }, []);

    const closeSheet = () => setSheet(null);

    const handleClick = (room) => {
        setSelectedRoom(room);
        closeSheet();
    };

    return (
        <>
            <div className="flex w-20 gap-2">
                {loading ? (
                    <Skeleton
                        className="h-8"
                        containerClassName="flex-1 leading-none"
                        borderRadius={8}
                    />
                ) : (
                    <h2 className="w-19 select-none">
                        {
                            availability.find(
                                (room) => room.roomId === selectedRoom,
                            )?.roomName
                        }
                    </h2>
                )}
            </div>
            <button onClick={() => setSheet("room")}>
                <ChevronUpDownIcon
                    className={`md:hover:bg-border border-border active:bg-border h-8 rounded-lg border py-1 text-sm ${sheet === "room" ? "bg-border" : "bg-surface"} `}
                />
            </button>

            <AnimatePresence>
                {sheet === "room" && (
                    <BottomSheet open={sheet} closeSheet={closeSheet}>
                        <div className="flex flex-col gap-4">
                            <h2 className="">Rooms</h2>
                            {availability.map(({ roomId, roomName }) => {
                                const isSelected = selectedRoom === roomId;

                                return (
                                    <button
                                        key={roomId}
                                        onClick={() => handleClick(roomId)}
                                        className={`active:bg-border rounded-lg px-2 py-2 text-left ${isSelected ? "bg-border" : "bg-transparent"}`}
                                    >
                                        {roomName}
                                    </button>
                                );
                            })}
                        </div>
                    </BottomSheet>
                )}
            </AnimatePresence>
        </>
    );
};

export default RoomSelector;
