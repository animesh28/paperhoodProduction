import services from "../../data/creative/services.json";

const Services = () => {
  return (
    <section className="services section-padding">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="simple-head text-center mb-80">
              <h6 className="sub-head radius">Best Services</h6>
              <h2 className="mb-20 fw-800">
                Our Journey to{" "}
                <span className="gr-purple-red-text">Dreams</span>
              </h2>
            </div>
          </div>
        </div>
        <div className="row">
          {services.map((service, index) => (
            <div className="col-lg-6" key={index}>
              <div className="item-box flex bg-gray-light mb-30">
                <div>
                  <div className="icon-bord-shad revers">
                    <span className={service.icon}></span>
                    <i className="bg-gray-light"></i>
                  </div>
                </div>
                <div className="cont ml-30">
                  <h6 className="mb-10 fw-600">{service.title}</h6>
                  <p>{service.details}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
