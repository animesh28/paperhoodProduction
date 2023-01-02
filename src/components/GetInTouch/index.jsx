import { useState } from "react";
import contact from "../../data/freelancer/contact.json";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errMessage, setErrMessage] = useState(null);

  const validateForm = (formValues) => {
    if (!formValues.name || !formValues.email || !formValues.message) {
      setErrMessage("Please fill in all fields");
      return false;
    }
    if (formValues.name.length < 5) {
      setErrMessage("Name must be at least 5 characters");
      return false;
    }
    if (formValues.subject.length < 10) {
      setErrMessage("Subject must be at least 10 characters");
      return false;
    }
    if (formValues.message.length < 10) {
      setErrMessage("Message must be at least 10 characters");
      return false;
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.email)) {
      setErrMessage("Email is invalid");
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //= Validate Form
    if (!validateForm(formData)) return;

    //= Clear Error Message
    setErrMessage("");

    //= Sumbit The Form
    document.forms[0].submit();
  };

  return (
    <section className="contact section-padding" data-scroll-index="5">
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <div className="cont md-mb50">
              <h2 className="fw-600 mb-10">Let&lsquo;s Talk</h2>
              <p>
                Morbi iaculis convallis arcu, nec maximus tellus sodales in
                blandit enim at nisl loborti.
              </p>

              <div className="info mt-50">
                <ul className="rest">
                  <li className="flex mb-30">
                    <div>
                      <span className="icon circle-60 bg-gray mr-20 pe-7s-map-marker"></span>
                    </div>
                    <div>
                      <h6 className="fz-16 mb-5">Living In:</h6>
                      <p className="fz-14">{contact.address}</p>
                    </div>
                  </li>
                  <li className="flex">
                    <div>
                      <span className="icon circle-60 bg-gray mr-20 pe-7s-mail"></span>
                    </div>
                    <div>
                      <h6 className="fz-16 mb-5">Call:</h6>
                      <p className="fz-14">{contact.phone}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-7 offset-lg-1">
            <div className="form">
              <div className="text mb-30">
                <h5>Got some Queries? Drop down Below!</h5>
              </div>
              <form id="contact-form" method="post" action="contact.php">
                {errMessage && <div className="messages">{errMessage}</div>}

                <div className="controls">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-group">
                        <input
                          id="form_name"
                          type="text"
                          name="name"
                          placeholder="Name"
                          required="required"
                          onChange={handleChange}
                          value={formData.name}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group has-error has-danger">
                        <input
                          id="form_email"
                          type="email"
                          name="email"
                          placeholder="Email"
                          required="required"
                          onChange={handleChange}
                          value={formData.email}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <input
                          id="form_Subject"
                          type="text"
                          name="subject"
                          placeholder="Subject"
                          onChange={handleChange}
                          value={formData.subject}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <textarea
                          id="form_message"
                          name="message"
                          placeholder="Message"
                          rows="4"
                          required="required"
                          onChange={handleChange}
                          value={formData.message}
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="text-center">
                        <a
                          href="#0"
                          className="sub-title mb-0"
                          onClick={handleSubmit}
                        >
                          <span className="text fz-12">Send Message</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
