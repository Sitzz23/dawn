import BackdropGradient from "@/components/shared/backdropGradient";
import GlassCard from "@/components/shared/glassCard";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container h-screen flex justify-center items-center">
      <div className="flex flex-col w-full items-center py-24">
        <h2 className="text-4xl font-bold text-themeTextWhite font-urban">
          ✦ Dawn
        </h2>
        <BackdropGradient
          className="w-4/12 h-2/6 opacity-40"
          container="flex flex-col items-center"
        >
          <GlassCard className="pb-2 mt-8 w-fit" >
            {children}
          </GlassCard>
        </BackdropGradient>
      </div>
    </div>
  );
};

export default layout;
