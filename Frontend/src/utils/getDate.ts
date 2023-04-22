export function getDate(dateUnixTimestamp: number) {
  const date = new Date(dateUnixTimestamp * 1000);
  return date
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/-/g, "/");
}

export function calculateDaysBetweenDates(
  createTimestamp: number,
  endTimestamp: number
) {
  const oneDay = 1000 * 60 * 60 * 24;
  const differenceInTime = endTimestamp - createTimestamp;
  const days = Math.floor(differenceInTime / oneDay);
  return days;
}

export function countdownTimer(createTimestamp: number, endTimestamp: number) {
  const oneSecond = 1000;
  const oneMinute = oneSecond * 60;
  const oneHour = oneMinute * 60;
  const oneDay = oneHour * 24;
  const differenceInTime = endTimestamp - createTimestamp;
  const leftTime = differenceInTime % oneDay;
  const hours = Math.floor(leftTime / oneHour);
  const minutes = Math.floor((leftTime % oneHour) / oneMinute);
  const seconds = Math.floor((leftTime % oneMinute) / oneSecond);
  return `${hours}:${minutes}:${seconds}`;
}
