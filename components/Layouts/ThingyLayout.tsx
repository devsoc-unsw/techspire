import type { PropsWithChildren } from "react";

const ThingyLayout = ({ children }: PropsWithChildren) => (
  <section className="flex h-screen w-full flex-col items-center justify-center">
    {children}
  </section>
);

export default ThingyLayout;
