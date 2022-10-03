import confetti from "canvas-confetti";
import { RefObject } from "react";

export const useConfetti = () => {
  const fire = (canvasRef: RefObject<HTMLCanvasElement>) => {
    if (!canvasRef?.current) return;
    const uwu = confetti.create(canvasRef.current, {
      resize: true,
      useWorker: true,
    });
    uwu();
  };

  return { fire };
};
