export const hasOverlap = (existingBookings, startTime, endTime) =>
    existingBookings.some((b) => startTime < b.endTime && endTime > b.startTime);
