import type { PropsWithChildren } from "react";

const BasedPill = ({ children }: PropsWithChildren) => (
  <div className="group relative z-0 px-4 py-2 text-base text-black">
    <div className="absolute inset-0 z-[-1] rounded-full bg-gradient-to-br from-light to-violet blur-sm group-hover:blur" />
    <div className="absolute inset-0 z-[-1] rounded-full bg-gradient-to-br from-light to-violet opacity-70 group-hover:opacity-100" />
    {children}
  </div>
);

export default BasedPill;
