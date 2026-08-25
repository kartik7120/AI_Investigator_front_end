export const ConvertUTCToDateAndTime = (
  time: string,
): { date: string; time: string } => {
  const date = new Date(time);

  if (Number.isNaN(date.getTime())) {
    return { date: "", time: "" };
  }

  const formattedDate = date.toLocaleDateString("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const formattedTime = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  return {
    date: formattedDate,
    time: formattedTime,
  };
};

export const FlightDuration = (
  departureTime: Date,
  arrivalTime: Date,
): string => {
  const duration = arrivalTime.getTime() - departureTime.getTime();

  const hrs = duration / (1000 * 60 * 60);

  return `${hrs} hr`;
};
