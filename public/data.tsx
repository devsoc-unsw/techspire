import { ReactElement } from "react";
import AtlassianText from "../components/Speakers/AtlassianText";
import PearlerText from "../components/Speakers/PearlerText";
import CanvaText from "../components/Speakers/CanvaText";
import MarcCheeText from "../components/Speakers/MarcCheeText";
import JobsboardText from "../components/Speakers/JobsboardText";
import AmazonText from "../components/Speakers/AmazonText";

export const siteData: {
  [k: string]: {
    [k: string]: {
      speakerName?: string;
      text: ReactElement;
      video: string | null;
    };
  };
} = {
  "2022": {
    Atlassian: {
      speakerName: "Ofir Zeevi",
      text: <AtlassianText />,
      video: "./videos/ofir.mp4",
    },
    Pearler: {
      speakerName: "Kath-Lin Han",
      text: <PearlerText />,
      video: "./videos/kathlin.mp4",
    },
    Canva: {
      speakerName: "Adam Tizzone",
      text: <CanvaText />,
      video: null,
    },
    "Marc Chee": {
      text: <MarcCheeText />,
      video: "./videos/marc.mp4",
    },
    Jobsboard: {
      speakerName: "Darian & Joanna",
      text: <JobsboardText />,
      video: "./videos/jobsboard.mp4",
    },
    Amazon: {
      speakerName: "Adam Leung",
      text: <AmazonText />,
      video: "./videos/adam-leung.mp4",
    },
  },
  "2024": {
    Amazon: {
      speakerName: "Adam Leung",
      text: <AmazonText />,
      video: "./videos/adam-leung.mp4",
    },
  },
};
