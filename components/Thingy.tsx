import { useRef } from "react";
import useChildrenIntersectionObserver from "../hooks/useChildrenIntersectionObserver";

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
            className={`group flex items-center opacity-70 transition-opacity hover:cursor-pointer hover:opacity-100 ${
              intersecting.has(idx) &&
              "animate-gradient-xy bg-gradient-to-br from-light to-[#f472b6] bg-clip-text text-transparent !opacity-100"
            }`}
          >
            <div
              className={`mx-2 h-px w-8 transition-colors group-hover:bg-white ${
                intersecting.has(idx) &&
                "animate-gradient-xy !bg-gradient-to-br from-light to-[#f472b6]"
              }`}
            />
            <div
              onClick={() => {
                Array.from(intersectorRef.current.children)[idx].scrollIntoView(
                  { behavior: "smooth" }
                );
              }}
            >
              {speaker}
            </div>
          </div>
        ))}
      </nav>
      <main className="flex-1" ref={intersectorRef}>
        {speakers.map((speaker) => (
          <section
            key={speaker}
            className="flex h-screen flex-1 snap-center flex-col justify-center gap-4 px-8 py-16"
          >
            {speaker}
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </section>
        ))}
      </main>
    </div>
  );
};

export default Thingy;
