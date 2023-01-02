import Link from "next/link";
import Split from "../Split";
import services from "../../data/main/services2.json";

const Services = () => {
  return (
    <section className="services section-padding pt-60">
      <div className="container">
        <div className="row">
          {services.map((service, idx) => (
            <div className="col-lg-4 p-0" key={idx}>
              <div className="item flex">
                <div className="icon-flex mr-20">
                  <div className="fz-40 bg-shape icon">
                    <span
                      className={`icon-font ${service.icon} gr-purple-red-text`}
                    ></span>
                    <div className="svg-shape">
                      <svg
                        viewBox="0 0 500 500"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        width="100%"
                      >
                        <path
                          d="M450.5,328Q436,406,359,419.5Q282,433,210,439Q138,445,88,386Q38,327,51,254.5Q64,182,104.5,124.5Q145,67,214,63.5Q283,60,343.5,90.5Q404,121,434.5,185.5Q465,250,450.5,328Z"
                          fill="#fafafa"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="cont-flex">
                  <h6 className="mb-10 fw-700">{service.title}</h6>
                  <p className="fz-14">{service.details}</p>
                  <Link href="/services-creative">
                    <a className="more-arow mt-20">
                      <Split>
                        <span className="sp-hover" data-splitting>
                          Know more
                        </span>
                      </Split>
                      <i className="pe-7s-angle-right"></i>
                    </a>
                  </Link>
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
