import { FC, useEffect, useRef, useState } from "react";
import { useConfetti } from "../hooks/useConfetti";
import { calculateTimeLeft, formatTime } from "../lib/countdown";
import BasedPill from "./BasedPill";

interface Props {
  date: Date;
  completed: boolean;
  setCompleted: (_value: boolean) => void;
}

const BasedCountdown: FC<Props> = ({ date, completed, setCompleted }) => {
  const [value, setValue] = useState(calculateTimeLeft(date));
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
  }, [date, fire, completed, setCompleted]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute z-50 !m-0 h-screen w-screen"
      />
      <BasedPill completed={completed}>
        {completed ? "ITS TIME!!! 🥳" : formatTime(value)}
      </BasedPill>
    </>
  );
};

export default BasedCountdown;
