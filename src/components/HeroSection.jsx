import React from "react";
import herosection from "../css/herosection.css"
const HeroSection = () => {
  return (
    <section className="bg-[#384740] text-white flex items-center justify-center py-6 md:py-2">
      <div className="container mx-auto text-center px-4">
        <h1 className=" herotext text-6xl md:text-7xl font-bold leading-tight  ">
          <span className="text-[#B1FF8F]">60 SECOND</span> SECURITY
        </h1>
        <h2 className=" herotext text-6xl md:text-7xl font-semibold mt-4 md:mt-10 text-white">
          ASSESSMENT
        </h2>
      </div>
    </section>
  );
};

export default HeroSection;
