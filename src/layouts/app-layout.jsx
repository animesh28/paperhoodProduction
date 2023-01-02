/* eslint-disable @next/next/no-css-tags */
import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Notify from "../components/Notify";
import Modal from "../components/Modal";

//= Components

const AppLayout = ({
  children,
  links,
  type,
  defaultTheme,
  defaultLogoTheme,
  shopPage = false,
}) => {
  const [theme] = useState("light");
  const [logoTheme, setLogoTheme] = useState("light");
  const navbarRef = useRef(null);

  return (
    <>
      <Head>
        <link rel="stylesheet" href="/css/plugins.css" />
        <link rel="stylesheet" href="/css/style.css" />
        {type === "mobile-app" ? (
          <link rel="stylesheet" href="/mobile-app/css/mobile-app.css" />
        ) : null}
        {type === "architecture" ? (
          <link rel="stylesheet" href="/arch/css/arch-style.css" />
        ) : null}
        {type === "nft-market" ? (
          <link rel="stylesheet" href="/nft/css/nft.css" />
        ) : null}
        {type === "freelancer" ? (
          <link rel="stylesheet" href="/freelancer/css/freelancer-style.css" />
        ) : null}
        {type === "restaurant" ? (
          <link rel="stylesheet" href="/restaurant/css/restaurant-style.css" />
        ) : null}
      </Head>

      {["freelancer", "restaurant", "architecture"].includes(type) ? (
        <>
          {/* Page Components */}
          <Navbar
            navbarRef={navbarRef}
            theme={defaultTheme ? defaultTheme : theme}
            logoTheme={defaultLogoTheme ? defaultLogoTheme : logoTheme}
          />
          {children}
        </>
      ) : (
        <>
          <main>
            {/* Page Components */}
            <Modal />
            <Notify />
            <Navbar
              navbarRef={navbarRef}
              theme={defaultTheme ? defaultTheme : theme}
              logoTheme={defaultLogoTheme ? defaultLogoTheme : logoTheme}
              shopPage={shopPage}
            />
            {children}
          </main>
        </>
      )}
    </>
  );
};

export default AppLayout;
