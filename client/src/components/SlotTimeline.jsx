import { minutesToTime } from "../utils/time";

const START = 9 * 60;
const END = 18 * 60;

const generateSlots = () => {
    const result = [];
    for (let t = START; t < END; t += 30) result.push(t);
    return result;
};

const slots = generateSlots();

const SlotTimeline = ({ selectedSlots, setSelectedSlots }) => {
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
                                className={`flex h-25 w-full items-start border-x pt-3 pl-5 text-sm ${roundTop ? " rounded-t-3xl border-t" : ""} ${roundBottom ? "mb-2 rounded-b-3xl border-b" : ""} ${isSelected ? "bg-border border-textmute" : "border-border bg-surface"} `}
                            >
                                {minutesToTime(slot)}
                            </button>
                            {!roundBottom && (
                                <hr
                                    className={`text-border border-x py-1 ${isSelected ? "bg-border border-textmute" : "border-border bg-surface"} `}
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
