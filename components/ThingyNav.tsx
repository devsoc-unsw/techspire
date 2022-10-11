import type { ReactNode } from "react";

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

const ThingyNav = ({ speakers, focusedPage, setFocusedPage }: Props) => (
  <>
    <nav
      className="sticky top-0 hidden h-screen w-40 flex-col justify-center pl-2 transition-transform duration-[1500ms] md:flex lg:w-48"
      style={{
        transform: focusedPage
          ? "translateY(calc(-100 * var(--vh, 1vh)))"
          : undefined,
      }}
    >
      {Object.keys(speakers).map((speaker, idx) => (
        <button
          key={speaker}
          className={`group flex items-center opacity-80 transition-opacity hover:opacity-100 ${
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
        </button>
      ))}
    </nav>
    <nav
      className="fixed inset-x-0 bottom-[calc(20px-100*var(--vh,1vh))] z-10 flex items-end justify-center transition-transform duration-[1500ms] md:hidden"
      style={{
        transform: focusedPage
          ? "translateY(calc(-100 * var(--vh, 1vh)))"
          : undefined,
      }}
    >
      {Object.keys(speakers).map((speaker, idx) => (
        <button
          key={speaker}
          className="group flex h-8 items-end px-4"
          onClick={() => {
            setFocusedPage(idx + 1);
            console.log(123132);
          }}
        >
          <div
            className={`w-0.5 bg-white transition-[height,opacity] duration-500 group-hover:h-3/4 group-hover:opacity-100 ${
              focusedPage === idx + 1
                ? "!h-full opacity-100"
                : "h-1/2 opacity-80"
            }`}
          />
        </button>
      ))}
    </nav>
  </>
);

export default ThingyNav;
