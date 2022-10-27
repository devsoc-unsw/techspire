import { StaticImageData } from "next/image";
import Image from "next/image";
import MichaelVo from "../public/images/michaelvo.png";
import AmyLiu from "../public/images/amyliu.png";
import RachelAhn from "../public/images/rachelahn.png";

interface Props {
  name: string;
  role: string;
  imageSrc: StaticImageData;
}

const Helper = ({ name = "", role = "", imageSrc }: Props) => {
  return (
    <div className="flex flex-col py-1">
      <div className="mx-auto h-72 w-72 overflow-hidden rounded-full brightness-90">
        <Image src={imageSrc} alt="credits image" />
      </div>
      <div className="mt-8 mb-2 text-center text-6xl">{name}</div>
      <div className="text-center text-4xl">{role}</div>
    </div>
  );
};

const Credits = () => {
  return (
    <div className="flex min-h-screen w-[100vw] min-w-full animate-gradient-x items-center justify-between bg-gradient-to-r from-purple-400 via-indigo-400 to-pink-400 bg-clip-text py-32 text-transparent xl:px-32 2xl:px-64">
      <Helper name={"Michael Vo"} role={"Website"} imageSrc={MichaelVo} />
      <Helper name={"Rachel Ahn"} role={"Assistant"} imageSrc={RachelAhn} />
      <Helper name={"Amy Liu"} role={"Creative"} imageSrc={AmyLiu} />
    </div>
  );
};

export default Credits;
