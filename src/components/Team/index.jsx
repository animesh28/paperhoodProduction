/* eslint-disable @next/next/no-img-element */
import team from "../../data/creative/team.json";

const Team = () => {
  return (
    <section className="team section-padding">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="simple-head text-center mb-80">
              <h6 className="sub-head radius">Creative Staff</h6>
              <h2 className="mb-20 fw-800">
                Our Awesome <span className="gr-purple-red-text">Team</span>
              </h2>
            </div>
          </div>
        </div>

        <div className="row">
          {team.map((member, index) => (
            <div className="col-lg-3 col-md-6" key={index}>
              <div
                className={`item no-shad ${
                  index !== team.length - 1 ? "md-mb50" : ""
                }`}
              >
                <div className="img">
                  <img src={member.picture} alt="" />
                </div>
                <div className="cont">
                  <h6>{member.name}</h6>
                  <span>{member.position}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
