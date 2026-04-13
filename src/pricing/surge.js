function calculateSurge(hour, dayOfWeek) {
  if (typeof hour !== "number" || hour < 0 || hour > 23) return 0;
  if (typeof dayOfWeek !== "string") return 0;

  const weekdays = ["monday", "tuesday", "wednesday", "thursday"];
  const weekendEvening = ["friday", "saturday"];
  const sunday = ["sunday"];

  if (sunday.includes(dayOfWeek.toLowerCase())) {
    return 1.2;
  }

  if (weekdays.includes(dayOfWeek.toLowerCase())) {
    if (hour < 10 || hour > 22) return 0;

    if (hour >= 12 && hour <= 13.5) return 1.3;
    if (hour >= 19 && hour <= 21) return 1.5;
    if (hour >= 10 && hour <= 11.5) return 1.0;
    if (hour >= 14 && hour <= 18) return 1.0;

    return 0;
  }

  if (weekendEvening.includes(dayOfWeek.toLowerCase())) {
    if (hour >= 19 && hour < 22) return 1.8;

    if (hour < 10 || hour >= 22) return 0;
    return 1.0;
  }

  return 0;
}

module.exports = {
  calculateSurge,
};