import { PropsWithChildren } from "react";

interface Props {}

const RootLayout = ({ children }: PropsWithChildren<Props>) => {
  return (
    <main className="selection:bg-accent h-screen snap-y snap-mandatory snap-always overflow-y-auto overflow-x-hidden text-white">
      {children}
    </main>
  );
};

export default RootLayout;
