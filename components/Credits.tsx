import { StaticImageData } from "next/image";
import Image from "next/image";
import MichaelVo from "../public/images/michaelvo.png";
import AmyLiu from "../public/images/amyliu.png";
import RachelAhn from "../public/images/rachelahn.png";

interface Props {
  name: string;
  role: string;
  imageSrc: StaticImageData;
  className?: string;
}

const Helper = ({ name = "", role = "", imageSrc, className = "" }: Props) => {
  return (
    <div className={`flex flex-col py-1 ${className}`}>
      <div className="mx-auto h-[clamp(6rem,25vw,18rem)] w-[clamp(6rem,25vw,18rem)] overflow-hidden rounded-full brightness-90">
        <Image src={imageSrc} alt="credits image" />
      </div>
      <div className="mt-1 text-center text-[clamp(1.125rem,5vw,3.75rem)] leading-none lg:mt-8">
        {name}
      </div>
      <div className="text-center text-[clamp(1rem,4vw,2.25rem)]">{role}</div>
    </div>
  );
};

const Credits = () => {
  return (
    <div className="flex min-h-screen w-[100vw] min-w-full animate-gradient-x items-center justify-around bg-gradient-to-r from-purple-400 via-indigo-400 to-pink-400 bg-clip-text py-32 text-transparent 2xl:px-32">
      <Helper
        className="translate-x-8 -translate-y-16 lg:transform-none"
        name={"Michael Vo"}
        role={"Website"}
        imageSrc={MichaelVo}
      />
      <Helper
        className="translate-y-16 lg:transform-none"
        name={"Rachel Ahn"}
        role={"Assistant"}
        imageSrc={RachelAhn}
      />
      <Helper
        className="-translate-x-8 -translate-y-16 lg:transform-none"
        name={"Amy Liu"}
        role={"Creative"}
        imageSrc={AmyLiu}
      />
    </div>
  );
};

export default Credits;
