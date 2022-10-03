import type { NextPage } from "next";
import Image from "next/image";
import LandingLayout from "../components/Layouts/LandingLayout";

import dynamic from "next/dynamic";
import { useState } from "react";

import Logo from "../public/images/logo.png";
import Thingy from "../components/Thingy";

const DynamicBasedCountdown = dynamic(
  () => import("../components/BasedCountdown"),
  { ssr: false }
);

const Home: NextPage = () => {
  const [completed, setCompleted] = useState(false);

  return (
    <>
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
          className={`group flex text-6xl font-bold tracking-wide md:text-9xl ${
            completed && "animate-bounce"
          }`}
        >
          <span className="-mr-2 bg-dark md:-mr-5">T</span>ech
          <div
            className={`animate-gradient-xy bg-gradient-to-r from-purple-800 via-violet-400 to-pink-400 bg-clip-text text-transparent`}
          >
            <span className="-ml-14 transition-[margin] selection:bg-white group-hover:ml-0 md:-ml-[7.5rem]">
              inspir
              <span className="-ml-1.5">e</span>
            </span>
          </div>
        </h1>
        <h3 className={`text-2xl`}>Friday 28th Oct 3-6pm | Week 7</h3>

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
