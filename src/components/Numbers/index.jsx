import numbers from "../../data/creative/numbers.json";

const Numbers = () => {
  return (
    <section className="numbers">
      <div className="container md-pt80">
        <div className="row">
          {numbers.map((number, index) => (
            <div className="col-lg-4" key={index}>
              <div className="item">
                <div className="numb valign">
                  <h3 className="gr-simple fw-200">
                    {number.number}{" "}
                    {number.operator ? <i>{number.operator}</i> : null}
                  </h3>
                </div>
                <div className="cont">
                  <h6 className="fw-600" style={{ color: "#3b3f82" }}>
                    {number.titleTop} <br /> {number.titleBottom}
                  </h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Numbers;
