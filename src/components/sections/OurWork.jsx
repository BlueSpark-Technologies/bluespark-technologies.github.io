import Data from "@data/sections/our-work.json";
import Link from "next/link";
import ArrowIcon from "@layouts/svg-icons/Arrow";
import Pentagon from "@layouts/pentagon/Index";

const OurWork = () => {
  return (
    <>
      {/* our work */}
      <section id="projects">
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
                    className="mil-suptitle mil-suptitle-dark mil-blue-soft mil-suptitle-right mil-up"
                    dangerouslySetInnerHTML={{ __html: Data.subtitle }}
                  />
                </div>
              </div>

              <div className="mil-complex-text justify-content-center mil-up mil-mb-15">
                <h2
                  className="mil-h1 mil-dark mil-center"
                  dangerouslySetInnerHTML={{ __html: Data.title1 }}
                />
              </div>
            </div>

            <div className="row mil-services-grid mil-services-grid-dark m-0">
              {Data.items.map((item, key) => (
                <div
                  key={`services-item-${key}`}
                  className="col-md-6 col-lg-6 mil-services-grid-item mil-services-grid-item-dark p-0"
                >
                  <Link href={item.link} className="mil-service-card-sm mil-service-card-sm-dark">
                    <h5
                      className="mil-dark mil-mb-30"
                      dangerouslySetInnerHTML={{ __html: item.title }}
                    />
                    <p className="mil-dark-soft mil-mb-30">{item.text}</p>
                    <div className="mil-button mil-icon-button-sm mil-icon-button-sm-dark mil-arrow-place">
                      <ArrowIcon />
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
      </section>
      {/* our work end */}
    </>
  );
};

export default OurWork;
