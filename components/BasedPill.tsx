import type { PropsWithChildren } from "react";

interface Props {
  completed: boolean;
}

const BasedPill = ({ children, completed }: PropsWithChildren<Props>) => (
  <div
    className={`group relative z-0 px-4 py-2 text-xl md:px-4 md:py-2.5 md:text-2xl ${
      completed && "animate-bounce"
    }`}
  >
    <div className="absolute inset-0 z-[-1] rounded-md bg-gradient-to-br from-light to-[#f472b6] blur-sm transition group-hover:blur" />
    <div className="absolute inset-0 z-[-1] rounded-md bg-[#121223] group-hover:opacity-100" />
    {children}
  </div>
);

export default BasedPill;
