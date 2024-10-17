import { Fragment, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  CameraIcon,
  VideoCameraIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export interface SpeakerProps {
  idx: number;
  speaker: string;
  speakerName?: string;
  text: ReactNode;
  video: string | null;
  image: string | undefined;
  focusedPage: number;
}
const Speaker = ({
  idx,
  speaker,
  speakerName,
  text,
  video,
  image,
  focusedPage,
}: SpeakerProps) => {
  const [showVideo, setShowVideo] = useState(false);
  const previousFocusedPage = useRef(focusedPage);
  const textRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const firstUpdate = useRef(true);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = 0.3;
    }
  }, []);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    const page = idx + 1;
    const video = videoRef.current;
    const image = imageRef.current;
    const text = textRef.current!;
    const media = video || image;

    if (previousFocusedPage.current === page) {
      const rotate = focusedPage > previousFocusedPage.current ? 1 : -1;
      media?.animate(
        { transform: `rotate(${rotate}deg) translateX(4rem) scale(0.9)` },
        { duration: 1000, easing: "ease" }
      );
      video?.pause();
    } else {
      const rotate = focusedPage > previousFocusedPage.current ? -1 : 1;
      media?.animate(
        [
          {
            transform: `rotate(${rotate}deg) translateX(4rem) scale(0.9)`,
            offset: 0.25,
            easing: "ease",
          },
          {
            transform: "none",
            easing: "ease",
          },
        ],
        2000
      );
      if (focusedPage === page && window.innerWidth >= 768) {
        video?.play();
      }

      const children = Array.from(text.children).filter(
        (child) => child instanceof HTMLElement
      ) as HTMLElement[];
      children.forEach((child, i) => {
        child.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: 1000,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          delay: 500 + i * 150,
          fill: "both",
        });
        child.animate(
          [{ transform: "translateX(-8rem)" }, { transform: "none" }],
          {
            duration: 1000,
            easing: "cubic-bezier(0, 0, 0.2, 1)",
            delay: 500 + i * 150,
            fill: "both",
          }
        );
      });
    }

    previousFocusedPage.current = focusedPage;
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
      className="mx-10 flex h-screen flex-1 snap-center flex-col items-center justify-center gap-8 py-16 transition-transform duration-[1500ms] md:mx-0 xl:flex-row xl:px-8"
      style={{
        transform: `translateY(calc(-${100 * focusedPage} * var(--vh, 1vh)))`,
      }}
    >
      <section
        ref={textRef}
        className="flex flex-col justify-center space-y-3 md:space-y-4 xl:flex-[4_4_0%]"
      >
        <h1 className="z-999 flex items-end gap-2 text-3xl md:text-6xl">
          <span>{speaker}</span>
          {video ? (
            <button
              className="inline-flex w-fit items-center gap-1 rounded-full bg-gradient-to-br from-purple-400 to-indigo-400 p-2 text-base text-white shadow md:hidden"
              onClick={() => setShowVideo(true)}
            >
              <VideoCameraIcon className="h-5 w-5" />
            </button>
          ) : null}
          {image ? (
            <button
              className="inline-flex w-fit items-center gap-1 rounded-full bg-gradient-to-br from-purple-400 to-indigo-400 p-2 text-base text-white shadow md:hidden"
              onClick={() => setShowVideo(true)}
            >
              <CameraIcon className="h-5 w-5" />
            </button>
          ) : null}
          {speakerName && (
            <span className="ml-auto text-sm md:text-base">{speakerName}</span>
          )}
        </h1>
        {text}
      </section>
      <aside className="-z-10 mx-auto hidden max-h-[50%] max-w-2xl flex-col justify-center md:flex xl:max-h-[75%] xl:max-w-none xl:flex-[4]">
        {video ? (
          <video
            ref={videoRef}
            loop
            controls
            playsInline
            controlsList="nodownload noplaybackrate nofullscreen"
            disablePictureInPicture
            className="mx-auto max-h-full w-auto rounded-sm shadow-xl"
          >
            <source src={video} type="video/mp4" />
          </video>
        ) : null}
        {image ? (
          <div className="mx-auto max-h-full w-72 rounded-sm shadow-xl">
            <img ref={imageRef} src={image} alt={speaker} />
          </div>
        ) : null}
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
              {video ? (
                <video
                  autoPlay
                  loop
                  controls
                  playsInline
                  controlsList="nodownload noplaybackrate nofullscreen"
                  disablePictureInPicture
                >
                  <source src={video} type="video/mp4" />
                </video>
              ) : (
                <img src={image} alt="" />
              )}
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </section>
  );
};

export default Speaker;
