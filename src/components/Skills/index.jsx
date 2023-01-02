/* eslint-disable @next/next/no-img-element */
import skills from "../../data/main/skills.json";

const Skills = () => {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-5 valign">
            <div className="content md-mb50">
              <div className="sub-head radius fz-12 ls2 text-u mb-10">
                <span>Highly expertise</span>
              </div>
              <h2 className="mb-20 fw-800">
                Completed hundred of{" "}
                <span
                  className="gr-purple-red-text"
                  style={{ display: "inline" }}
                >
                  published books and still counting
                </span>
              </h2>
              <div className="clients-rate-img flex mt-40">
                <div className="imgs valign">
                  {skills.feedback.users.map((userImg, idx) => (
                    <div className="img" key={idx}>
                      <img src={userImg} alt="" />
                    </div>
                  ))}
                </div>
                <div className="text">
                  <h6>
                    <span>{skills.feedback.percentage}%</span>
                    <span className="rate-star fz-10 ms-1">
                      {Array(skills.feedback.stars)
                        .fill()
                        .map((_, idx) => (
                          <i key={idx} className="fas fa-star"></i>
                        ))}
                    </span>
                  </h6>
                  <span className="fz-13">Positive Feedback</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 offset-lg-1">
            <div className="content">
              <div className="crv-status text-center">
                {skills.numbers.map((number, idx) => (
                  <div className={`st-${number.class} item valign`} key={idx}>
                    <div className="cont full-width">
                      <h4>{number.value}</h4>
                      <span>{number.title}</span>
                    </div>
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

export default Skills;
