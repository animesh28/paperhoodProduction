/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import Link from "next/link";
import ModalVideo from "react-modal-video";
import "react-modal-video/css/modal-video.css";

const HomeAbout = () => {
  const [isOpen, setOpen] = useState(false);
  let mq;
  useEffect(() => {
    mq = window.matchMedia("(max-width: 50em)").matches;
  }, []);

  return (
    <section className="mt-60 mb-40 pt-0 homeAbout">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6 valign">
            <div className="intro-two-img full-width md-mb50">
              <div className="img1">
                <img src="img/about/about.jpg" alt="about-section_image" />
              </div>
              <div className="img2">
                <img src="img/about/typewriter.jpg" alt="about-section_image" />
              </div>
            </div>
          </div>
          <div className="col-lg-6 valign px-5">
            <div className={`content pl-50`}>
              <div className="sub-head radius fz-12 ls2 text-u mb-10">
                <span>Welcome to Paperhood</span>
              </div>
              <h2 className="mb-20 fw-800">
                What is <span className="gr-purple-red-text">Paperhood?</span>
              </h2>
              <p>
                Paperhood is India’s first marketplace for books and only
                three-dimensional platform to provide listing, printing and
                distribution support. We allow users to Sell & Buy Books
                hassle-free.
              </p>

              <Link href="/about">
                <a className="butn butn-md gr-purple-red-bg text-light radius-30 mt-30">
                  <span className="text slide-up">Read more</span>
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

export default HomeAbout;
