import React from "react";
import Layouts from "@layouts/Layouts";
import HeroOneSection from "@components/sections/HeroOne"
import AboutSection from "@components/sections/About";
import ServicesSection from "@components/sections/Services";
import OurWork from "../components/sections/OurWork";
import Values from "../components/sections/Values";
import Testimonial from "../components/sections/Testimonial";
import Reasons from "../components/sections/Reasons";
import Separator from "../components/Separator";

const Home1 = () => {
  return (
    <Layouts>
      <HeroOneSection />
      <AboutSection />
      <ServicesSection />
      <OurWork />
      <Values />
      <Testimonial/>
      <Reasons/>
      <Separator/>
    </Layouts>
  );
};
export default Home1;
