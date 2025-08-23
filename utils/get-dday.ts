import { differenceInCalendarDays, isToday } from "date-fns";

export const getDDay = (eventDate: Date) => {
  const today = new Date();
  if (isToday(eventDate)) {
    return "D-Day";
  }

  const diff = differenceInCalendarDays(eventDate, today);
  return `D-${diff}`;
};
