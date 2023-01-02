import contact from "../../data/creative/contact.json";

const Info = () => {
  return (
    <div className="cont-info pt-40 pb-20">
      <div className="contact-information">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-4">
              <div className="contact-item" style={{ height: "auto" }}>
                <i className="fa fa-phone"></i>
                <h4>Phone</h4>
                <p>
                  Feel free to call us anytime regarding any query or confusion.
                </p>
                Phone Number: <a href="tel:+919876543210">+91 9876543210</a>
              </div>
            </div>
            <div className="col-md-4">
              <div className="contact-item" style={{ height: "auto" }}>
                <i className="fa fa-envelope"></i>
                <h4>Email</h4>
                <p>
                  Feel free to email us anytime regarding any query or
                  confusion.
                </p>
                Support:{" "}
                <a href="mailto:mail@paperhood.in">mail@paperhood.in</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
