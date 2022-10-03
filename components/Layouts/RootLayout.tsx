import { PropsWithChildren } from "react";

interface Props {}

const RootLayout = ({ children }: PropsWithChildren<Props>) => {
  return (
    <main className="h-screen snap-y snap-mandatory snap-always overflow-y-auto text-white selection:bg-accent">
      {children}
    </main>
  );
};

export default RootLayout;
