/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import React from "react";
import Script from "next/script";
import Head from "next/head";
import ProgressScroll from "../components/Progress-Scroll";
import "../styles/globals.css";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "../common/theme";
import createEmotionCache from "../common/createEmotionCache";
import { DataProvider } from "../store/GlobalState";
import { ToastContainer } from "react-toastify";

const clientSideEmotionCache = createEmotionCache();
function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Paperhood</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>

      <ThemeProvider theme={theme}>
        <DataProvider>
          <CssBaseline />
          <Component {...pageProps} />
          <ToastContainer />
        </DataProvider>
      </ThemeProvider>
      <ProgressScroll />

      <Script
        strategy="beforeInteractive"
        src="/js/bootstrap.bundle.min.js"
      ></Script>
      <Script strategy="beforeInteractive" src="/js/wow.min.js"></Script>
      <Script strategy="beforeInteractive" src="/js/splitting.min.js"></Script>
      <Script
        strategy="beforeInteractive"
        src="/js/simpleParallax.min.js"
      ></Script>
      <Script
        strategy="beforeInteractive"
        src="/js/isotope.pkgd.min.js"
      ></Script>
      <Script
        strategy="beforeInteractive"
        src="/landing-preview/js/parallax.min.js"
      ></Script>
      <Script strategy="lazyOnload" src="/js/main.js"></Script>
    </CacheProvider>
  );
}

export default MyApp;
