import { useEffect } from "react";
import Link from "next/link";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { HeaderIllustration } from "../AllSvgs";

const particlesOptions = {
  fullScreen: false,
  particles: {
    number: { value: 40, density: { enable: true, value_area: 800 } },
    color: { value: ["#ff5e57", "#409fff", "#50E3C2", "#E86363"] },
    shape: {
      type: "circle",
      stroke: { width: 0, color: "#000000" },
      polygon: { nb_sides: 5 },
      image: {
        src: "img/github.svg",
        width: 100,
        height: 100,
      },
    },
    opacity: {
      value: 0.5,
      random: true,
      anim: {
        enable: true,
        speed: 1,
        opacity_min: 0,
        sync: false,
      },
    },
    size: {
      value: 8,
      random: true,
      anim: {
        enable: false,
        speed: 4,
        size_min: 0.3,
        sync: false,
      },
    },
    line_linked: {
      enable: false,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 7,
      direction: "top",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: { enable: false, rotateX: 600, rotateY: 600 },
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "bubble" },
      onclick: { enable: true, mode: "repulse" },
      resize: true,
    },
    modes: {
      grab: { distance: 400, line_linked: { opacity: 1 } },
      bubble: { distance: 250, size: 0, duration: 2, opacity: 0, speed: 3 },
      repulse: { distance: 400, duration: 0.4 },
      push: { particles_nb: 4 },
      remove: { particles_nb: 2 },
    },
  },
  retina_detect: true,
};

const Header = ({ btnText, registerPage, headerMain, headerSec }) => {
  const particlesInit = async (main) => {
    await loadFull(main);
  };
  let mq = false;
  useEffect(() => {
    mq = window.matchMedia("(max-width: 50em)").matches;
  }, []);

  return (
    <header className={`full-height rshp valign mb-70 register_header`}>
      {!mq ? (
        <>
          <img
            src="img/illushead.png"
            alt="illustration"
            className="illustration"
          />
        </>
      ) : null}
      <div className="container ontop justify-content-center text-center mobile-margin">
        <div className="row ">
          <div className="col-lg-12 valign justify-content-center">
            <div className="cont">
              <h1 className="fw-800 fz-45">
                {headerMain ? headerMain : "India's Only Marketplace for Books"}
              </h1>
              <p>
                {headerSec ? headerSec : "Buy and Sell Books, hassle free!"}
              </p>
              <div className="mt-40 flex justify-content-center">
                <div>
                  <Link href="#getStarted">
                    <a className="butn butn-md gr-purple-red-bg text-light radius-30">
                      <span className="text slide-up">{btnText}</span>
                      <span className="text slide-down">Register</span>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Particles
        id="particles-js"
        init={particlesInit}
        options={particlesOptions}
      />
    </header>
  );
};

export default Header;
