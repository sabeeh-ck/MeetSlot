import { minutesTo12Hour } from "../utils/time";
import { START_TIME, END_TIME, SLOT_DURATION } from "../../constants";
import Skeleton from "react-loading-skeleton";

const generateSlots = () => {
    const result = [];
    for (let t = START_TIME * 60; t < END_TIME * 60; t += SLOT_DURATION)
        result.push(t);
    return result;
};

const slots = generateSlots();

const Slot = ({
    slot,
    i,
    isSelected,
    isBooked,
    roundTop,
    roundBottom,
    handleSelect,
}) => {
    return (
        <div key={slot}>
            <button
                type="button"
                onClick={() => handleSelect(slot)}
                disabled={isBooked}
                className={`flex h-25 w-full flex-col items-start border-x py-1 pl-8 text-sm ${roundTop} ${roundBottom} ${
                    isBooked
                        ? isBooked
                        : isSelected
                          ? isSelected
                          : "border-border bg-surface"
                } `}
            >
                <div className="flex gap-2">
                    {((!isSelected && !isBooked) || roundTop) && (
                        <p>{minutesTo12Hour(slot)}</p>
                    )}

                    {isBooked && roundTop && <p>Reserved</p>}
                </div>

                {(isSelected || isBooked) && roundBottom && (
                    <p className="mt-auto">{minutesTo12Hour(slot + 30)}</p>
                )}
            </button>
            {!roundBottom && (
                <hr
                    className={`text-border border-x pt-1 ${isBooked ? "bg-bookedBg border-bookedBorder" : isSelected ? "bg-border border-textmute" : "border-border bg-surface"} `}
                />
            )}
        </div>
    );
};

const SlotTimeline = ({
    currentRoom,
    selectedSlots,
    selectSlot,
    selectedRoom,
    setSelectedRoom,
    availability,
    loading,
}) => {
    const currentRoomData = availability.find(
        (room) => room.roomId === currentRoom,
    );

    const bookedSlots = currentRoomData
        ? currentRoomData.bookedSlots
              .flatMap((b) => {
                  const startDate = new Date(b.start);
                  const endDate = new Date(b.end);
                  const startMin =
                      startDate.getHours() * 60 + startDate.getMinutes();
                  const endMin = endDate.getHours() * 60 + endDate.getMinutes();

                  let slots = [];
                  let cur = startMin;

                  while (cur < endMin) {
                      slots.push(cur);
                      cur += SLOT_DURATION;
                  }

                  return slots;
              })
              .sort((a, b) => a - b)
        : [];

    const handleSelect = (slot) => {
        if (currentRoom !== selectedRoom) {
            setSelectedRoom(currentRoom);
            selectSlot([slot]);
            return;
        }

        if (selectedSlots?.length === 0) {
            selectSlot([slot]);
            return;
        }

        if (selectedSlots?.length === 1) {
            const start = selectedSlots[0];

            if (start === slot) {
                selectSlot([]);
                return;
            }

            const min = Math.min(start, slot);
            const max = Math.max(start, slot);

            const range = Array.from(
                { length: (max - min) / SLOT_DURATION + 1 },
                (_, i) => min + i * SLOT_DURATION,
            );

            const hitsBooked = range.some((s) => bookedSlots.includes(s));

            if (hitsBooked) {
                selectSlot([slot]);
                return;
            }

            selectSlot(range);
            return;
        }

        selectSlot([slot]);
    };

    return (
        <section className="flex w-full flex-col gap-4">
            {loading ? (
                <div className="flex flex-col gap-2">
                    <Skeleton
                        className="h-7"
                        containerClassName="hidden leading-none md:inline-block"
                        borderRadius={8}
                    />
                    <Skeleton className="h-50" borderRadius={24} />
                    <Skeleton className="h-75" borderRadius={24} />
                    <Skeleton className="h-25" borderRadius={24} />
                </div>
            ) : (
                <>
                    <h3 className="hidden md:flex">
                        {
                            availability?.find(
                                (room) => room.roomId === currentRoom,
                            )?.roomName
                        }
                    </h3>

                    <div className="grid grid-cols-1 rounded-3xl">
                        {slots.map((slot, i) => {
                            const isSelected = selectedSlots?.includes(slot)
                                ? "bg-border border-textmute"
                                : "";

                            const prevSelected = selectedSlots?.includes(
                                slots[i - 1],
                            );
                            const nextSelected = selectedSlots?.includes(
                                slots[i + 1],
                            );

                            const isBooked = bookedSlots.includes(slot)
                                ? "bg-bookedBg border-bookedBorder text-bookedText"
                                : "";

                            const prevBooked = bookedSlots.includes(
                                slots[i - 1],
                            );
                            const nextBooked = bookedSlots.includes(
                                slots[i + 1],
                            );

                            const roundTop =
                                i === 0 ||
                                (isSelected && !prevSelected) ||
                                (!isSelected && prevSelected) ||
                                (isBooked && !prevBooked) ||
                                (!isBooked && prevBooked)
                                    ? "rounded-t-3xl border-t"
                                    : "";

                            const roundBottom =
                                i === slots.length - 1 ||
                                (isSelected && !nextSelected) ||
                                (!isSelected && nextSelected) ||
                                (isBooked && !nextBooked) ||
                                (!isBooked && nextBooked)
                                    ? "mb-2 rounded-b-3xl border-b"
                                    : "";
                            return (
                                <Slot
                                    key={slot}
                                    slot={slot}
                                    i={i}
                                    isSelected={isSelected}
                                    isBooked={isBooked}
                                    handleSelect={handleSelect}
                                    roundTop={roundTop}
                                    roundBottom={roundBottom}
                                />
                            );
                        })}
                    </div>
                </>
            )}
        </section>
    );
};

export default SlotTimeline;
