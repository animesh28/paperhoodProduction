/* eslint-disable @next/next/no-img-element */
import process from "../../data/business/process.json";

const Process = ({ services }) => {
  return (
    <section className="process-img section-padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-5">
            <div className="round-head mb-80">
              <h6 className="ls2 text-u fz-13 fw-600 mb-20 gr-green-text rest">
                Our process
              </h6>
              <h3 className={services ? "fw-600" : "fw-700"}>
                Explore the <br /> creative process
              </h3>
            </div>
            <div className="steps-vr">
              {process.map((step, idx) => (
                <div
                  className={`step flex ${
                    idx !== process.length - 1 ? "mb-40" : ""
                  }`}
                  key={idx}
                >
                  <div>
                    <div className="numb fw-600">
                      <span className="gr-green-text">{step.numb}</span>
                      <div className="cover gr-green-bg"></div>
                    </div>
                  </div>
                  <div className="cont ml-40">
                    <h6 className={`mb-10 ${services ? "fz-16 fw-600" : ""}`}>
                      {step.title}
                    </h6>
                    <p className="fz-13">{step.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-6 offset-lg-1 valign">
            <div className="img out-box mt-50">
              <img src="img/laptop1.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
