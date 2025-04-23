import FooterLayoutDefault from "./LayoutDefault";

const Footer = ({ layout, bg, instagram, extraClass, hideButton }) => {
  switch (layout) {
    case 1:
      return;
    case 2:
      return;
    default:
      return <FooterLayoutDefault bg={bg} instagram={instagram} extraclassName={extraClass} hideButton={hideButton} />;
  }
};
export default Footer;
