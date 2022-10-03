import type { NextPage } from "next";
import Image from "next/image";
import LandingLayout from "../components/Layouts/LandingLayout";
import BasedCountdown from "../components/BasedCountdown";

const Home: NextPage = () => {
  return (
    <LandingLayout>
      <div className="w-50 h-50">
        <Image
          src="/images/logo.png"
          width={1000}
          height={230}
          alt="CSESoc Logo"
        />
      </div>
      <h1 className="text-6xl font-bold">LOGO HERE</h1>
      <BasedCountdown date={new Date(Date.now() + 3000)} />
    </LandingLayout>
  );
};

export default Home;
