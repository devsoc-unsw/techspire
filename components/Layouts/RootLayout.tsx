import { PropsWithChildren } from "react";

interface Props {}

const RootLayout = ({ children }: PropsWithChildren<Props>) => {
  return (
    <main className="h-full text-white selection:bg-accent">{children}</main>
  );
};

export default RootLayout;
