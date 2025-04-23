import React from "react";
import Data from "@data/sections/values.json";
import Pentagon from "@layouts/pentagon/Index";

const Values = () => {
  return (
    <>
      <section id="our-mission" className="mil-dark-bg">
        <div className="mil-invert-fix">
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

              <div className="mil-complex-text justify-content-start mil-up mil-mb-60">
                <p
                  className="mil-text-xl mil-muted mil-thin"
                  dangerouslySetInnerHTML={{ __html: Data.title2 }}
                />
              </div>
              <div className="mil-complex-text justify-content-center mil-up mil-mb-60">
                <h2
                  className="mil-h1 mil-muted mil-center"
                  dangerouslySetInnerHTML={{ __html: Data.title1 }}
                />
              </div>

              <div className="row mil-services-grid m-0">
                {Data.values.map((item, key) => (
                  <div
                    key={`services-item-${key}`}
                    className="col-md cols-5 row-cols-md-1 mil-services-grid-item p-0 mil-mb-20"
                  >
                    <h5
                      className="mil-light mil-mb-15 mil-service-card-sm "
                      dangerouslySetInnerHTML={{ __html: item.title }}
                      style={{ textAlign: "center" }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Values;
