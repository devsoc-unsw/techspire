import { useRef } from "react";
import useChildrenIntersectionObserver from "../hooks/useChildrenIntersectionObserver";
import AmazonText from "./Speakers/AmazonText";
import AtlassianText from "./Speakers/AtlassianText";
import CanvaText from "./Speakers/CanvaText";
import MarcCheeText from "./Speakers/MarcCheeText";
import PearlerText from "./Speakers/PearlerText";
import JobsboardText from "./Speakers/JobsboardText";

const data = {
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
  const speakers = [
    "Amazon",
    "Atlassian",
    "Canva",
    "Marc Chee",
    "Pearler",
    "Jobsboard",
  ];
  const intersectorRef = useRef<HTMLDivElement>(null);
  const intersecting = useChildrenIntersectionObserver(intersectorRef, {
    threshold: 0.5,
  });

  return (
    <div className="flex gap-2">
      <nav className="sticky top-0 flex h-screen w-48 flex-col justify-center pl-2">
        {speakers.map((speaker, idx) => (
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
        {speakers.map((speaker) => (
          <section
            key={speaker}
            className="flex h-screen flex-1 snap-center justify-center gap-4 px-8 py-16"
          >
            <section className="flex flex-[4_4_0%] flex-col justify-center space-y-5">
              <text className="sm:text-3xl md:text-6xl">{speaker}</text>
              <br />
              {data[speaker as keyof typeof data].text}
            </section>
            <section className="flex flex-[3_3_0%] flex-col justify-center">
              <div>
                <video
                  autoPlay
                  muted
                  controls
                  controlsList="nodownload noplaybackrate nofullscreen"
                  disablePictureInPicture
                >
                  <source
                    src={data[speaker as keyof typeof data].video}
                    type="video/mp4"
                  />
                </video>
              </div>
            </section>
          </section>
        ))}
      </main>
    </div>
  );
};

export default Thingy;
