import React from "react";
import { ModeToggle } from "../modeToggle";

type Props = {};

const LandingDesign = (props: Props) => {
  return (
    <div className="relative h-screen dark:bg-grid-white/[0.1] bg-grid-black/[0.1] -top-48">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_1%,black)]"></div>
    </div>
  );
};

export default LandingDesign;
