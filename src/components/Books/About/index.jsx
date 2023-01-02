/* eslint-disable @next/next/no-img-element */
import aboutData from "../../../data/nfts/about.json";

const About = () => {
  return (
    <section className="blck-nft section-padding" data-scroll-index="3">
      <div className="container">
        <div className="row">
          <div className="col-lg-5">
            <div className="content md-mb80">
              <span className="rad-head mb-20">
                <i className="fas fa-fire gr-blue-text"></i>Digital Art
              </span>
              <h3 className="fw-700 mb-15">Digital art works.</h3>
              <p>
                We are a collective group of designers, developers, and
                technologists with extensive backgrounds in digital sector. Our
                purpose is to make most notable NFT collections.
              </p>

              <div className="d-flex justify-content-between stauts mt-50">
                {aboutData.status.map((item, i) => (
                  <div className="item" key={i}>
                    <h5 className="fw-700">
                      {item.number}{" "}
                      <span className="fz-18">{item.operator}</span>
                    </h5>
                    <span className="fz-14 fw-300 mt-10">{item.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-lg-6 offset-lg-1">
            <div className="imgs flex">
              <div className="img1">
                <img src="nft/img/01.jpg" alt="" />
                <span className="bord"></span>
              </div>
              <div className="img2">
                <img src="nft/img/02.jpg" alt="" />
                <span className="bord"></span>
              </div>
              <div className="box-text">
                <div className="users-imgs flex valign">
                  <div>
                    {aboutData.users.images.map((image, i) => (
                      <div className={`simg${i + 1}`} key={i}>
                        <img src={image} alt="" />
                      </div>
                    ))}
                  </div>
                  <div className="ml-15 fz-12">
                    <span>
                      More Than <br />{" "}
                      <span className="fz-14 fw-700">
                        {aboutData.users.number}
                      </span>
                    </span>
                  </div>
                </div>
                <p className="fz-14 text-light mt-10">{aboutData.users.text}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
