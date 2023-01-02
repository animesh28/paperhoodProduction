/* eslint-disable @next/next/no-css-tags */
import Head from "next/head";
import {
  Calculator,
  CouponMenu,
  Coupons,
  Customers,
  Dashboard,
  Dropdown,
  Help,
  Inventory,
  Logout,
  MyAccount,
  Orders,
  Payment,
  Reports,
  Revenue,
  Sales,
  Search,
  Seller,
  SettingsGear,
  Staff,
} from "../components/AllSvgs";
import Cookie from "js-cookie";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@mui/material";
import AccountMenu from "../common/AvatarMenu";
import Modal from "../components/Modal";
import { useContext } from "react";
import { DataContext } from "../store/GlobalState";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { success } from "../components/Notify";

const DashboardLayout = ({ children }) => {
  const [state, dispatch] = useContext(DataContext);
  const { auth } = state;
  const router = useRouter();

  const handleLogout = () => {
    dispatch({ type: "NOTIFY", payload: { loading: true } });
    Cookie.remove("refreshtoken", { path: "api/auth/accessToken" });
    localStorage.removeItem("firstLogin");
    dispatch({ type: "AUTH", payload: {} });
    dispatch({ type: "NOTIFY", payload: { loading: false } });
    success("Logged out!");
    return router.push("/");
  };

  const options = [
    {
      name: "Users",
      icon: <Staff />,
      link: "/users",
      roles: [
        { role: "admin", root: true },
        { role: "op", root: false },
      ],
    },
    {
      name: "My Book(s)",
      icon: <Inventory />,
      link: "/my-books",
      roles: [
        { role: "admin", root: false },
        { role: "seller", root: false },
      ],
    },
    {
      name: "Approve Listing",
      icon: <Inventory />,
      link: "/approve-list",
      roles: [
        { role: "admin", root: true },
        { role: "op", root: false },
      ],
    },
    {
      name: "Add Book",
      icon: <Inventory />,
      link: "/create/[[...id]]",
      roles: [{ role: "admin", root: false }],
    },
    {
      name: "Orders",
      icon: <Orders />,
      link: "/orders",
      roles: [
        { role: "admin", root: false },
        { role: "admin", root: true },
        { role: "op", root: false },
        { role: "user", root: false },
      ],
    },
    {
      name: "Sales / Analytics",
      icon: <Sales />,
      link: "/sales",
      roles: [
        { role: "admin", root: false },
        { role: "admin", root: true },
      ],
    },
    {
      name: "Coupons",
      icon: <CouponMenu style={{ fill: "#fff" }} />,
      link: "/coupons",
      roles: [
        { role: "admin", root: false },
        { role: "admin", root: true },
        { role: "op", root: false },
      ],
    },
    {
      name: "Calculator",
      icon: (
        <Calculator style={{ width: "24px", height: "24px", fill: "#fff" }} />
      ),
      link: "/calculatorDashboard",
      roles: [{ role: "seller", root: false }],
    },
    {
      name: "Reports",
      icon: <Reports style={{ fill: "#fff" }} />,
      link: "/reports",
      roles: [
        { role: "admin", root: false },
        { role: "admin", root: true },
        { role: "op", root: false },
        { role: "print", root: false },
      ],
    },

    {
      name: "Categories",
      icon: <Coupons />,
      link: "/categories",
      roles: [
        { role: "admin", root: false },
        { role: "op", root: false },
      ],
    },
  ];

  const addOns = [
    {
      name: "HelpDesk",
      icon: <Help style={{ fill: "#fff" }} />,
      link: "/help",
      roles: [
        { role: "admin", root: false },
        { role: "admin", root: true },
        { role: "op", root: false },
        { role: "print", root: false },
      ],
    },
    {
      name: "HelpDesk Manager",
      icon: <Help style={{ fill: "#fff" }} />,
      link: "/help/manager",
      roles: [
        { role: "admin", root: true },
        { role: "op", root: false },
      ],
    },
    {
      name: "My Account",
      icon: <MyAccount style={{ fill: "#fff" }} />,
      link: "/my-account",
      roles: [
        { role: "admin", root: false },
        { role: "admin", root: true },
        { role: "op", root: false },
        { role: "print", root: false },
        { role: "seller", root: false },
        { role: "user", root: false },
      ],
    },
    {
      name: "Logout",
      icon: <Logout style={{ fill: "#fff" }} />,
      link: "#",
      onClickAction: handleLogout,
      roles: [
        { role: "admin", root: false },
        { role: "admin", root: true },
        { role: "op", root: false },
        { role: "print", root: false },
        { role: "seller", root: false },

        { role: "user", root: false },
      ],
    },
  ];

  const isAllowed = (roles) => {
    let flag = false;

    for (let role of roles) {
      if (role.role === auth.user.role && role.root === auth.user.root) {
        flag = true;
        break;
      }
    }

    return flag;
  };

  const handleActiveItem = (e) => {
    let elem = e.target;
    while (!elem.classList.contains("menu-item")) elem = elem.parentElement;
    router.push(elem.getAttribute("href"));
  };

  useEffect(() => {
    document
      .querySelectorAll(".menu-item")
      .forEach((item) => item.classList.remove("menu-item_active"));

    console.log({ r: router.pathname });
    document.querySelectorAll(".menu-item").forEach((item) => {
      console.log(item.getAttribute("href"));
      if (router.pathname === item.getAttribute("href"))
        item.classList.add("menu-item_active");
    });
  }, []);

  const map = new Map();
  map.set("admintrue", "Super Admin");
  map.set("adminfalse", "Admin");

  return auth.user ? (
    <>
      <Head>
        <link rel="stylesheet" href="/css/plugins.css" />
        <link rel="stylesheet" href="/nft/css/nft.css" />
        <link rel="stylesheet" href="/css/style.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        ></link>
        <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
      </Head>
      <Modal />
      <div className="dashboard_container row">
        <div className="col-lg-2 dashboard_side-panel">
          <div className="logo-section">
            <img src="img/logo_white.png" alt="logo" />
            <div className="user-info">
              <p className="gr-purple-red-text brand">Paperhood</p>
              <span className="user-type">
                {auth.user.role === "admin"
                  ? map.get(auth.user.role + auth.user.root)
                  : auth.user.role_descrip}
              </span>
            </div>
          </div>
          <div className="side-panel_menu">
            {(auth.user.role === "admin" || auth.user.role === "op") && (
              <div
                onClick={handleActiveItem}
                className="menu-item px-3 menu-item_active"
                href="/dashboard"
              >
                <div className="py-3">
                  <span className="mr-10">
                    <Dashboard />
                  </span>
                  <span className="ml-10">Dashboard</span>
                </div>
              </div>
            )}

            {/* {store.map((item, i) => (
              <div onClick={handleActiveItem} className="menu-item px-3">
                <Accordion
                  sx={{ background: "transparent", boxShadow: "none" }}
                >
                  <AccordionSummary
                    expandIcon={<Dropdown />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{ padding: 0 }}
                  >
                    <Typography>
                      {item.icon} {item.name}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Suspendisse malesuada lacus ex, sit amet blandit leo
                      lobortis eget.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </div>
            ))}*/}
            <div className="divider"></div>
            <p className="menu_head px-3 mb-20">Features</p>
            {options.map((item, i) => {
              if (isAllowed(item.roles))
                return (
                  <div
                    href={item.link}
                    onClick={handleActiveItem}
                    className="menu-item px-3"
                  >
                    <div className="py-3">
                      <span className="mr-10">{item.icon}</span>
                      <span className="ml-10">{item.name}</span>
                    </div>
                  </div>
                );
            })}

            <div className="divider"></div>
            {addOns.map((item, i) => {
              if (isAllowed(item.roles))
                return (
                  <div
                    href={item.link}
                    className="menu-item px-3"
                    onClick={
                      item.onClickAction ? item.onClickAction : handleActiveItem
                    }
                  >
                    <div className="py-3">
                      <span className="mr-10">{item.icon}</span>
                      <span className="ml-10">{item.name}</span>
                    </div>
                  </div>
                );
            })}
            {/*<div className="divider"></div>
            <p className="menu_head px-3 mb-1">Analytics</p>
            {analytics.map((item, i) => (
              <div onClick={handleActiveItem} className="menu-item px-3">
                <Accordion
                  sx={{ background: "transparent", boxShadow: "none" }}
                >
                  <AccordionSummary
                    expandIcon={<Dropdown />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{ padding: 0 }}
                  >
                    <Typography>
                      {item.icon} {item.name}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Suspendisse malesuada lacus ex, sit amet blandit leo
                      lobortis eget.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </div>
            ))}*/}
          </div>
        </div>
        <div className="col-lg-10 px-4 py-4 content-side">
          <div className="util-area">
            <div className="search-dashboard">
              <input type="text" placeholder="Search" />
              <Search />
            </div>
            <div className="d-flex align-items-center">
              <AccountMenu />
              <span className="mx-3">
                Hello {auth && auth.user ? auth.user.name : ""}
              </span>
            </div>
          </div>
          {children}
        </div>
      </div>
    </>
  ) : null;
};

export default DashboardLayout;
