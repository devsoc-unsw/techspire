import { Fragment, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { VideoCameraIcon, XMarkIcon } from "@heroicons/react/24/outline";

export interface SpeakerProps {
  idx: number;
  speaker: string;
  speakerName?: string;
  text: ReactNode;
  video: string;
  focusedPage: number;
}
const Speaker = ({
  idx,
  speaker,
  speakerName,
  text,
  video,
  focusedPage,
}: SpeakerProps) => {
  const [showVideo, setShowVideo] = useState(false);
  const [animateVideo, setAnimateVideo] = useState(false);
  const [animateVideoOut, setAnimateVideoOut] = useState(false);
  const [previousFocusedPage, setPreviousFocusedPage] = useState(focusedPage);
  const textRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const page = idx + 1;
    if (previousFocusedPage === page) {
      setAnimateVideoOut(true);
      setTimeout(() => {
        setAnimateVideoOut(false);
      }, 1000);
    } else if (
      (focusedPage > previousFocusedPage &&
        focusedPage >= page &&
        previousFocusedPage < page) ||
      (focusedPage < previousFocusedPage &&
        focusedPage <= page &&
        previousFocusedPage > page)
    ) {
      setAnimateVideo(true);
      setTimeout(() => {
        setAnimateVideo(false);
      }, 2000);

      const text = textRef.current;
      if (text) {
        const children = Array.from(text.children).filter(
          (child) => child instanceof HTMLElement
        ) as HTMLElement[];
        children.forEach((child, i) => {
          child.classList.add("opacity-0", "animate-text-scroll-in");
          child.style.animationDelay = `${500 + i * 150}ms`;
          console.log(child);
          setTimeout(() => {
            child.classList.remove("opacity-0", "animate-text-scroll-in");
          }, 1500 + i * 150);
        });
      }
    }

    setPreviousFocusedPage(focusedPage);

    const video = videoRef.current;
    if (!video) {
      return;
    }
    if (focusedPage === page) {
      video.play();
    } else {
      video.pause();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- TRUST ME ON THIS
  }, [focusedPage, idx]);

  return (
    <section
      key={speaker}
      className="flex h-screen flex-1 snap-center flex-col justify-center gap-8 px-8 py-16 transition-transform duration-[1500ms] xl:flex-row"
      style={{
        transform: `translateY(-${100 * focusedPage}vh)`,
      }}
    >
      <section
        ref={textRef}
        className="flex flex-col justify-center space-y-3 [text-shadow:0_2px_7px_black,0_5px_15px_rgba(0,0,0,0.5)] md:space-y-4 xl:flex-[4_4_0%]"
      >
        <h1 className="z-999 flex items-end gap-2 text-3xl md:text-6xl">
          <span>{speaker}</span>
          <button
            className="inline-flex w-fit items-center gap-1 rounded-full bg-gradient-to-br from-purple-400 to-indigo-400 p-2 text-base text-white shadow md:hidden"
            onClick={() => setShowVideo(true)}
          >
            <VideoCameraIcon className="h-5 w-5" />
          </button>
          {speakerName && (
            <span className="ml-auto text-sm md:text-base">{speakerName}</span>
          )}
        </h1>
        {text}
      </section>
      <aside className="-z-10 mx-auto hidden max-w-2xl flex-col justify-center md:flex xl:max-w-none xl:flex-[4] xl:-translate-x-24">
        <video
          ref={videoRef}
          loop
          controls
          playsInline
          controlsList="nodownload noplaybackrate nofullscreen"
          disablePictureInPicture
          className={`rotate-1 rounded-sm shadow-xl ${
            animateVideoOut
              ? "animate-video-scroll-out"
              : animateVideo
              ? "animate-video-scroll-in"
              : ""
          }`}
        >
          <source src={video} type="video/mp4" />
        </video>
      </aside>
      <Transition show={showVideo} as={Fragment}>
        <Dialog
          onClose={() => setShowVideo(false)}
          className="fixed inset-0 z-50 grid place-items-center p-4"
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            leave="ease-in duration-200"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 -z-10 bg-black/70"></div>
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95 translate-y-4"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95 translate-y-4"
          >
            <Dialog.Panel className="relative text-white">
              <button
                className="absolute right-0 -top-12"
                onClick={() => setShowVideo(false)}
              >
                <XMarkIcon className="h-8 w-8" />
              </button>
              <video
                autoPlay
                loop
                controls
                controlsList="nodownload noplaybackrate nofullscreen"
                disablePictureInPicture
              >
                <source src={video} type="video/mp4" />
              </video>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </section>
  );
};

export default Speaker;
