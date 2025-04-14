import Data from "@data/sections/hero-1.json";
import Link from "next/link";
import ArrowIcon from "@layouts/svg-icons/Arrow";
import Pentagon from "@layouts/pentagon/Index";

const HeroOne = () => {
    return (
        <>
            {/* banner */}
            <section className="mil-banner mil-dark-bg">
                <div className="mi-invert-fix">
                    <div className="mil-animation-frame">
                        <div className="mil-animation mil-position-1 mil-scale" data-value-1="7" data-value-2="1.6">
                            <Pentagon />
                        </div>
                        <div className="mil-animation mil-position-2 mil-scale" data-value-1="4" data-value-2="1">
                            <Pentagon />
                        </div>
                        <div className="mil-animation mil-position-3 mil-scale" data-value-1="1.2" data-value-2=".1">
                            <Pentagon />
                        </div>
                    </div>

                    <div className="mil-gradient" />

                    <div className="container">
                        <div className="mil-banner-content mil-up">

                            <h1 className="mil-muted mil-mb-60" dangerouslySetInnerHTML={{__html : Data.title}} />

                            <div className="row">
                                <div className="col-md-7 col-lg-5">
                                    <p className="mil-light-soft mil-mb-60">{Data.description}</p>
                                </div>
                            </div>

                            <Link href={Data.button1.link} className="mil-button mil-arrow-place mil-btn-space">
                                <span>{Data.button1.label}</span>
                                <ArrowIcon />
                            </Link>

                        </div>
                    </div>
                </div>
            </section>
            {/* banner end */}
        </>
    );
}
export default HeroOne;