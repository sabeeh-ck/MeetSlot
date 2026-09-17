import { useEffect } from "react";
import { ChevronUpDownIcon } from "../icons";
import BottomSheet from "./BottomSheet";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Room } from "../../../shared/types";
import { Availability } from "../hooks/useAvailability";

type RoomSelectorProps = {
    availability: Availability[];
    selectedRoom: string;
    onSelect: (roomId: Room["_id"]) => void;
    loading: boolean;
    sheet: "room" | "form" | null;
    closeSheet: () => void;
    openSheet: () => void;
};

const RoomSelector = ({
    availability,
    selectedRoom,
    onSelect,
    loading,
    sheet,
    closeSheet,
    openSheet,
}: RoomSelectorProps) => {
    useEffect(() => {
        onSelect(availability[0]?.roomId);
    }, []);

    const handleClick = (room: Room["_id"]) => {
        onSelect(room);
        closeSheet();
    };

    return (
        <div className="flex w-full items-center gap-2">
            <div className="flex min-w-30 items-center gap-4">
                {loading ? (
                    <Skeleton
                        height={32}
                        containerClassName="flex-1 leading-none"
                        borderRadius={16}
                    />
                ) : (
                    <h3 className="font-semibold select-none">
                        {
                            availability?.find(
                                (room) => room.roomId === selectedRoom,
                            )?.roomName
                        }
                    </h3>
                )}

                <button onClick={openSheet}>
                    <ChevronUpDownIcon
                        className={`md:hover:bg-border border-border active:bg-border h-8 rounded-lg border py-1 text-sm ${sheet === "room" ? "bg-border" : "bg-surface"} `}
                    />
                </button>
            </div>

            <BottomSheet isOpen={sheet === "room"} closeSheet={closeSheet}>
                <div className="flex flex-col gap-4">
                    <p className="text-textmute">Select room</p>

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
        </div>
    );
};

export default RoomSelector;
