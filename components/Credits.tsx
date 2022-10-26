import { StaticImageData } from "next/image";
import Image from "next/image";
import MichaelVo from "../public/images/michaelvo.png";
import AmyLiu from "../public/images/amyliu.png";

interface Props {
  name: string;
  role: string;
  imageSrc: StaticImageData;
}

const Helper = ({ name = "", role = "", imageSrc }: Props) => {
  return (
    <div className="flex animate-gradient-x flex-col bg-gradient-to-r from-purple-400 via-indigo-400 to-pink-400 bg-clip-text py-1 text-transparent">
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
    <div className="flex min-h-screen w-[100vw] min-w-full items-center justify-between py-64 px-64">
      <Helper name={"Michael Vo"} role={"Frontend"} imageSrc={MichaelVo} />
      <Helper name={"Amy Liu"} role={"Creative"} imageSrc={AmyLiu} />
    </div>
  );
};

export default Credits;
