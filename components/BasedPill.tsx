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
  <div className="absolute inset-0 grid place-items-center bg-gradient-to-r from-purple-400 via-violet-400 to-pink-400 bg-clip-text text-center text-xs text-transparent opacity-0 md:text-2xl lg:text-5xl">
    {children}
  </div>
);

interface Props {
  completed: boolean;
}

const BasedPill = ({ children, completed }: PropsWithChildren<Props>) => {
  const infoRef = useRef<HTMLDivElement>(null);
  const infoRefContainer = useRef<HTMLDivElement>(null);
  const countdownRef = useRef<HTMLDivElement>(null);
  const [timer, setTimer] = useState<NodeJS.Timer>();
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();

  const animateDissolve = (elem: HTMLElement, duration: number) => {
    if (!elem) {
      return;
    }

    elem.classList.add("animate-dissolve-text");
    elem.style.animationDuration = `${duration / 1000}s`;
    setTimeoutId(
      setTimeout(() => {
        elem.classList.remove("animate-dissolve-text");
      }, duration)
    );
  };

  const displayCountdownHideInfoRef = () => {
    const countdownElem = countdownRef.current as HTMLElement;
    countdownElem.classList.add("animate-dissolve-appear");
    countdownElem.classList.remove("hidden");
    countdownElem.classList.add("group-hover:hidden");

    const infoElem = infoRefContainer.current as HTMLElement;
    infoElem.classList.add("hidden");
    infoElem.classList.add("group-hover:block");
  };

  useEffect(() => {
    const elem = infoRef.current;
    animateDissolve(elem?.children[0] as HTMLElement, 5000);
    setTimeout(() => {
      animateDissolve(elem?.children[1] as HTMLElement, 5000);
    }, 5000);
    setTimeout(displayCountdownHideInfoRef, 10000);
  }, []);

  const onMouseEnter = () => {
    const elem = infoRef.current!.children;
    let i = 0;

    animateDissolve(elem[i] as HTMLElement, 3000);
    i = (i + 1) % elem.length;

    setTimer(
      setInterval(() => {
        animateDissolve(elem[i] as HTMLElement, 3000);
        i = (i + 1) % elem.length;
      }, 3000)
    );
    // animateInfoDissolve(0, 3000);
    // setTimer(setInterval(() => {animateInfoDissolve(1, 3000)}, 3000));
  };

  const onMouseLeave = () => {
    clearInterval(timer);
    clearTimeout(timeoutId);
    Array.from(infoRef.current?.children ?? []).forEach((child) => {
      child.classList.remove("animate-dissolve-text");
    });
  };

  return (
    <div
      className={`sm:text-md group relative z-0 px-4 py-2 font-mono hover:cursor-pointer md:px-4 md:py-2.5 md:text-3xl lg:text-6xl ${
        completed && "animate-bounce"
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* The below background will fade in on hover */}
      <Glow className="opacity-0 group-hover:opacity-50">
        <div className="absolute inset-x-0 animate-spin rounded-full bg-gradient-to-br from-blue-400 to-pink-400 pb-[100%]" />
      </Glow>

      <Glow>
        <div className="absolute inset-x-0 animate-pulse-and-spin rounded-full bg-gradient-to-br from-blue-400 to-pink-400 pb-[100%]" />
      </Glow>
      <Bg className="bg-[#121223] lg:-m-2" />
      <div className="hidden" ref={countdownRef}>
        {children}
      </div>
      {/* <div className="group-hover:hidden">{children}</div> */}
      {/* <div className="relative hidden group-hover:block"> */}
      <div className="relative" ref={infoRefContainer}>
        <div className="invisible">99d 99h 99m 99s</div>
        <div ref={infoRef}>
          <HiddenText>Fri Oct 28th 3-6pm</HiddenText>
          <HiddenText>UNSW Leighton Hall</HiddenText>
        </div>
      </div>
    </div>
  );
};

export default BasedPill;
