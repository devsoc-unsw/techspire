import { FC, useEffect, useRef, useState } from "react";
import { calculateTimeLeft, formatTime } from "../lib/countdown";
import BasedPill from "./BasedPill";

interface Props {
  date: Date;
  setCompleted: (_value: boolean) => void;
}

const BasedCountdown: FC<Props> = ({ date, setCompleted }) => {
  const [value, setValue] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const timeLeft = Math.max(calculateTimeLeft(date), 0);
    setValue(timeLeft);
    if (!timeLeft) return;

    const interval = setInterval(() => {
      const timeLeft = calculateTimeLeft(date);
      if (timeLeft <= 0) {
        setCompleted(true);
        setValue(0);
        clearInterval(interval);
        // fire(canvasRef);
      } else {
        setValue(timeLeft);
      }
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, setCompleted]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute z-50 !m-0 h-screen w-screen"
      />
      <BasedPill>{formatTime(value)}</BasedPill>
    </>
  );
};

export default BasedCountdown;
