import type { PropsWithChildren } from "react";
import { useState, useEffect, useRef } from "react";

interface BgProps {
  className?: string;
}

const Bg = ({ className = "", children }: PropsWithChildren<BgProps>) => (
  <div className={`absolute inset-0 z-[-1] rounded-md ${className}`}>
    {children}
  </div>
);

const Glow = ({ className = "", children }: PropsWithChildren<BgProps>) => (
  <Bg
    className={`flex items-center overflow-hidden rounded-md blur-sm transition group-hover:blur sm:-m-1 lg:-m-3 ${className}`}
  >
    {children}
  </Bg>
);

const HiddenText = ({ children }: PropsWithChildren) => (
  <div className="absolute inset-0 grid place-items-center bg-gradient-to-r from-purple-400 via-violet-400 to-pink-400 bg-clip-text text-center text-xs text-transparent opacity-0 transition-opacity duration-1000 md:text-2xl lg:text-5xl">
    {children}
  </div>
);

const HiddenTextButton = ({ children }: PropsWithChildren) => (
  <div className="absolute inset-0 grid animate-gradient-x-fast place-items-center bg-gradient-to-r from-purple-400 via-violet-400 to-pink-400 bg-clip-text text-center font-bold text-transparent opacity-0 transition-opacity duration-1000">
    {children}
  </div>
);

interface Props {
  completed: boolean;
}

const BasedPill = ({ children, completed }: PropsWithChildren<Props>) => {
  const infoRef = useRef<HTMLDivElement>(null);
  const countdownRef = useRef<HTMLDivElement>(null);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();
  const [finishedSequence, setFinishedSequence] = useState(false);

  const animateDissolve = (elem: HTMLElement, duration: number) => {
    if (!elem) {
      return;
    }

    elem.classList.add("opacity-100");
    setTimeoutId(
      setTimeout(() => {
        elem.classList.remove("opacity-100");
      }, duration)
    );
  };

  const displayCountdownHideInfoRef = () => {
    const countdownElem = countdownRef.current as HTMLElement;
    countdownElem.classList.add("opacity-100");
    countdownElem.classList.add("group-hover:opacity-0");

    setFinishedSequence(true);
  };

  useEffect(() => {
    const elem = infoRef.current;
    animateDissolve(elem?.children[0] as HTMLElement, 4000);
    setTimeout(() => {
      animateDissolve(elem?.children[1] as HTMLElement, 4000);
    }, 4000);
    setTimeout(() => {
      animateDissolve(elem?.children[2] as HTMLElement, 10000);
    }, 8000);
    setTimeout(displayCountdownHideInfoRef, 18000);
  }, []);

  const onMouseEnter = () => {
    if (!finishedSequence) return;

    countdownRef.current!.classList.remove("opacity-100");
    infoRef.current!.children[2].classList.add("opacity-100");
  };

  const onMouseLeave = () => {
    if (!finishedSequence) return;

    clearTimeout(timeoutId);

    infoRef.current!.children[2].classList.remove("opacity-100");
    countdownRef.current!.classList.add("opacity-100");
  };

  const handleClick = () => {
    window
      .open("https://events.humanitix.com/csesoc-annual-techspire", "_blank")
      ?.focus();
  };

  return (
    <div
      className={`sm:text-md group relative z-0 px-4 py-2 font-mono hover:cursor-pointer md:px-4 md:py-2.5 md:text-3xl lg:text-6xl ${
        completed && "animate-bounce"
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={handleClick}
    >
      {/* The below background will fade in on hover */}
      <Glow className="opacity-0 group-hover:opacity-50">
        <div className="absolute inset-x-0 animate-spin rounded-full bg-gradient-to-br from-blue-400 to-pink-400 pb-[100%]" />
      </Glow>

      <Glow>
        <div className="absolute inset-x-0 animate-pulse-and-spin rounded-full bg-gradient-to-br from-blue-400 to-pink-400 pb-[100%]" />
      </Glow>
      <Bg className="bg-[#121223] lg:-m-2" />

      <div className="invisible">99d 99h 99m 99s</div>
      <div
        className="absolute inset-0 grid place-items-center opacity-0 transition-opacity duration-1000"
        ref={countdownRef}
      >
        {children}
      </div>

      <div ref={infoRef}>
        <HiddenText>Fri Oct 28th 3-6pm</HiddenText>
        <HiddenText>UNSW Leighton Hall</HiddenText>
        <HiddenTextButton>Get Tickets</HiddenTextButton>
      </div>
    </div>
  );
};

export default BasedPill;
