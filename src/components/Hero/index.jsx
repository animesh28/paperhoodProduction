import heroData from "../../data/freelancer/hero.json";

const Hero = () => {
  return (
    <section className="hero-cir section-padding" data-scroll-index="1">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="th-cir">
              {heroData.circles.map((cir, i) => (
                <div className={`cir-${i + 1} valign text-center`} key={i}>
                  <div className="full-width">
                    <span className={`icon fz-30 mb-10 ${cir.icon}`}></span>
                    <h6 className="fz-16">
                      {cir.titleTop} <br /> {cir.titleBottom}
                    </h6>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-6 valign">
            <div className="cont">
              <h6 className="sub-title mb-20">Our Journey</h6>
              <h5 className="mb-15 fz-22">
                &ldquo; {heroData.about.quote} &ldquo;
              </h5>
              <p>{heroData.about.details}</p>
              <div className="mt-50 flex">
                {heroData.numbers.map((number, i) => (
                  <div
                    className={`item ${
                      i !== heroData.numbers.length - 1 ? "mr-30" : ""
                    } full-width`}
                    key={i}
                  >
                    <h4>{number.value}</h4>
                    <p>{number.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
