import { Fragment, useState } from "react";
import type { ReactNode } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { VideoCameraIcon, XMarkIcon } from "@heroicons/react/24/outline";

export interface SpeakerProps {
  speaker: string;
  speakerName?: string;
  text: ReactNode;
  video: string;
}
const Speaker = ({ speaker, speakerName, text, video }: SpeakerProps) => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section
      key={speaker}
      className="flex h-screen flex-1 snap-center flex-col justify-center gap-8 px-8 py-16 xl:flex-row xl:gap-16"
    >
      <section className="flex flex-col justify-center space-y-3 md:space-y-4 xl:flex-[4_4_0%]">
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
      <aside className="mx-auto hidden max-w-2xl flex-col justify-center md:flex xl:max-w-none xl:flex-[3_3_0%]">
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
