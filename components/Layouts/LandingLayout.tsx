import { PropsWithChildren } from "react";

interface Props {}

const LandingLayout = ({ children }: PropsWithChildren<Props>) => {
  return (
    <section className="flex h-screen w-full snap-center flex-col items-center justify-center space-y-6">
      {children}
    </section>
  );
};

export default LandingLayout;
