import type { NextPage } from "next";
import Image from "next/image";
import LandingLayout from "../components/Layouts/LandingLayout";

import { ReactElement, useCallback, useEffect, useRef, useState } from "react";

import Logo from "../public/images/logo.png";
import Thingy from "../components/Thingy";
import Arrow from "../components/Arrow";
import BasedCountdown from "../components/BasedCountdown";
import useFixedVh from "../hooks/useFixedVh";
import useAutoplay from "../hooks/useAutoplay";

import AmazonText from "../components/Speakers/AmazonText";
import AtlassianText from "../components/Speakers/AtlassianText";
import CanvaText from "../components/Speakers/CanvaText";
import MarcCheeText from "../components/Speakers/MarcCheeText";
import PearlerText from "../components/Speakers/PearlerText";
import JobsboardText from "../components/Speakers/JobsboardText";
import Credits from "../components/Credits";
import usePageScroll from "../hooks/usePageScroll";
import useTouch from "../hooks/useTouch";

const speakers: {
  [k: string]: { speakerName?: string; text: ReactElement; video: string };
} = {
  Atlassian: {
    speakerName: "Ofir Zeevi",
    text: <AtlassianText />,
    video: "./videos/ofir.mp4",
  },
  Pearler: {
    speakerName: "Kath-Lin Han",
    text: <PearlerText />,
    video: "./videos/kathlin.mp4",
  },
  Canva: {
    speakerName: "Adam Tizzone",
    text: <CanvaText />,
    video: "./videos/ribbon.mp4",
  },
  "Marc Chee": {
    text: <MarcCheeText />,
    video: "./videos/marc.mp4",
  },
  Jobsboard: {
    speakerName: "Darian & Joanna",
    text: <JobsboardText />,
    video: "./videos/jobsboard.mp4",
  },
  Amazon: {
    speakerName: "Adam Leung",
    text: <AmazonText />,
    video: "./videos/adam-leung.mp4",
  },
};

const Home: NextPage = () => {
  const [completed, setCompleted] = useState(false);
  const techPrefixRef = useRef<HTMLDivElement>(null);
  const [videoRef, autoplayBlocked, setAutoplayBlocked] = useAutoplay();

  const [speakerIdx, setSpeakerIdx] = useState(-1);
  const zoom = completed && speakerIdx !== -1;

  const [scrolling, handleScroll, focusedPage, setFocusedPage] = usePageScroll(
    Object.keys(speakers).length,
    1000,
    () => scrolling.current || autoplayBlocked || zoom
  );

  const [onTouchStart, onTouchMove] = useTouch(
    useCallback(
      (touchStart, touchEnd) =>
        handleScroll(Math.trunc((touchStart - touchEnd) / 10)),
      [handleScroll]
    )
  );
  const [finishDate, setFinishDate] = useState<Date | null>(null);

  useFixedVh();

  useEffect(() => {
    setFinishDate(new Date(Date.now() + 3000));

    const prefixElem = techPrefixRef.current;
    if (!prefixElem) {
      return;
    }

    let cancel = false;
    const animate = async () => {
      let i = 0;
      while (!cancel) {
        const child = prefixElem.children[i];
        await child.animate(
          {
            visibility: "visible",
            transform: [-30, 0, 0, 30].map((i) => `translateX(${i}px)`),
            opacity: [0, 1, 1, 0],
            offset: [0, 0.25, 0.75, 1],
            easing: "ease",
          },
          3000
        ).finished;
        i = (i + 1) % prefixElem.children.length;
      }
    };
    animate();

    return () => {
      cancel = true;
    };
  }, []);

  useEffect(() => {
    let lastKey: string | undefined;
    const onKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
        case "j":
        case "d":
          handleScroll(1);
          break;
        case "ArrowUp":
        case "k":
        case "u":
          handleScroll(-1);
          break;
        case "g":
          if (lastKey === "g") {
            setFocusedPage(0);
          }
          break;
        case "G":
          setFocusedPage(Object.keys(speakers).length);
          break;
      }

      lastKey = e.key;

      const num = Number(e.key) - 1;
      if (!isNaN(num) && num >= 0 && num <= Object.keys(speakers).length) {
        if (focusedPage !== 0) {
          setFocusedPage(0);
          setTimeout(() => {
            setSpeakerIdx(num);
          }, 1000);
        } else {
          setSpeakerIdx(num);
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [handleScroll, focusedPage, setFocusedPage]);

  return (
    <div
      onWheel={(e) => handleScroll(e.deltaY)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
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
        playsInline
        className="absolute -z-10 min-h-full w-auto min-w-full max-w-full object-cover brightness-[0.3]"
        ref={videoRef}
      >
        <source src="./videos/ribbon.mp4" type="video/mp4" />
      </video>

      <div
        className="transition-[opacity,transform] duration-[4s] ease-[cubic-bezier(.81,.11,1,1)]"
        style={{
          ...(zoom && {
            transform: "perspective(10px) translateZ(10px)",
            opacity: 0,
          }),
        }}
      >
        <LandingLayout
          style={{
            transform: `translateY(calc(-${
              100 * focusedPage
            } * var(--vh, 1vh)))`,
          }}
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
            className={`group mb-8 flex w-full text-6xl font-bold tracking-wide md:text-8xl lg:mb-12 lg:text-11xl`}
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
          <BasedCountdown date={finishDate} setCompleted={setCompleted} />
          <div className="absolute bottom-32 justify-center">
            <Arrow onClick={() => setFocusedPage(1)} />
          </div>

          {/* <Card className="top-8 left-4" /> */}
        </LandingLayout>
      </div>

      <div
        className="invisible fixed inset-0 flex items-center justify-center opacity-0 transition-[opacity,transform] delay-[4s] duration-[3s]"
        style={{
          transform: `perspective(10px) translateZ(${zoom ? 0 : -10}px)`,
          ...(zoom && {
            opacity: 1,
            visibility: "visible",
          }),
        }}
      >
        {speakerIdx === Object.keys(speakers).length ? (
          <Credits />
        ) : (
          <div className="flex animate-gradient-xy flex-col items-end gap-4 bg-gradient-to-r from-purple-400 via-indigo-400 to-pink-400 bg-clip-text text-transparent">
            <h1 className="text-9xl">
              {Object.values(speakers)[speakerIdx]?.speakerName ??
                Object.keys(speakers)[speakerIdx]}
            </h1>
            {Object.values(speakers)[speakerIdx]?.speakerName !== undefined && (
              <h2 className="text-3xl">{Object.keys(speakers)[speakerIdx]}</h2>
            )}
          </div>
        )}
      </div>

      <Thingy
        speakers={speakers}
        focusedPage={focusedPage}
        setFocusedPage={setFocusedPage}
      />
    </div>
  );
};

export default Home;
