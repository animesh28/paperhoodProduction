/* eslint-disable @next/next/no-css-tags */
import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import Notify from "../components/Notify";
import Modal from "../components/Modal";

const MainLayout = ({
  children,
  defaultTheme,
  defaultLogoTheme,
  posAbs,
  registerPageNav = false,
}) => {
  const [theme] = useState("light");
  const [logoTheme, setLogoTheme] = useState("dark");
  const navbarRef = useRef(null);

  return (
    <>
      <Head>
        <script
          src="https://kit.fontawesome.com/26fd97d011.js"
          crossorigin="anonymous"
        ></script>
        <link rel="stylesheet" href="/css/plugins.css" />
        <link rel="stylesheet" href="/css/style.css" />
      </Head>
      <Notify />
      <Modal />
      <Navbar
        navbarRef={navbarRef}
        theme={defaultTheme ? defaultTheme : theme}
        logoTheme={defaultLogoTheme ? defaultLogoTheme : logoTheme}
        posAbs={posAbs ? posAbs : false}
        registerPageNav={registerPageNav}
      />
      {children}
      <Loading />
    </>
  );
};

export default MainLayout;
