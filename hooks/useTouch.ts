import { TouchEvent, useCallback, useRef } from "react";

const useTouch = (
  callback: (_touchStart: number, _touchEnd: number) => void
) => {
  const touchStart = useRef<number | null>(null);
  const onTouchStart = useCallback((e: TouchEvent) => {
    touchStart.current = e.touches[0].clientY;
  }, []);

  const onTouchMove = useCallback(
    (e: TouchEvent) => {
      if (touchStart.current === null) {
        touchStart.current = e.touches[0].clientY;
      } else {
        callback(touchStart.current, e.changedTouches[0].clientY);
        touchStart.current = null;
      }
    },
    [callback]
  );

  return [onTouchStart, onTouchMove];
};

export default useTouch;
