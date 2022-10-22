import { forwardRef } from "react";
import type { CSSProperties, PropsWithChildren, Ref } from "react";

interface Props {
  className?: string;
  style: CSSProperties;
}

const LandingLayout = (
  { className, style, children }: PropsWithChildren<Props>,
  ref: Ref<HTMLDivElement>
) => {
  return (
    <section
      ref={ref}
      className={`relative flex h-screen w-full snap-center flex-col items-center justify-center transition-[opacity,transform] duration-[1500ms] ${
        className ?? ""
      }`}
      style={style}
    >
      {children}
    </section>
  );
};

export default forwardRef<HTMLDivElement, PropsWithChildren<Props>>(
  LandingLayout
);
