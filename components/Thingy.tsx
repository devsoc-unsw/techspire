import { useRef } from "react";
import useChildrenIntersectionObserver from "../hooks/useChildrenIntersectionObserver";
import AmazonText from "./Speakers/AmazonText";
import AtlassianText from "./Speakers/AtlassianText";
import CanvaText from "./Speakers/CanvaText";
import MarcCheeText from "./Speakers/MarcCheeText";
import PearlerText from "./Speakers/PearlerText";
import JobsboardText from "./Speakers/JobsboardText";
import Speaker, { SpeakerProps } from "./Speaker";

type Speakers = {
  [speaker: string]: Omit<SpeakerProps, "speaker">;
};
const speakers: Speakers = {
  Amazon: {
    speakerName: "Adam Leung",
    text: <AmazonText />,
    video: "./videos/ribbon.mp4",
  },
  Atlassian: {
    speakerName: "Ofir Zeevi",
    text: <AtlassianText />,
    video: "./videos/ribbon.mp4",
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
  Pearler: {
    speakerName: "Kath-Lin Han",
    text: <PearlerText />,
    video: "./videos/kathlin.mp4",
  },
  Jobsboard: {
    speakerName: "Darian, Joanna",
    text: <JobsboardText />,
    video: "./videos/jobsboard.mp4",
  },
};

const Thingy = () => {
  const intersectorRef = useRef<HTMLDivElement>(null);
  const intersecting = useChildrenIntersectionObserver(intersectorRef, {
    threshold: 0.5,
  });

  return (
    <div className="flex gap-4 lg:px-4">
      <nav className="sticky top-0 hidden h-screen w-40 flex-col justify-center pl-2 md:flex lg:w-48">
        {Object.keys(speakers).map((speaker, idx) => (
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
      <main id="info-section" className={`flex-1`} ref={intersectorRef}>
        {Object.entries(speakers).map(
          ([speaker, { speakerName, text, video }]) => (
            <Speaker
              key={speaker}
              speaker={speaker}
              speakerName={speakerName}
              text={text}
              video={video}
            />
          )
        )}
      </main>
    </div>
  );
};

export default Thingy;
