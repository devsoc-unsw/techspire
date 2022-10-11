import type { NextPage } from "next";
import Image from "next/image";
import LandingLayout from "../components/Layouts/LandingLayout";

import { useCallback, useEffect, useRef, useState } from "react";

import Logo from "../public/images/logo.png";
import Thingy from "../components/Thingy";
import Arrow from "../components/Arrow";
import BasedCountdown from "../components/BasedCountdown";

import AmazonText from "../components/Speakers/AmazonText";
import AtlassianText from "../components/Speakers/AtlassianText";
import CanvaText from "../components/Speakers/CanvaText";
import MarcCheeText from "../components/Speakers/MarcCheeText";
import PearlerText from "../components/Speakers/PearlerText";
import JobsboardText from "../components/Speakers/JobsboardText";

const speakers = {
  Amazon: {
    speakerName: "Adam Leung",
    text: <AmazonText />,
    video: "./videos/portal.mp4",
  },
  Atlassian: {
    speakerName: "Ofir Zeevi",
    text: <AtlassianText />,
    video: "./videos/portal.mp4",
  },
  Canva: {
    speakerName: "Adam Tizzone",
    text: <CanvaText />,
    video: "./videos/portal.mp4",
  },
  "Marc Chee": {
    text: <MarcCheeText />,
    video: "./videos/marc.mp4",
  },
  Pearler: {
    text: <PearlerText />,
    video: "./videos/portal.mp4",
  },
  Jobsboard: {
    speakerName: "Darian, Joanna",
    text: <JobsboardText />,
    video: "./videos/portal.mp4",
  },
};

const Home: NextPage = () => {
  const [completed, setCompleted] = useState(false);
  const techPrefixRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  const [focusedPage, _setFocusedPage] = useState(0);

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [scrolling, setScrolling] = useState(false);
  const setFocusedPage = (focusedPage: number) => {
    _setFocusedPage(focusedPage);
    setScrolling(true);
    // fuck yeah, race conditions!
    setTimeout(() => {
      setScrolling(false);
    }, 1500);
  };
  const handleScroll = useCallback(
    (direction: number) => {
      if (scrolling || autoplayBlocked) {
        return;
      }

      if (direction < 0 && focusedPage > 0) {
        setFocusedPage(focusedPage - 1);
      } else if (direction > 0 && focusedPage < Object.keys(speakers).length) {
        setFocusedPage(focusedPage + 1);
      }
    },
    [focusedPage, scrolling, autoplayBlocked]
  );

  useEffect(() => {
    const videoElem = videoRef.current;
    if (videoElem) {
      videoElem.play().catch(() => {
        setAutoplayBlocked(true);
      });
    }

    let i = 0;
    const animate = () => {
      const elem = techPrefixRef.current;
      if (!elem) {
        return;
      }

      const child = elem.children[i];
      child.classList.remove("invisible");
      child.classList.add("animate-slide-text");
      // this SHOULD be the only animation
      child.getAnimations()[0].finished.then(() => {
        child.classList.remove("animate-slide-text");
        child.classList.add("invisible");
      });

      i = (i + 1) % elem.children.length;
    };
    animate();
    const interval = setInterval(animate, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          handleScroll(1);
          break;
        case "ArrowUp":
          handleScroll(-1);
          break;
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [handleScroll]);

  return (
    <div
      onWheel={(e) => handleScroll(e.deltaY)}
      onTouchStart={(e) => setTouchStart(e.touches[0].clientY)}
      onTouchMove={(e) => {
        if (touchStart === null) {
          setTouchStart(e.touches[0].clientY);
        } else {
          const diff = touchStart - e.changedTouches[0].clientY;
          if (Math.abs(diff) > 10) {
            handleScroll(diff);
            setTouchStart(null);
          }
        }
      }}
    >
      <div
        className={`absolute inset-0 z-20 hidden bg-black/80 ${
          autoplayBlocked ? "!grid place-items-center" : ""
        }`}
        onClick={() => {
          videoRef.current?.play();
          setAutoplayBlocked(false);
        }}
      >
        Start
      </div>
      <video
        autoPlay
        loop
        muted
        className="absolute -z-10 min-h-full w-auto min-w-full max-w-full object-cover brightness-[0.3]"
        ref={videoRef}
      >
        <source src="./videos/ribbon.mp4" type="video/mp4" />
      </video>

      <LandingLayout
        style={{ transform: `translateY(-${100 * focusedPage}vh)` }}
      >
        <div className="w-48 md:w-64">
          <Image
            src={Logo}
            // layout="responsive"
            // objectFit="contain"
            alt="CSESoc Logo"
          />
        </div>
        <h1
          className={`group mb-8 flex w-full text-6xl font-bold tracking-wide md:text-8xl lg:mb-12 lg:text-11xl ${
            completed && "animate-bounce"
          }`}
        >
          <div className="relative w-1/2" ref={techPrefixRef}>
            <span className="invisible absolute right-0">
              <span className="-mr-2 md:-mr-5 lg:-mr-8">T</span>ech
            </span>
            <span className="invisible absolute right-0">a</span>
            <span className="invisible absolute right-0">in</span>
          </div>
          <div className="z-10">
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
        {/* <h3 className={`z-10 text-2xl`}>Friday 28th Oct 3-6pm | Week 7</h3> */}

        <BasedCountdown
          date={new Date(2022, 9, 28, 15)}
          completed={completed}
          setCompleted={setCompleted}
        />
        <div className="absolute bottom-[10%] justify-center">
          <Arrow />
        </div>

        {/* <Card className="top-8 left-4" /> */}
      </LandingLayout>

      <Thingy
        speakers={speakers}
        focusedPage={focusedPage}
        setFocusedPage={setFocusedPage}
      />
    </div>
  );
};

export default Home;
