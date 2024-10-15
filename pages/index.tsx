import type { NextPage } from "next";
import Image from "next/image";
import LandingLayout from "../components/Layouts/LandingLayout";

import { useCallback, useEffect, useRef, useState } from "react";

import Logo from "../public/images/logo.svg";
import Thingy from "../components/Thingy";
import Arrow from "../components/Arrow";
import BasedCountdown from "../components/BasedCountdown";
import useFixedVh from "../hooks/useFixedVh";
import useAutoplay from "../hooks/useAutoplay";

import Credits from "../components/Credits";
import usePageScroll from "../hooks/usePageScroll";
import useTouch from "../hooks/useTouch";
import { useRouter } from "next/router";

import { siteData } from "../public/data";

import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";

const Home: NextPage = () => {
  const [year, setYear] = useState("2024");
  const router = useRouter();
  const [completed, setCompleted] = useState(false);
  const techPrefixRef = useRef<HTMLDivElement>(null);
  const [videoRef, autoplayBlocked, setAutoplayBlocked] = useAutoplay();
  const [speakers, setSpeakers] = useState(siteData[year]);
  const [videoSrc, setVideoSrc] = useState("./videos/ribbon.mp4"); // default video source
  const [videoKey, setVideoKey] = useState(0);

  function setCountdown() {
    const seconds = Number(router.query.seconds);
    switch (year) {
      case "2022":
        setFinishDate(null);
        break;
      case "2024":
        setFinishDate(new Date(2024, 10, 5, 15, 0));
        break;
    }
  }

  const changeVideoSource = (year: string) => {
    switch (year) {
      case "2022":
        setVideoSrc("./videos/ribbon.mp4");
        break;
      case "2024":
        setVideoSrc("./videos/IMG_3965.MOV");
        break;
    }
    setVideoKey((videoKey) => videoKey + 1);
    if (videoRef.current) {
      videoRef.current.load(); // Reload the video with new source
    }
  };

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
    if (!router.isReady) {
      return;
    }
    setCountdown();
  }, [router.isReady, router.query.seconds]);

  useEffect(() => {
    setCountdown();
    setSpeakers(siteData[year]);
    changeVideoSource(year);
  }, [year]);

  useEffect(() => {
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
        className="absolute -z-10 min-h-full w-auto min-w-full max-w-full object-cover brightness-[0.45]"
        ref={videoRef}
        key={videoKey}
      >
        <source src={videoSrc} type="video/mp4" />
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
        <Select
          value={year}
          defaultValue={year}
          className="fixed right-0 z-10 m-4 w-24"
          variant="solid"
          onChange={(
            event: React.SyntheticEvent | null,
            newValue: string | null
          ) => {
            setYear(newValue ?? "2024");
          }}
        >
          <Option value="2022">2022</Option>
          <Option value="2024">2024</Option>
        </Select>
        <LandingLayout
          style={{
            transform: `translateY(calc(-${
              100 * focusedPage
            } * var(--vh, 1vh)))`,
          }}
        >
          <div className="my-4 w-48 md:w-64">
            <Image
              src={Logo}
              layout="responsive"
              objectFit="contain"
              alt="DevSoc Logo"
            />
          </div>
          <h1
            className={`group mb-8 flex w-full text-6xl font-bold tracking-wide md:text-8xl lg:mb-12 lg:text-9xl`}
          >
            <div className="relative w-1/2" ref={techPrefixRef}>
              <span className="invisible absolute right-0">Tech</span>
              <span className="invisible absolute right-0">A</span>
              <span className="invisible absolute right-0">In</span>
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
          {finishDate ? (
            <BasedCountdown date={finishDate} setCompleted={setCompleted} />
          ) : null}
          <h3 className={`z-10 mt-12 text-2xl`}>
            Find out more about the {year} Techspire
          </h3>
          <div className="absolute bottom-32 justify-center">
            <Arrow onClick={() => setFocusedPage(1)} />
          </div>
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
          <div className="flex animate-gradient-xy flex-col items-end bg-gradient-to-r from-purple-400 via-indigo-400 to-pink-400 bg-clip-text text-transparent lg:gap-2">
            <h1 className="text-4xl md:text-7xl lg:text-9xl">
              {Object.values(speakers)[speakerIdx]?.speakerName ??
                Object.keys(speakers)[speakerIdx]}
            </h1>
            {Object.values(speakers)[speakerIdx]?.speakerName !== undefined && (
              <h2 className="text-xl md:text-2xl lg:text-4xl">
                {Object.keys(speakers)[speakerIdx]}
              </h2>
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
