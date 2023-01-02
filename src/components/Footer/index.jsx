import React from "react";
import Link from "next/link";

function FooterDesktop() {
  return (
    <section id="footer">
      <div className="container">
        <div className="row text-center text-xs-center text-sm-left text-md-left">
          <div className="col-xs-12 col-sm-3 col-md-3">
            <h5>The Company</h5>
            <ul className="list-unstyled quick-links pl-50">
              <li>
                <Link href="/home">
                  <div>
                    <i className="fa fa-angle-double-right"></i> Home
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <div>
                    <i className="fa fa-angle-double-right"></i> About
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/privacy">
                  <div>
                    <i className="fa fa-angle-double-right"></i> Privacy Policy
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/terms">
                  <div>
                    <i className="fa fa-angle-double-right"></i> Terms &
                    Conditions
                  </div>
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-xs-12 col-sm-3 col-md-3">
            <h5>Writers</h5>
            <ul className="list-unstyled quick-links second pl-50">
              <li>
                <Link href="/calculator">
                  <div>
                    <i className="fa fa-angle-double-right"></i> Royalty
                    calculator
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/register">
                  <div>
                    <i className="fa fa-angle-double-right"></i> Register
                  </div>
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-xs-12 col-sm-3 col-md-3">
            <h5>Buyers</h5>
            <ul className="list-unstyled quick-links second pl-50">
              <li>
                <Link href="/books">
                  <div>
                    <i className="fa fa-angle-double-right"></i> Books
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/shipping">
                  <div>
                    <i className="fa fa-angle-double-right"></i> Shipping Policy
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/refund">
                  <div>
                    <i className="fa fa-angle-double-right"></i> Refund Policy
                  </div>
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-xs-12 col-sm-3 col-md-3">
            <h5>Office Address</h5>
            <p className="text-left ml-30">
              Office Address - Plot No D222, 20, Shiravane, Nerul, Navi Mumbai,
              Maharashtra 400706
            </p>
            <h5 className="mt-20">Contact Support</h5>
            <p className="text-left ml-30">
              <a href="mailto:mail@paperhood.in">mail@paperhood.in</a>
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-5">
            <ul className="list-unstyled list-inline social text-center">
              <li className="list-inline-item">
                <a href="#;">
                  <i className="fab fa-facebook"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#;">
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#;" target="_blank">
                  <i className="fa fa-envelope"></i>
                </a>
              </li>
            </ul>
          </div>
          <hr />
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 mt-sm-2 text-center text-white mb-4">
            <p>© 2022 Paperhood is Proudly Powered by Webalar</p>
          </div>
          <hr />
        </div>
      </div>
    </section>
  );
}

export default FooterDesktop;
