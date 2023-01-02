import process from "../../data/main/process2.json";

const Process = () => {
  return (
    <section className="process-simp pt-50 pb-60 bg-gray position-re pb-0">
      <div className="simple-head md-mb10 mb-80 text-center">
        <div>
          <h6 className="sub-head radius mb-20">
            <span className="fz-12 ls2 text-u">Our Features</span>
          </h6>
        </div>
        <h2 className="fz-40 fw-800 gr-purple-red-text inline">
          What we offer?
        </h2>
      </div>
      <div className="container">
        <div className="row process-simp_container">
          {process.map((item, idx) => (
            <div className="col-lg-3" key={idx}>
              <div
                className={`item ${
                  idx !== process.length - 1 ? "md-mb50" : ""
                }`}
              >
                <div className="step mb-30">
                  <div className="numb">{item.numb}</div>
                  <span className={`icon ${item.icon} bg-gray`}></span>
                </div>
                <h6 className="mb-10 fw-700 ">{item.title}</h6>
                {/* <p>{item.details}</p> */}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="curve-cls top">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 500 250"
          enableBackground="new 0 0 500 250"
          xmlSpace="preserve"
          preserveAspectRatio="none"
        >
          <path
            fill="#f3f7f8"
            d="M250,246.5c-97.85,0-186.344-40.044-250-104.633V250h500V141.867C436.344,206.456,347.85,246.5,250,246.5z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Process;
