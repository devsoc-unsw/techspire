export const calculateTimeLeft = (date: Date) => {
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  return diff;
};

const pad = (unit: number) => unit.toString().padStart(2, "0");

export const formatTime = (time?: number) => {
  if (time === undefined) {
    return "Oepsie poepsie";
  }

  const days = Math.floor(time / (1000 * 60 * 60 * 24));
  const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((time % (1000 * 60)) / 1000);

  return `${pad(days)}d ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
};
