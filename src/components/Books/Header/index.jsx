/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import ModalVideo from "react-modal-video";
import "react-modal-video/css/modal-video.css";
import headerData from "../../../data/nfts/header.json";

const Header = () => {
  const [isOpen, setOpen] = useState(false);

  const openVideo = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  return (
    <header className="full-height valign" data-scroll-index="0">
      <div
        className="background bg-img"
        style={{ backgroundImage: "url('nft/img/pattern-bg.png')" }}
      ></div>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 valign md-mb50">
            <div className="cont">
              <h1>
                Discover, <br /> collect, and sell extraordinary NFTs
              </h1>
              <div className="mt-40 flex">
                <div className="mr-30">
                  <a
                    href="#0"
                    data-scroll-nav="2"
                    className="butn butn-md bg-light text-dark radius-5"
                  >
                    <span className="text slide-up">Get Started</span>
                    <span className="text slide-down">Get Started</span>
                  </a>
                </div>
                <div>
                  <a
                    href="https://youtu.be/AzwC6umvd1s"
                    className="btn-vid"
                    onClick={openVideo}
                  >
                    <i className="fas fa-play"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5 offset-lg-1">
            <div className="flex main-marq">
              <div className="slide-vertical st1 mr-20">
                <div className="box">
                  {headerData.st1.map((img, i) => (
                    <div className="img" key={i}>
                      <img src={img} alt="" />
                    </div>
                  ))}
                </div>
                <div className="box">
                  {headerData.st1.map((img, i) => (
                    <div className="img" key={i}>
                      <img src={img} alt="" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="slide-vertical st2">
                <div className="box">
                  {headerData.st2.map((img, i) => (
                    <div className="img" key={i}>
                      <img src={img} alt="" />
                    </div>
                  ))}
                </div>
                <div className="box">
                  {headerData.st2.map((img, i) => (
                    <div className="img" key={i}>
                      <img src={img} alt="" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="slide-vertical st3 ml-20">
                <div className="box">
                  {headerData.st3.map((img, i) => (
                    <div className="img" key={i}>
                      <img src={img} alt="" />
                    </div>
                  ))}
                </div>
                <div className="box">
                  {headerData.st3.map((img, i) => (
                    <div className="img" key={i}>
                      <img src={img} alt="" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="star1">
        <img src="nft/img/header/star1.png" alt="" />
      </div>
      <div className="star2">
        <img src="nft/img/header/star2.png" alt="" />
      </div>
      <div className="star3">
        <img src="nft/img/header/star3.png" alt="" />
      </div>
      <div className="star4"></div>
      {typeof window !== "undefined" && (
        <ModalVideo
          channel="youtube"
          autoplay
          isOpen={isOpen}
          videoId="AzwC6umvd1s"
          onClose={() => setOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
