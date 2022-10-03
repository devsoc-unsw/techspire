import { PropsWithChildren } from "react";

interface Props {}

const LandingLayout = ({ children }: PropsWithChildren<Props>) => {
  return (
    <section className="flex h-full w-full flex-col items-center justify-center space-y-6">
      {children}
    </section>
  );
};

export default LandingLayout;
