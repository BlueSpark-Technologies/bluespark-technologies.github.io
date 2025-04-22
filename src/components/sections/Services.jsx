import React from "react";
import Data from "@data/sections/services.json";
import Pentagon from "@layouts/pentagon/Index";
import { Accordion } from "@/src/common/utilits";

const ServicesSection = () => {
  React.useEffect(() => {
    Accordion();
  }, []);
  return (
    <>
      {/* services */}
      <section className="mil-dark-bg" id="services">
        <div className="mi-invert-fix">
          <div className="mil-animation-frame">
            <div
              className="mil-animation mil-position-1 mil-scale"
              data-value-1="2.4"
              data-value-2="1.4"
              style={{ top: "300px", right: "-100px" }}
            >
              <Pentagon />
            </div>
            <div
              className="mil-animation mil-position-2 mil-scale"
              data-value-1="2"
              data-value-2="1"
              style={{ left: "150px" }}
            >
              <Pentagon />
            </div>
          </div>
          <div className="container mil-p-120-0">
            <div className="mil-mb-120">
              <div className="row">
                <div className="col-lg-10">
                  <span
                    className="mil-suptitle mil-light-soft mil-suptitle-right mil-up"
                    dangerouslySetInnerHTML={{ __html: Data.subtitle }}
                  />
                </div>
              </div>

              <div className="mil-complex-text justify-content-center mil-up mil-mb-15">
                <h2
                  className="mil-h1 mil-muted mil-center"
                  dangerouslySetInnerHTML={{ __html: Data.title1 }}
                />
              </div>
                <h2
                  className="mil-h1 mil-muted mil-center"
                  dangerouslySetInnerHTML={{ __html: Data.title2 }}
                />
            </div>

            <div className="row mil-services-grid m-0 pt-4">
              {Data.items.map((item, key) => (
                <div
                  className="mil-accordion-group mil-up"
                  key={`service-list-${key}`}
                >
                  <div className="mil-accordion-menu">
                    <h5
                      className="mil-muted mil-flex mil-vert-between"
                      dangerouslySetInnerHTML={{ __html: item.title }}
                    />

                    <div className="mil-symbol mil-h3">
                      <div className="mil-plus">+</div>
                      <div className="mil-minus">-</div>
                    </div>
                    
                  </div>

                  <div
                    className="mil-accordion-content mil-light-soft"
                    dangerouslySetInnerHTML={{ __html: item.text }}
                    style={{transition: "all 0.3s ease-in-out"}}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* services end */}
    </>
  );
};

export default ServicesSection;
