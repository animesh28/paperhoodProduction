/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useEffect, useContext } from "react";
import AccountMenu from "../../common/AvatarMenu";
import { Avatar, Cart } from "../AllSvgs";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";
import { DataContext } from "../../store/GlobalState";
import Cookie from "js-cookie";
import { Button } from "@mui/material";
import CartDrawer from "./cart";
import { useState } from "react";
import filterSearch from "../../server_utils/filterSearch";

const Navbar = ({
  navbarRef,
  theme,
  logoTheme,
  posAbs,
  registerPageNav = false,
  shopPage = false,
}) => {
  const router = useRouter();
  const [state, dispatch] = useContext(DataContext);
  const { auth, cart } = state;
  const [search, setSearch] = useState("");

  const dropdownHover = (e) => {
    const dropdownItem =
      e.target.tagName === "SPAN" ? e.target.parentElement : e.target;
    const dropdownMenu = dropdownItem.querySelector(".dropdown-menu");
    if (dropdownMenu) dropdownMenu.classList.add("show");
  };

  const dropdownLeave = () => {
    const openedDropdown = document.querySelector(
      ".navbar .dropdown-menu.show"
    );
    if (openedDropdown) openedDropdown.classList.remove("show");
  };
  const fillColor = theme === "dark" ? "#000" : "#fff";

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        document
          .querySelector(".logo img")
          .setAttribute("src", "img/logo_black.png");
      } else {
        if (logoTheme === "dark") {
          document
            .querySelector(".logo img")
            .setAttribute("src", "img/logo_black.png");
        } else {
          document
            .querySelector(".logo img")
            .setAttribute("src", "img/logo_white.png");
        }
      }
    });
  }, []);

  useEffect(() => {
    filterSearch({ router, search: search ? search.toLowerCase() : "all" });
  }, [search]);

  return (
    <nav
      className={`navbar navbar-expand-lg ${theme} ${
        posAbs ? "position-absolute" : ""
      } position-fixed`}
      style={{ background: "#fff" }}
      ref={navbarRef}
    >
      <div className="container-fluid pr-50 pl-50 py-2 mobile-padding">
        <Link className="navbar-brand" href="/">
          <div className="logo">
            {logoTheme === "dark" && (
              <img
                src="img/logo_black.png"
                alt=""
                style={{ height: "46px", width: "40px" }}
              />
            )}
            {logoTheme === "light" && (
              <img
                src="img/logo_white.png"
                alt=""
                style={{ height: "46px", width: "40px" }}
              />
            )}
            {!logoTheme && (
              <img
                src="img/logo_black.png"
                alt=""
                style={{ height: "46px", width: "40px" }}
              />
            )}
          </div>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="topNav_container">
            <form
              className="card card-sm"
              style={{
                border: "0px solid transparent",
                background: "transparent",
              }}
            >
              <div className="card-body row no-gutters align-items-center p-0">
                <div
                  className="col p-0"
                  style={{ background: "#fff", borderRadius: "16px" }}
                >
                  <input
                    className="form-control form-control-lg form-control-borderless"
                    type="search"
                    placeholder="Search"
                    style={{ background: "rgba(0,0,0,.1)" }}
                    value={search.toLowerCase()}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
            </form>
          </div>
          {!registerPageNav ? (
            <>
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <span className="nav-link" role="button">
                    <Link href="/home">Home</Link>
                  </span>
                </li>
                <li className="nav-item dropdown">
                  <span className="nav-link" role="button">
                    <Link href="/register">Register</Link>
                  </span>
                </li>
                <li className="nav-item dropdown">
                  <span className="nav-link" role="button">
                    <Link href="/calculator">Calculator</Link>
                  </span>
                </li>
                <li className="nav-item dropdown">
                  <span className="nav-link" role="button">
                    <Link href="/books">Books</Link>
                  </span>
                </li>
              </ul>

              <div className="social">
                <ul className="rest">
                  <li className="d-flex justify-content-center align-items-center">
                    <Link href="/home">
                      <CartDrawer />
                    </Link>
                    <Link href="/home">
                      {Object.keys(auth).length === 0 ? (
                        <Link href="/join">
                          <Button
                            variant="contained"
                            className="ml-10"
                            sx={{ background: "#0d9db8", color: "#fff" }}
                          >
                            Login / Register
                          </Button>
                        </Link>
                      ) : (
                        <AccountMenu />
                      )}
                    </Link>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <span className="nav-link" role="button">
                  <Link href="/home">
                    <div className="sub-head radius sub-head_header">Home</div>
                  </Link>
                </span>
              </li>
              <li className="nav-item dropdown">
                <span className="nav-link" role="button">
                  <Link href="#getStarted">
                    <div className="sub-head radius sub-head_header">
                      Start Selling
                    </div>
                  </Link>
                </span>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
