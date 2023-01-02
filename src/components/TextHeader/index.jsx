import React from "react";

const Header = ({ title }) => {
  return (
    <header className="pg-header-sipm gr-purple-light-bg to-up valign aboutUsHeader">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div className="caption text-center">
              <h1 className="fz-60">{title}</h1>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
