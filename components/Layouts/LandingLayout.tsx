import { PropsWithChildren } from "react";

interface Props {}

const LandingLayout = ({ children }: PropsWithChildren<Props>) => {
  return (
    <section className="-mt-8 flex h-screen w-full snap-center flex-col items-center justify-center space-y-8">
      {children}
    </section>
  );
};

export default LandingLayout;
