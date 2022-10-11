import { forwardRef } from "react";
import type { CSSProperties, PropsWithChildren, Ref } from "react";

interface Props {
  style: CSSProperties;
}

const LandingLayout = (
  { style, children }: PropsWithChildren<Props>,
  ref: Ref<HTMLDivElement>
) => {
  return (
    <section
      ref={ref}
      className="relative flex h-screen w-full snap-center flex-col items-center justify-center transition-transform duration-[1500ms]"
      style={style}
    >
      {children}
    </section>
  );
};

export default forwardRef<HTMLDivElement, PropsWithChildren<Props>>(
  LandingLayout
);
