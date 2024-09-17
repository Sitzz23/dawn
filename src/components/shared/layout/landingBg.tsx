import React from "react";
import { ModeToggle } from "../modeToggle";
import GridSvg from "@/assets/gridSvg";

type Props = {};

const LandingDesign = (props: Props) => {
  return (
    <div className="relative h-screen dark:bg-grid-white/[0.1] bg-grid-black/[0.1] -top-[50vh] ">
      <div className="absolute pointer-events-none inset-0 flex  items-center justify-center bg-background [mask-image:radial-gradient(circle,transparent_10%,black)] max-h-screen"></div>
    </div>
  );
};

export default LandingDesign;
