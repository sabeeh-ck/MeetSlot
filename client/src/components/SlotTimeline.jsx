import { useState } from "react";

const START = 9 * 60;
const END = 18 * 60;

const generateSlots = () => {
    const result = [];
    for (let t = START; t < END; t += 30) result.push(t);
    return result;
};

const slots = generateSlots();

const toTime = (slot) =>
    `${String(Math.floor(slot / 60)).padStart(2, "0")}:${String(slot % 60).padStart(2, "0")}`;

const SlotTimeline = ({ selectedSlots, setSelectedSlots }) => {
    console.log(selectedSlots);

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
        <section className="w-full">
            <div className="bg-r grid grid-cols-1 rounded-3xl">
                {slots.map((slot, i) => {
                    const isSelected = selectedSlots.includes(slot);
                    const prevSelected = selectedSlots.includes(slots[i - 1]);
                    const nextSelected = selectedSlots.includes(slots[i + 1]);

                    const roundTop =
                        i === 0 ||
                        (isSelected && !prevSelected) ||
                        (!isSelected && prevSelected);
                    const roundBottom =
                        i === slots.length - 1 ||
                        (isSelected && !nextSelected) ||
                        (!isSelected && nextSelected);

                    const hideTopBorder = !isSelected && nextSelected;
                    const hideBottomBorder = !isSelected && prevSelected;

                    return (
                        <div key={slot}>
                            <button
                                onClick={() => handleSelect(slot)}
                                className={`flex h-25 w-full items-start border-x pt-3 pl-5 ${roundTop ? " rounded-t-3xl border-t" : ""} ${roundBottom ? "rounded-b-3xl border-b" : ""} ${isSelected ? "bg-border border-textmuteP" : "border-border bg-transparent"} `}
                            >
                                {toTime(slot)}
                            </button>
                            {/* {i < slots.length - 1 && (
                                <hr className="text-border" />
                            )} */}
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default SlotTimeline;
