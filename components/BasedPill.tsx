import type { PropsWithChildren } from "react";

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

interface Props {
  date: Date | null;
}

const BasedPill = ({ date, children }: PropsWithChildren<Props>) => {
  return (
    <div
      className={`sm:text-md group relative z-0 px-4 py-2 font-mono md:px-4 md:py-2.5 md:text-3xl lg:text-6xl`}
    >
      <Glow>
        <div className="absolute inset-x-0 animate-pulse-and-spin rounded-full bg-gradient-to-br from-blue-400 to-pink-400 pb-[100%]" />
      </Glow>
      <Bg className="bg-[#121223] lg:-m-2" />

      <div className="invisible">99d 99h 99m 99s</div>
      <div
        className="absolute inset-0 grid place-items-center"
        style={{ opacity: date ? 1 : 0 }}
      >
        {children}
      </div>
    </div>
  );
};

export default BasedPill;
