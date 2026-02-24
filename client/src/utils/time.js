export const minutesTo24Hour = (minutes) =>
    `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;

export const minutesTo12Hour = (minutes) => {
    if (minutes == null) return "-- --";

    const hours24 = Math.floor(minutes / 60);
    const minutesPart = minutes % 60;

    const period = hours24 >= 12 ? "pm" : "am";
    const hours12 = hours24 % 12 || 12;

    return `${hours12}:${String(minutesPart).padStart(2, "0")} ${period}`;
};

export const today = new Date().toISOString().split("T")[0];
export const tomorrow = new Date(Date.now() + 86400000)
    .toISOString()
    .split("T")[0];
