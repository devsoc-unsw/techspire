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
  const [previousFocusedPage, setPreviousFocusedPage] = useState(focusedPage);
  const textRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    const page = idx + 1;
    const video = videoRef.current!;
    const text = textRef.current!;
    const animateVideo = async (className: string) => {
      const video = videoRef.current!;
      video.getAnimations().forEach((animation) => animation.cancel());

      // disgusting hack to make sure any existing animations are fully aborted before continuing
      setTimeout(() => {
        video.classList.add(className);
        const animations = video.getAnimations();
        animations[animations.length - 1]?.finished
          .catch(() => {})
          .finally(() => video.classList.remove(className));
      }, 0);
    };

    if (previousFocusedPage === page) {
      animateVideo(
        focusedPage > previousFocusedPage
          ? "animate-video-scroll-out-up"
          : "animate-video-scroll-out-down"
      );
      video.pause();
    } else {
      animateVideo(
        focusedPage > previousFocusedPage
          ? "animate-video-scroll-in-up"
          : "animate-video-scroll-in-down"
      );
      if (focusedPage === page && window.innerWidth >= 768) {
        video.play();
      }

      const children = Array.from(text.children).filter(
        (child) => child instanceof HTMLElement
      ) as HTMLElement[];
      children.forEach((child, i) => {
        child.style.transition = "";
        child.classList.add("opacity-0", "-translate-x-32");

        setTimeout(() => {
          child.style.transition =
            "opacity cubic-bezier(0.4, 0, 0.2, 1), transform cubic-bezier(0, 0, 0.2, 1)";
          child.style.transitionDuration = "1s";
          child.style.transitionDelay = `${500 + i * 150}ms`;
          child.classList.remove("opacity-0", "-translate-x-32");
        }, 0);
      });
    }

    setPreviousFocusedPage(focusedPage);

    // eslint-disable-next-line react-hooks/exhaustive-deps -- TRUST ME ON THIS
  }, [focusedPage, idx]);

  useEffect(() => {
    const resizeHandler = () => {
      if (focusedPage !== idx + 1) {
        return;
      }

      if (window.innerWidth < 768) {
        videoRef.current?.pause();
      } else {
        videoRef.current?.play();
      }
    };
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
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
        className="flex flex-col justify-center space-y-3 md:space-y-4 xl:flex-[4_4_0%]"
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
      <aside className="-z-10 mx-auto hidden max-w-2xl flex-col justify-center md:flex xl:max-w-none xl:flex-[4]">
        <video
          ref={videoRef}
          loop
          controls
          playsInline
          controlsList="nodownload noplaybackrate nofullscreen"
          disablePictureInPicture
          className="rounded-sm shadow-xl"
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
