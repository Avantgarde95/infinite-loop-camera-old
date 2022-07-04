interface Time {
  year: number;
  month: number;
  monthDay: number;
  weekDay: number;
  hour: number;
  minute: number;
}

export function getTime(date: Date): Time {
  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    monthDay: date.getDate() - 1,
    weekDay: date.getDay(),
    hour: date.getHours(),
    minute: date.getMinutes(),
  };
}

const weekDayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function getTimeStrings(time: Time) {
  const ampmHour = time.hour % 12;

  return {
    year: `${time.year}`,
    month: `${time.month + 1}`.padStart(2, "0"),
    monthDay: `${time.monthDay + 1}`.padStart(2, "0"),
    weekDay: weekDayNames[time.weekDay % 7].slice(0, 3),
    hour: `${ampmHour === 0 ? 12 : ampmHour}`.padStart(2, "0"),
    minute: `${time.minute}`.padStart(2, "0"),
    ampm: time.hour >= 12 ? "PM" : "AM",
  };
}
