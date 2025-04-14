import Data from "@data/projects/dynamicPricing.json";
import Layouts from "@layouts/Layouts";
import PageBanner from "@components/PageBanner";
import CallToActionSection from "@components/sections/CallToAction";
import { ProjectDetails } from "@/src/components/ProjectDetails";

const DynamicPricing = () => {
  const {
    title,
    subtitle,
    image,
    description
  } = Data;

  return (
    <Layouts noFooter>
      <PageBanner
        pageTitle={title}
        subtitle={subtitle}
        breadTitle={"Dynamic Pricing"}
        anchorLink={"#projects"}
      />

      <ProjectDetails image={image} description={description}/>

      <CallToActionSection />
    </Layouts>
  );
};
export default DynamicPricing;
