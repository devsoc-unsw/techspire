import { PropsWithChildren } from "react";

interface Props {}

const LandingLayout = ({ children }: PropsWithChildren<Props>) => {
  return (
    <section className="flex h-screen w-full snap-center flex-col items-center justify-center space-y-6">
      {/* <div className={`absolute z-1 min-w-full min-h-full`}>
        <video
          autoPlay
          loop
          muted
          className={`w-auto min-w-full min-h-full max-w-none grayscale brightness-25`}
        >
          <source 
            src="./videos/portal.mp4"
            type="video/mp4"
          />
        </video>
      </div> */}
      {children}
    </section>
  );
};

export default LandingLayout;
