import type { NextPage } from "next";
import Image from "next/image";
import LandingLayout from "../components/Layouts/LandingLayout";

import dynamic from "next/dynamic";
import { useState } from "react";

import Logo from "../public/images/logo.png";
import Card from "../components/Card";

const DynamicBasedCountdown = dynamic(
  () => import("../components/BasedCountdown"),
  { ssr: false }
);

const Home: NextPage = () => {
  const [completed, setCompleted] = useState(false);

  return (
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
        <div className="z-10 flex bg-dark">
          <div className="-mr-2 bg-dark md:-mr-5">T</div>ech
        </div>
        <span className="-ml-14 text-accent transition-[margin] selection:bg-white group-hover:ml-0 md:-ml-[7.5rem]">
          inspir
          <span className="-ml-1.5">e</span>
        </span>
      </h1>
      <h3 className={`text-2xl text-light`}>Friday 28th Oct 3-6pm | Week 7</h3>

      <DynamicBasedCountdown
        date={new Date(2022, 9, 28, 15)}
        completed={completed}
        setCompleted={setCompleted}
      />

      <Card className="top-8 left-4" />
    </LandingLayout>
  );
};

export default Home;
