import Link from "next/link";
import React, { useState, useContext, useEffect } from "react";
import { DataContext } from "../../store/GlobalState";
import { postData } from "../../server_utils/fetchData";
import MainLayout from "../../layouts/main-light";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import { error, success } from "../../components/Notify";

const LoginArea = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, dispatch] = useContext(DataContext);
  const { auth } = state;
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "NOTIFY", payload: { loading: true } });

    const res = await postData("auth/login", { email, password });
    dispatch({ type: "NOTIFY", payload: { loading: false } });

    if (res.err) {
      return error(res.err);
    }
    success(res.msg);

    dispatch({
      type: "AUTH",
      payload: {
        token: res.access_token,
        user: res.user,
      },
    });

    Cookie.set("refreshtoken", res.refresh_token, {
      path: "api/auth/accessToken",
      expires: 7,
    });

    localStorage.setItem("firstLogin", true);
  };

  useEffect(() => {
    if (Object.keys(auth).length !== 0) router.push("/");
  }, [auth]);

  // handleForgotPassword
  const handleForgotPassword = () => {
    passwordResetEmail(email);
  };
  return (
    <MainLayout defaultLogoTheme="dark" defaultTheme="dark">
      <section className="signup__area po-rel-z1 pt-100 pb-145">
        <div className="sign__shape">
          <img className="man-1" src="img/sign/man-1.png" alt="" />
          <img className="man-2" src="img/sign/man-2.png" alt="" />
          <img className="circle" src="img/sign/circle.png" alt="" />
          <img className="zigzag" src="img/sign/zigzag.png" alt="" />
          <img className="dot" src="img/sign/dot.png" alt="" />
          <img className="bg" src="img/sign/sign-up.png" alt="" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-xxl-8 offset-xxl-2 col-xl-8 offset-xl-2">
              <div className="page__title-wrapper text-center mb-55">
                <h2 className="page__title-2">
                  Sign in <br />
                </h2>
                <p>
                  it you do not have an account you can{" "}
                  <a href="#">Register here!</a>
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xxl-6 offset-xxl-3 col-xl-6 offset-xl-3 col-lg-8 offset-lg-2">
              <div className="sign__wrapper white-bg">
                <div className="sign__header mb-35"></div>
                <div className="sign__form">
                  <form onSubmit={onSubmit}>
                    <div className="sign__input-wrapper mb-25">
                      <h5>E-mail</h5>
                      <div className="sign__input">
                        <input
                          required
                          onChange={(e) => setEmail(e.target.value)}
                          type="email"
                          placeholder="E-mail Address"
                        />
                        <i className="fas fa-envelope"></i>
                      </div>
                    </div>
                    <div className="sign__input-wrapper mb-10">
                      <h5>Password</h5>
                      <div className="sign__input">
                        <input
                          required
                          type="password"
                          placeholder="Password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <i className="fas fa-lock"></i>
                      </div>
                    </div>
                    <div className="sign__action d-sm-flex justify-content-between mb-30">
                      <div className="sign__forgot">
                        <button
                          style={{
                            cursor: "pointer",
                            background: "transparent",
                          }}
                        >
                          Forgot your password?
                        </button>
                      </div>
                    </div>
                    <button type="submit" className="m-btn m-btn-4 w-100">
                      {" "}
                      <span></span> Sign In
                    </button>
                    <div className="sign__new text-center mt-20">
                      <p>
                        New to Paperhood?{" "}
                        <Link href="/sign-up">
                          <a>Sign Up</a>
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

export default LoginArea;
