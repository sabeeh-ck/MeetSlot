import { useRef } from "react";
import { CalendarIcon } from "../icons";
import { today, tomorrow } from "../utils/time";

type DateSelectorProps = {
    selectedDate: string;
    onSelect: (value: string) => void;
};

const DateSelector = ({ selectedDate, onSelect }: DateSelectorProps) => {
    const dateInputRef = useRef<HTMLInputElement>(null);

    const dateSelector = [
        {
            content: "Today",
            action: () => onSelect(today),
            isSelected: selectedDate === today,
        },
        {
            content: "Tomorrow",
            action: () => onSelect(tomorrow),
            isSelected: selectedDate === tomorrow,
        },
        {
            content: <CalendarIcon className="h-5" />,
            action: () =>
                dateInputRef.current?.showPicker?.() ??
                dateInputRef.current?.click(),
            isSelected: selectedDate !== today && selectedDate !== tomorrow,
        },
    ];

    return (
        <div className="flex w-full items-center gap-2">
            {dateSelector.map(({ content, action, isSelected }, i) => {
                return (
                    <button
                        key={i}
                        onClick={action}
                        className={`rounded-full border px-4 py-1 text-sm ${
                            isSelected
                                ? "border-text bg-text text-bg md:hover:border-textmute md:hover:bg-textmute"
                                : "border-border active:bg-border md:hover:bg-border bg-surface"
                        }`}
                    >
                        {content}
                    </button>
                );
            })}

            <input
                ref={dateInputRef}
                type="date"
                value={selectedDate}
                hidden
                min={today}
                onChange={(e) => onSelect(e.target.value || today)}
            />
        </div>
    );
};

export default DateSelector;
