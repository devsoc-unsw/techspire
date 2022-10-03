import type { NextPage } from "next";
import LandingLayout from "../components/Layouts/LandingLayout";

import dynamic from "next/dynamic";
import { useState } from "react";

const DynamicBasedCountdown = dynamic(
  () => import("../components/BasedCountdown"),
  { ssr: false }
);

const Home: NextPage = () => {
  const [completed, setCompleted] = useState(false);

  return (
    <LandingLayout>
      {/* <div className="w-1/2 h-50">
        <Image
          src="/images/logo.png"
          layout="fill"
          objectFit="contain"
          alt="CSESoc Logo"
        />
      </div> */}
      <h1
        className={`text-6xl font-bold tracking-wide md:text-9xl ${
          completed && "animate-bounce"
        }`}
      >
        Tech
        <span className="text-accent selection:bg-white">spire</span>
      </h1>
      <DynamicBasedCountdown
        date={new Date(Date.now() + 3000)}
        completed={completed}
        setCompleted={setCompleted}
      />
    </LandingLayout>
  );
};

export default Home;
