import Link from "next/link";
import AppData from "@data/app.json";
import ArrowIcon from "@layouts/svg-icons/Arrow";

const DefaultFooter = ({ extraClass, hideButton }) => {
  return (
    <>
      {/* footer */}
      <footer className="mil-dark-bg">
        <div className="mil-invert-fix">
          <div className="container mil-p-120-0">
            <div className="row justify-content-between">
              <div className="col-md-4 col-lg-4">
                <div className={`${hideButton ? 'mil-blue-soft' :  'mil-muted'} mil-logo mil-up mil-mb-30`}>
                  {AppData.footer.logo.text}
                </div>

                {!hideButton && (
                  <Link
                    href={AppData.button.link}
                    className="mil-button mil-arrow-place mil-mb-30"
                  >
                    <span>{AppData.button.label}</span>
                    <ArrowIcon />
                  </Link>
                )}
              </div>
              <div className="col-md-7 col-lg-6">
                <div className="row justify-content-end">
                  <div className="col-6 col-md-6 col-lg-7 mil-mb-30">
                    <nav className="mil-footer-menu">
                      <ul>
                        {AppData.footer.menu.map((item, key) => (
                          <li
                            key={`footer-menu-item-${key}`}
                            className="mil-up"
                          >
                            <Link href={item.link}>{item.label}</Link>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>
                  <div className="col-6 col-md-6 col-lg-5">
                    <ul className="mil-menu-list mil-up">
                      <li>
                        <a href="#" className="mil-light-soft">
                          Privacy Policy
                        </a>
                      </li>
                      <li>
                        <a href="#" className="mil-light-soft">
                          Terms and conditions
                        </a>
                      </li>
                      <li>
                        <a href="#" className="mil-light-soft">
                          Cookie Policy
                        </a>
                      </li>
                      <li>
                        <a href="#" className="mil-light-soft">
                          Careers
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* footer end */}
    </>
  );
};
export default DefaultFooter;
