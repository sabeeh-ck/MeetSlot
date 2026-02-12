import { useEffect } from "react";
import { ChevronUpDownIcon } from "../icons";
import BottomSheet from "./BottomSheet";

const RoomSelector = ({
    selectedRoom,
    setSelectedRoom,
    availability,
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
            <div className="flex gap-2">
                <h2 className="select-none">
                    {
                        availability.find(
                            (room) => room.roomId === selectedRoom,
                        )?.roomName
                    }
                </h2>
                <button onClick={() => setSheet("room")}>
                    <ChevronUpDownIcon
                        className={`md:hover:bg-border border-border active:bg-border h-8 rounded-lg border py-1 text-sm ${sheet === "room" ? "bg-border" : "bg-surface"} `}
                    />
                </button>
            </div>

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
        </>
    );
};

export default RoomSelector;
