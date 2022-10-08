import type { PropsWithChildren } from "react";
import { useState, useRef } from "react";

interface BgProps {
  className?: string;
}

const Bg = ({ className = "", children }: PropsWithChildren<BgProps>) => (
  <div className={`absolute inset-0 z-[-1] rounded-md ${className}`}>
    {children}
  </div>
);

interface Props {
  completed: boolean;
}

const BasedPill = ({ children, completed }: PropsWithChildren<Props>) => {
  const infoRef = useRef<HTMLDivElement>(null);
  const [timer, setTimer] = useState<NodeJS.Timer>();

  const onMouseEnter = () => {
    let i = 0;
    const animate = () => {
      const elem = infoRef.current;
      if (!elem) {
        return;
      }

      const child = elem.children[i];
      child.classList.add("animate-dissolve-text");
      setTimeout(() => {
        child.classList.remove("animate-dissolve-text");
      }, 3000);

      i = (i + 1) % elem.children.length;
    };
    animate();
    setTimer(setInterval(animate, 3000));
  };

  const onMouseLeave = () => {
    clearInterval(timer);
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
      <Bg className="flex items-center overflow-hidden rounded-md blur-sm transition group-hover:blur sm:-m-1 lg:-m-3">
        <div className="absolute inset-x-0 animate-pulse-and-spin rounded-full bg-gradient-to-br from-blue-400 to-pink-400 pb-[100%]" />
      </Bg>
      <Bg className="bg-[#121223] lg:-m-2" />
      <div className="group-hover:hidden">{children}</div>
      <div className="relative hidden group-hover:block">
        <div className="opacity-0">99d 99h 99m 99s</div>
        <div ref={infoRef}>
          <div className="absolute inset-0 grid place-items-center text-center text-xs opacity-0 md:text-2xl lg:text-5xl">
            October 28th 3-6pm
          </div>
          <div className="absolute inset-0 grid place-items-center text-center text-xs opacity-0 md:text-2xl lg:text-5xl">
            UNSW Leighton Hall
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasedPill;
