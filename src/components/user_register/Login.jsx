import Link from "next/link";
import React, { useState, useContext, useEffect } from "react";
import { DataContext } from "../../store/GlobalState";
import { postData } from "../../server_utils/fetchData";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import { error, success } from "../Notify";

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
    if (Object.keys(auth).length !== 0) {
      if (auth.user.role === "user") router.push("/books");
      else router.push("/my-account");
    }
  }, [auth]);

  // handleForgotPassword
  const handleForgotPassword = () => {
    passwordResetEmail(email);
  };
  return (
    <>
      <section className="signup__area po-rel-z1 pt-100 pb-145 max-wid">
        <div className="container d-flex justify-content-center mob-pad">
          <div className="row desk-width">
            <div className="col-xxl-12 col-xl-12 col-lg-12">
              <div className="sign__wrapper white-bg">
                <div className="sign__form">
                  <h5 className="text-center fz-20">Already a user? Login</h5>
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

export default LoginArea;
