import type { PropsWithChildren } from "react";

interface Props {
  completed: boolean;
}

const BasedPill = ({ children, completed }: PropsWithChildren<Props>) => (
  <div
    className={`group relative z-0 px-4 py-2 text-xl text-black md:px-6 md:py-3 md:text-2xl ${
      completed && "animate-bounce"
    }`}
  >
    <div className="absolute inset-0 z-[-1] rounded-full bg-gradient-to-br from-light to-violet opacity-70 blur-sm group-hover:blur" />
    <div className="absolute inset-0 z-[-1] rounded-full bg-gradient-to-br from-light to-violet opacity-70 group-hover:opacity-100" />
    {children}
  </div>
);

export default BasedPill;
