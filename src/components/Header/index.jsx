import { useEffect } from "react";
import Link from "next/link";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

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
  useEffect(() => {
    let bgImg = document.querySelector("header.full-height .bg-img");
    bgImg.style.backgroundImage = `url(${bgImg.getAttribute(
      "data-background"
    )})`;
  }, []);

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <header className={`full-height rshp valign mb-70 `}>
      <span className="madeWithLove d-flex align-items-center">
        <span className="mr-20">
          Made with{" "}
          <i class="fas fa-heart" style={{ color: "rgb(139, 0, 0)" }}></i> in
          India
        </span>
        <span className="d-flex align-items-center justify-content-center">
          ISO Certified{" "}
          <img
            src="img/iso.png"
            style={{ height: "25px", width: "auto", marginLeft: "5px" }}
          />
        </span>
      </span>
      <div
        className="front bg-img"
        data-background={
          registerPage
            ? "img/slider/register_hero.png"
            : "img/slider/bookIlustration.png"
        }
      ></div>
      <div className="container ontop">
        <div className="row">
          <div className="col-lg-6 valign">
            <div className="cont">
              <div className="sub-head radius mb-10 sub-head_header">
                <span>Welcome to Paperhood</span>
              </div>
              <h1 className="fw-800 fz-45">
                {headerMain ? headerMain : "India's Only Marketplace for Books"}
              </h1>
              <p>
                {headerSec ? headerSec : "Buy and Sell Books, hassle free!"}
              </p>
              <div className="mt-40 flex">
                <div>
                  <Link href="/register">
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
