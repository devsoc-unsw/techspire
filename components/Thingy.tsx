import { ReactNode } from "react";
import Speaker from "./Speaker";

interface Props {
  speakers: {
    [speaker: string]: {
      speakerName?: string;
      text: ReactNode;
      video: string;
    };
  };
  focusedPage: number;
  setFocusedPage: (_focusedPage: number) => void;
}
const Thingy = ({ speakers, focusedPage, setFocusedPage }: Props) => {
  return (
    <div className="flex gap-4 lg:px-4">
      <nav
        className="sticky top-0 hidden h-screen w-40 flex-col justify-center pl-2 transition-transform duration-[1500ms] md:flex lg:w-48"
        style={{ transform: focusedPage ? "translateY(-100vh)" : undefined }}
      >
        {Object.keys(speakers).map((speaker, idx) => (
          <div
            key={speaker}
            className={`group flex items-center opacity-80 transition-opacity hover:cursor-pointer hover:opacity-100 ${
              focusedPage === idx + 1 &&
              "animate-gradient-xy bg-gradient-to-br from-light to-[#f472b6] bg-clip-text text-transparent !opacity-100"
            }`}
            onClick={() => setFocusedPage(idx + 1)}
          >
            <div
              className={`mx-2 h-px w-8 transition-colors group-hover:bg-white ${
                focusedPage === idx + 1 &&
                "animate-gradient-xy !bg-gradient-to-br from-light to-[#f472b6]"
              }`}
            />
            {speaker}
          </div>
        ))}
      </nav>
      <main id="info-section" className={`flex-1`}>
        {Object.entries(speakers).map(
          ([speaker, { speakerName, text, video }], idx) => (
            <Speaker
              key={speaker}
              idx={idx}
              speaker={speaker}
              speakerName={speakerName}
              text={text}
              video={video}
              focusedPage={focusedPage}
            />
          )
        )}
      </main>
    </div>
  );
};

export default Thingy;
