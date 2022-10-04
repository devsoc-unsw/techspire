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
    className={`group relative z-0 px-4 py-2 font-mono text-xl md:px-4 md:py-2.5 md:text-2xl ${
      completed && "animate-bounce"
    }`}
  >
    <Bg className="flex items-center overflow-hidden rounded-md blur-sm transition group-hover:blur">
      <div
        className="absolute inset-x-0 animate-spin rounded-full bg-gradient-to-br from-blue-400 to-pink-400 pb-[100%]"
        style={{ animationDuration: "2s" }}
      />
    </Bg>
    <Bg className="bg-[#121223]" />
    {children}
  </div>
);

export default BasedPill;
