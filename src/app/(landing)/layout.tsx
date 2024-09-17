import LandingDesign from "@/components/shared/layout/landingBg";
import Navbar from "@/components/shared/layout/navbar";
import React from "react";

const LandingLayout = (props: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen rounded-[0.5rem] relative overflow-y-clip">
      {/* <LandingDesign /> */}

      <Navbar />
      <main className="min-h-[calc(100vh-14rem)] flex-1 space-y-4">
        {props.children}
      </main>
    </div>
  );
};

export default LandingLayout;
