import type { PropsWithChildren } from "react";

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

const BasedPill = ({ children, completed }: PropsWithChildren<Props>) => (
  <div
    className={`sm:text-md group relative z-0 px-4 py-2 font-mono md:px-4 md:py-2.5 md:text-3xl lg:text-6xl ${
      completed && "animate-bounce"
    }`}
  >
    <Bg className="flex items-center overflow-hidden rounded-md blur-sm transition group-hover:blur sm:-m-1 lg:-m-3">
      <div className="absolute inset-x-0 animate-pulse-and-spin rounded-full bg-gradient-to-br from-blue-400 to-pink-400 pb-[100%]" />
    </Bg>
    <Bg className="bg-[#121223] lg:-m-2" />
    {children}
  </div>
);

export default BasedPill;
