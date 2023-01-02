import Link from "next/link";
import { useState, useContext } from "react";
import { DataContext } from "../../store/GlobalState";
import { error, success } from "../Notify";
import { postData } from "../../server_utils/fetchData";

const phoneRegExp = "[6-9]{1}[0-9]{9}";

const SignUp = () => {
  const [state, dispatch] = useContext(DataContext);

  const [userData, setUserData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    cf_password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userData.password != userData.cf_password) {
      return error("Passwords don't match");
    }

    dispatch({ type: "NOTIFY", payload: { loading: true } });
    const res = await postData("auth/register", userData);
    dispatch({ type: "NOTIFY", payload: { loading: false } });

    if (res.err) return error(res.err);
    return success(res.msg);
  };

  return (
    <>
      <section className="signup__area po-rel-z1 pt-100 pb-145 mb-50 max-wid">
        <div className="container d-flex justify-content-center mob-pad">
          <div className="row desk-width">
            <div className="col-xxl-12 col-xl-12 col-lg-12 ">
              <div className="sign__wrapper white-bg">
                <h5 className="text-center fz-20 mb-10">
                  Sign up for Paperhood
                </h5>
                <div className="sign__form">
                  <form onSubmit={handleSubmit}>
                    <div className="sign__input-wrapper mb-10">
                      <h5>Full Name</h5>
                      <div className="sign__input">
                        <input
                          required
                          type="text"
                          placeholder="Full name"
                          onChange={(e) =>
                            setUserData({ ...userData, name: e.target.value })
                          }
                        />
                        <i className="fas fa-user"></i>
                      </div>
                    </div>
                    <div className="d-flex passContainer mob-flex-col">
                      <div className="sign__input-wrapper mb-10 password-input_wrapper">
                        <h5>Mobile Number</h5>
                        <div className="sign__input">
                          <input
                            required
                            type="text"
                            placeholder="Mobile Number"
                            pattern={phoneRegExp}
                            onChange={(e) =>
                              setUserData({
                                ...userData,
                                mobile: e.target.value,
                              })
                            }
                          />
                          <i className="fas fa-phone"></i>
                        </div>
                      </div>
                      <div className="sign__input-wrapper mb-10 password-input_wrapper">
                        <h5>E-mail</h5>
                        <div className="sign__input">
                          <input
                            required
                            type="email"
                            placeholder="E-mail Address"
                            onChange={(e) =>
                              setUserData({
                                ...userData,
                                email: e.target.value,
                              })
                            }
                          />
                          <i className="fas fa-envelope"></i>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex passContainer mob-flex-col">
                      <div className="sign__input-wrapper mb-10 password-input_wrapper">
                        <h5>Password</h5>
                        <div className="sign__input">
                          <input
                            required
                            type="password"
                            placeholder="Password"
                            onChange={(e) =>
                              setUserData({
                                ...userData,
                                password: e.target.value,
                              })
                            }
                          />
                          <i className="fas fa-lock"></i>
                        </div>
                      </div>
                      <div className="sign__input-wrapper mb-10 password-input_wrapper">
                        <h5>Re-Password</h5>
                        <div className="sign__input">
                          <input
                            required
                            type="password"
                            placeholder="Re-Password"
                            onChange={(e) =>
                              setUserData({
                                ...userData,
                                cf_password: e.target.value,
                              })
                            }
                          />
                          <i className="fas fa-lock"></i>
                        </div>
                      </div>
                    </div>
                    <div className="sign__action d-flex justify-content-between mb-30">
                      <div className="sign__agree d-flex align-items-center mt-10">
                        <input
                          required
                          className="m-check-input"
                          type="checkbox"
                          id="m-agree"
                        />
                        <label className="m-check-label" htmlFor="m-agree">
                          I agree to the{"  "}
                          <a href="#"> Terms & Conditions</a>
                        </label>
                      </div>
                    </div>
                    <button type="submit" className="m-btn m-btn-4 w-100">
                      {" "}
                      <span></span> Sign Up
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
