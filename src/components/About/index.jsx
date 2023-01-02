/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import Link from "next/link";
import ModalVideo from "react-modal-video";
import "react-modal-video/css/modal-video.css";

const OurJourneyToDreams = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <section className="section-padding pt-0">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 valign">
            <div className="intro-two-img full-width md-mb50">
              <div className="img1">
                <img src="img/about/about_3.jpg" alt="about-section_image" />
              </div>
              <div className="img2">
                <img src="img/about/about_1.jpg" alt="about-section_image" />
              </div>
              <div className="award-icon">
                <div className="star mb-20">
                  <div className="img">
                    <img src="img/waves/star.png" alt="about-section_image" />
                    <span className="icon pe-7s-medal"></span>
                  </div>
                </div>
                <h6>100%</h6>
                <p>verified</p>
              </div>
            </div>
          </div>
          <div className="col-lg-6 valign">
            <div className="content pl-50">
              <div className="sub-head radius fz-12 ls2 text-u mb-10">
                <span>Welcome to Paperhood</span>
              </div>
              <h2 className="mb-20 fw-800">
                Our Journey to{" "}
                <span className="gr-purple-red-text">Dreams</span>.
              </h2>
              <p>
                Paperhood is Printing Management Company (PMC), dedicated to
                provide Printing & Management services to all Publishers,
                vendors, Educational Organizations
              </p>

              <ul className="check-list rest mt-20">
                <li className="mb-10">
                  <span className="icon bg-gray mr-20">
                    <i className="fas fa-check"></i>
                  </span>
                  Print-on-Demand services
                </li>
                <li className="mb-10">
                  <span className="icon bg-gray mr-20">
                    <i className="fas fa-check"></i>
                  </span>
                  Offset & Digital Printing
                </li>
                <li>
                  <span className="icon bg-gray mr-20">
                    <i className="fas fa-check"></i>
                  </span>
                  Merchandise or any other kind of Printing jobs
                </li>
              </ul>

              <Link href="/about-creative">
                <a className="butn butn-md gr-purple-red-bg text-light radius-30 mt-30">
                  <span className="text slide-up">About Us</span>
                  <span className="text slide-down">About Us</span>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {typeof window !== "undefined" && (
        <ModalVideo
          channel="youtube"
          autoplay
          isOpen={isOpen}
          videoId="AzwC6umvd1s"
          onClose={() => setOpen(false)}
        />
      )}
    </section>
  );
};

export default OurJourneyToDreams;
