import { FC, useEffect, useRef, useState } from "react";
import { useConfetti } from "../hooks/useConfetti";
import { calculateTimeLeft, formatTime } from "../lib/countdown";
import BasedPill from "./BasedPill";

interface Props {
  date: Date;
}

const BasedCountdown: FC<Props> = ({ date }) => {
  const [value, setValue] = useState(calculateTimeLeft(date));
  const [completed, setCompleted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { fire } = useConfetti();

  useEffect(() => {
    const interval = setInterval(() => {
      if (calculateTimeLeft(date) <= 0) {
        setCompleted(true);
        clearInterval(interval);
        fire(canvasRef);
      } else {
        setValue(calculateTimeLeft(date));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [date, fire]);

  return (
    <>
      <canvas ref={canvasRef} className="absolute z-50 h-screen w-screen" />
      <BasedPill>{completed ? "Completed" : formatTime(value)}</BasedPill>
    </>
  );
};

export default BasedCountdown;
