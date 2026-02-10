import { useEffect, useState } from "react";
import { minutesToTime, timeToMinutes } from "../utils/time";
import api from "../api/axios";

const START = 9 * 60;
const END = 18 * 60;

const generateSlots = () => {
    const result = [];
    for (let t = START; t < END; t += 30) result.push(t);
    return result;
};

const slots = generateSlots();

const SlotTimeline = ({
    currentRoom,
    selectedSlots,
    date,
    setSelectedSlots,
}) => {
    const [availability, setAvailability] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAvailability = async () => {
            setLoading(true);
            try {
                const res = await api.get(
                    `/bookings/availability?date=${date}`,
                );
                setAvailability(res.data);
                console.log(res.data);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        };

        fetchAvailability();
    }, [date]);

    const currentRoomData = availability.find(
        (room) => room.roomName === currentRoom,
    );

    const bookedSlots = currentRoomData
        ? currentRoomData.bookedSlots
              .flatMap((b) => {
                  const start = b.start.split(":").map(Number);
                  const end = b.end.split(":").map(Number);
                  let slots = [];
                  let cur = start[0] * 60 + start[1];
                  const endMin = end[0] * 60 + end[1];
                  while (cur < endMin) {
                      slots.push(cur);
                      cur += 30; // your slot length in minutes
                  }
                  return slots;
              })
              .sort((a, b) => a - b)
        : [];

    const handleSelect = (slot) =>
        setSelectedSlots((prev) => {
            if (prev.length !== 1) return [slot];

            if (prev[0] === slot) return [];

            const start = prev[0];
            const end = slot;

            const min = Math.min(start, end);
            const max = Math.max(start, end);

            return Array.from(
                { length: (max - min) / 30 + 1 },
                (_, i) => min + i * 30,
            );
        });

    return (
        <section className="flex w-full flex-col gap-4">
            <h3 className="hidden lg:flex">{currentRoom}</h3>
            <div className="grid grid-cols-1 rounded-3xl">
                {slots.map((slot, i) => {
                    const isSelected = selectedSlots.includes(slot);
                    const prevSelected = selectedSlots.includes(slots[i - 1]);
                    const nextSelected = selectedSlots.includes(slots[i + 1]);
                    const isBooked = bookedSlots.includes(slot);
                    const prevBooked = bookedSlots.includes(slots[i - 1]);
                    const nextBooked = bookedSlots.includes(slots[i + 1]);

                    const roundTop =
                        i === 0 ||
                        (isSelected && !prevSelected) ||
                        (!isSelected && prevSelected) ||
                        (isBooked && !prevBooked) ||
                        (!isBooked && prevBooked);
                    const roundBottom =
                        i === slots.length - 1 ||
                        (isSelected && !nextSelected) ||
                        (!isSelected && nextSelected) ||
                        (isBooked && !nextBooked) ||
                        (!isBooked && nextBooked);
                    return (
                        <div key={slot}>
                            <button
                                onClick={() => handleSelect(slot)}
                                disabled={isBooked}
                                className={`flex h-25 w-full flex-col items-start border-x py-1 pl-8 text-sm ${roundTop ? " rounded-t-3xl border-t" : ""} ${roundBottom ? "mb-2 rounded-b-3xl border-b" : ""} ${isBooked ? "bg-bookedBg border-bookedBorder text-bookedText" : isSelected ? "bg-border border-textmute" : "border-border bg-surface"} `}
                            >
                                {((!isSelected && !isBooked) || roundTop) && (
                                    <p>{minutesToTime(slot)}</p>
                                )}

                                {(isSelected || isBooked) && roundBottom && (
                                    <p className="mt-auto">
                                        {minutesToTime(slot + 30)}
                                    </p>
                                )}
                            </button>
                            {!roundBottom && (
                                <hr
                                    className={`text-border border-x pt-1 ${isBooked ? "bg-bookedBg border-bookedBorder" : isSelected ? "bg-border border-textmute" : "border-border bg-surface"} `}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default SlotTimeline;
