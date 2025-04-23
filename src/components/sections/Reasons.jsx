import Pentagon from "@layouts/pentagon/Index";
import Data from "@data/sections/reasons.json";
const Reasons = () => {
  return (
    <>
      <section id="reasons" className="mil-dark-bg">
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
          <div className="container mil-p-120-30  mil-mb-60">
            <div className="row justify-content-between align-items-center">
              <div className="col-md-5">
                <h2
                  className="mil-h2 mil-center mil-mb-60 mil-accent mil-up"
                  dangerouslySetInnerHTML={{ __html: Data.title }}
                />
              </div>
              <div className="col-md-5">
                {Data.reasons?.map((reason, ix) => (
                  <div className="mil-mb-30 mil-text mil-up" key={ix}>
                    <p
                      className="mil-accent mil-text-xl mil-up"
                      dangerouslySetInnerHTML={{ __html: reason.title }}
                    />
                    {reason?.items?.length > 0 && (
                      <ul className="mil-vert-between">
                        {reason?.items?.map((el, ix) => (
                          <li
                            key={ix}
                            className="mil-muted mil-thin mil-text-lg mil-up"
                            dangerouslySetInnerHTML={{ __html: el.text }}
                          />
                        ))}
                      </ul>
                    )}
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

export default Reasons;
