import React from "react";
import MainLayout from "../../layouts/main-light";
import LoginArea from "../../components/user_register/Login";
import Register from "../../components/user_register/Register";

function Join() {
  return (
    <MainLayout defaultLogoTheme="dark" defaultTheme="dark">
      <div className="row align-items-center desk-max">
        <div className="col-lg-5 col-md-12 col-sm-12 mob-pad">
          <LoginArea />
        </div>
        <div className="col-lg-7 col-md-12 col-sm-12 mob-pad">
          <Register />
        </div>
      </div>
    </MainLayout>
  );
}

export default Join;
