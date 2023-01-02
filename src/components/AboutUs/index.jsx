/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import aboutData from "../../data/creative/about.json";

const About = () => {
  return (
    <section className="about section-padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-5 valign">
            <div className="cont md-mb50">
              <span className="sub-head radius">Our Vision</span>
              <h2 className="mb-20 fw-800">
                Paperhood Printing{" & "}
                <span className="gr-purple-red-text">Management Company</span>
              </h2>
              <p style={{ textAlign: "justify" }}>{aboutData.text}</p>
              <Link href="/services-creative">
                <a className="butn butn-lg butn-icon-anim butn-flora butn-rounded mt-30">
                  <div className="flex">
                    <span className="valign icon-left anim-one">
                      <i className="icon fz-12 fas fa-chevron-right"></i>
                    </span>
                    <span className="text text-anim-one text-u ls2 fz-12 fw-500">
                      Get Started
                    </span>
                    <span className="valign icon-right anim-one zindex-2">
                      <i className="icon fz-12 fas fa-chevron-right"></i>
                    </span>
                  </div>
                </a>
              </Link>
            </div>
          </div>
          <div className="col-lg-6 offset-lg-1">
            <div className="two-img">
              <div className="img1">
                <img src={aboutData.image1} alt="" />
              </div>
              <div className="img2">
                <img src={aboutData.image2} alt="" />
              </div>

              <div id="circle">
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  width="300px"
                  height="300px"
                  viewBox="0 0 300 300"
                  enableBackground="new 0 0 300 300"
                  xmlSpace="preserve"
                >
                  <defs>
                    <path
                      id="circlePath"
                      d=" M 150, 150 m -60, 0 a 60,60 0 0,1 120,0 a 60,60 0 0,1 -120,0 "
                    />
                  </defs>
                  <circle cx="150" cy="100" r="75" fill="none" />
                  <g>
                    <use xlinkHref="#circlePath" fill="none" />
                    <text fill="#3b3f82">
                      <textPath xlinkHref="#circlePath">
                        Years Of Experience . Years Of Experience
                      </textPath>
                    </text>
                  </g>
                </svg>
                <div className="bord">
                  <div className="cont">
                    <h3 className="fz-70 font-numb">{aboutData.years}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
