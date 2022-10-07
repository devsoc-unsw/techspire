import type { NextPage } from "next";
import Image from "next/image";
import LandingLayout from "../components/Layouts/LandingLayout";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

import Logo from "../public/images/logo.png";
import Thingy from "../components/Thingy";

const DynamicBasedCountdown = dynamic(
  () => import("../components/BasedCountdown"),
  { ssr: false }
);

const Home: NextPage = () => {
  const [completed, setCompleted] = useState(false);
  const techPrefixRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let i = 0;
    const animate = () => {
      const elem = techPrefixRef.current;
      if (!elem) {
        return;
      }

      const child = elem.children[i];
      child.classList.add("animate-slide-text");
      setTimeout(() => {
        child.classList.remove("animate-slide-text");
      }, 2000);

      i = (i + 1) % elem.children.length;
    };
    animate();
    const interval = setInterval(animate, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <video
        autoPlay
        loop
        muted
        className={`absolute -z-10 min-h-full w-auto min-w-full max-w-none brightness-[0.3]`}
      >
        <source src="./videos/ribbon.mp4" type="video/mp4" />
      </video>
      <LandingLayout>
        <div className="w-64">
          <Image
            src={Logo}
            // layout="responsive"
            // objectFit="contain"
            alt="CSESoc Logo"
          />
        </div>
        <h1
          className={`group flex w-full text-6xl font-bold tracking-wide md:text-9xl ${
            completed && "animate-bounce"
          }`}
        >
          <div className="relative w-1/2" ref={techPrefixRef}>
            <div className="absolute right-0 opacity-0">
              <span className="-mr-2 md:-mr-5">T</span>ECH
            </div>
            <div className="absolute right-0 opacity-0">a</div>
            <div className="absolute right-0 opacity-0">in</div>
          </div>
          <div className="z-10 w-1/2">
            <div
              className={`animate-gradient-xy bg-gradient-to-r from-purple-400 via-violet-400 to-pink-400 bg-clip-text text-transparent`}
            >
              <span className="transition-[margin] selection:bg-white">
                spir
                <span className="-ml-1.5">e</span>
              </span>
            </div>
          </div>
        </h1>
        <h3 className={`z-10 text-2xl`}>Friday 28th Oct 3-6pm | Week 7</h3>

        <DynamicBasedCountdown
          date={new Date(2022, 9, 28, 15)}
          completed={completed}
          setCompleted={setCompleted}
        />

        {/* <Card className="top-8 left-4" /> */}
      </LandingLayout>

      <Thingy />
    </>
  );
};

export default Home;
