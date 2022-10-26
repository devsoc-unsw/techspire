import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

const useAutoplay = (): [
  RefObject<HTMLVideoElement>,
  boolean,
  Dispatch<SetStateAction<boolean>>
] => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  useEffect(() => {
    const elem = videoRef.current;
    if (elem) {
      elem.play().catch(() => {
        setAutoplayBlocked(true);
      });
    }
  }, [videoRef]);

  return [videoRef, autoplayBlocked, setAutoplayBlocked];
};

export default useAutoplay;
