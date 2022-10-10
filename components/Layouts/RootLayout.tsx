import { PropsWithChildren } from "react";

interface Props {}

const RootLayout = ({ children }: PropsWithChildren<Props>) => {
  return (
    <main className="selection:bg-accent flex h-screen overflow-hidden text-white">
      {children}
    </main>
  );
};

export default RootLayout;
