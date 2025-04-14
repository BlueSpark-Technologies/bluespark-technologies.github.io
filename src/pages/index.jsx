import React from "react";
import Layouts from "@layouts/Layouts";
import HeroOneSection from "@components/sections/HeroOne"
import AboutSection from "@components/sections/About";
import ServicesSection from "@components/sections/Services";
import OurWork from "../components/sections/OurWork";

const Home1 = () => {
  return (
    <Layouts>
      <HeroOneSection />
      <AboutSection />
      <ServicesSection />
      <OurWork />
    </Layouts>
  );
};
export default Home1;
