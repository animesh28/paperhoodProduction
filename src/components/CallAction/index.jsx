import { useEffect } from "react";
import Link from "next/link";
import parallaxie from "../../common/parallaxie";

const CallAction = () => {
  useEffect(() => {
    new parallaxie(".clasic-action.bg-img.parallaxie");
  }, []);

  return (
    <section
      className="clasic-action section-padding bg-img parallaxie"
      data-background="img/background/skills_2.jpg"
      data-overlay-dark="5"
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div>
              <h2 className="cta_header">
                <span>Get creative solutions.</span>
                <span>Everyone is a potential creator.</span>
              </h2>
            </div>
          </div>
          <div className="col-lg-4 valign">
            <div className="d-flex justify-content-end full-width">
              <Link href="/contact-creative">
                <a className="butn butn-lg butn-icon-anim butn-flora butn-rounded">
                  <div className="flex">
                    <span className="valign icon-left anim-one">
                      <i className="icon fz-12 fas fa-chevron-right"></i>
                    </span>
                    <span className="text text-anim-one text-u ls2 fz-12 fw-500">
                      Get In Touch
                    </span>
                    <span className="valign icon-right anim-one zindex-2">
                      <i className="icon fz-12 fas fa-chevron-right"></i>
                    </span>
                  </div>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallAction;
