import { useRef } from "react";
import useChildrenIntersectionObserver from "../hooks/useChildrenIntersectionObserver";
import AmazonText from "./Speakers/AmazonText";
import AtlassianText from "./Speakers/AtlassianText";
import CanvaText from "./Speakers/CanvaText";
import MarcCheeText from "./Speakers/MarcCheeText";
import PearlerText from "./Speakers/PearlerText";
import JobsboardText from "./Speakers/JobsboardText";

const speakers = {
  Amazon: {
    text: <AmazonText />,
    video: "./videos/portal.mp4",
  },
  Atlassian: {
    text: <AtlassianText />,
    video: "./videos/portal.mp4",
  },
  Canva: {
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
    text: <JobsboardText />,
    video: "./videos/portal.mp4",
  },
};

const Thingy = () => {
  const intersectorRef = useRef<HTMLDivElement>(null);
  const intersecting = useChildrenIntersectionObserver(intersectorRef, {
    threshold: 0.5,
  });

  return (
    <div className="flex gap-2">
      <nav className="sticky top-0 hidden h-screen w-48 flex-col justify-center pl-2 md:flex">
        {Object.entries(speakers).map(([speaker], idx) => (
          <div
            key={speaker}
            className={`group flex items-center opacity-80 transition-opacity hover:cursor-pointer hover:opacity-100 ${
              intersecting.has(idx) &&
              "animate-gradient-xy bg-gradient-to-br from-light to-[#f472b6] bg-clip-text text-transparent !opacity-100"
            }`}
            onClick={() => {
              Array.from(intersectorRef.current!.children)[idx].scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            <div
              className={`mx-2 h-px w-8 transition-colors group-hover:bg-white ${
                intersecting.has(idx) &&
                "animate-gradient-xy !bg-gradient-to-br from-light to-[#f472b6]"
              }`}
            />
            {speaker}
          </div>
        ))}
      </nav>
      <main className={`flex-1`} ref={intersectorRef}>
        {Object.entries(speakers).map(([speaker, { text, video }]) => (
          <section
            key={speaker}
            className="flex h-screen flex-1 snap-center flex-col justify-center gap-4 px-8 py-16 md:flex-row"
          >
            <section className="flex flex-[4_4_0%] flex-col justify-center space-y-5">
              <h1 className="z-999 sm:text-3xl md:text-6xl">{speaker}</h1>
              <br />
              {text}
            </section>
            <aside className="flex flex-[3_3_0%] flex-col justify-center">
              <video
                autoPlay
                loop
                muted
                controls
                controlsList="nodownload noplaybackrate nofullscreen"
                disablePictureInPicture
              >
                <source src={video} type="video/mp4" />
              </video>
            </aside>
          </section>
        ))}
      </main>
    </div>
  );
};

export default Thingy;
