import Link from "next/link";
import { useState, useContext } from "react";
import { DataContext } from "../../store/GlobalState";
import { error, success } from "../../components/Notify";
import MainLayout from "../../layouts/main-light";
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
    <MainLayout defaultLogoTheme="dark" defaultTheme="dark">
      <section className="signup__area po-rel-z1 pt-100 pb-145 mb-50">
        <div className="sign__shape">
          <img className="man-1" src="img/sign/man-3.png" alt="" />
          <img className="man-2 man-22" src="img/sign/man-2.png" alt="" />
          <img className="circle" src="img/sign/circle.png" alt="" />
          <img className="zigzag" src="img/sign/zigzag.png" alt="" />
          <img className="dot" src="img/sign/dot.png" alt="" />
          <img className="bg" src="img/sign/sign-up.png" alt="" />
          <img className="flower" src="img/sign/flower.png" alt="" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-xxl-8 offset-xxl-2 col-xl-8 offset-xl-2">
              <div className="page__title-wrapper text-center mb-55">
                <h2 className="page__title-2">Create a Account</h2>
                <p>{"Start Your Paperhood Journey."}</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xxl-6 offset-xxl-3 col-xl-6 offset-xl-3 col-lg-8 offset-lg-2">
              <div className="sign__wrapper white-bg">
                <div className="sign__form">
                  <form onSubmit={handleSubmit}>
                    <div className="sign__input-wrapper mb-25">
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
                    <div className="sign__input-wrapper mb-25">
                      <h5>Mobile Number</h5>
                      <div className="sign__input">
                        <input
                          required
                          type="text"
                          placeholder="Mobile Number"
                          pattern={phoneRegExp}
                          onChange={(e) =>
                            setUserData({ ...userData, mobile: e.target.value })
                          }
                        />
                        <i className="fas fa-phone"></i>
                      </div>
                    </div>
                    <div className="sign__input-wrapper mb-25">
                      <h5>E-mail</h5>
                      <div className="sign__input">
                        <input
                          required
                          type="email"
                          placeholder="E-mail Address"
                          onChange={(e) =>
                            setUserData({ ...userData, email: e.target.value })
                          }
                        />
                        <i className="fas fa-envelope"></i>
                      </div>
                    </div>
                    <div className="sign__input-wrapper mb-25">
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
                    <div className="sign__input-wrapper mb-10">
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
                    <div className="sign__new text-center mt-20">
                      <p>
                        Already in Paperhood ?{" "}
                        <Link href="/login">
                          <a> Sign In</a>
                        </Link>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default SignUp;
