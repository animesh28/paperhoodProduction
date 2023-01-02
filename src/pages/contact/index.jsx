/* eslint-disable @next/next/no-css-tags */
import { useEffect } from "react";
import Head from "next/head";
//= Layout
import MainLightLayout from "../../layouts/main-light";
//= Components
import StickyBar from "../../components/StickyBar";
import FixedSearch from "../../components/FixedSearch";
import Header from "../../components/TextHeader";
import Contact from "../../components/Contact";
import Footer from "../../components/FooterNew";

const ContactPage = () => {
  useEffect(() => {
    document.body.classList.add("cr-agency");

    const removeClasses = [
      "land-demo2",
      "index-corporate",
      "index-restaurant",
      "index-arch",
      "index-freelancer",
      "index-bus1",
      "index-main",
      "mobile-app",
      "gr-orange-bg",
      "nft-market",
    ];

    document.body.classList.remove(...removeClasses);
  }, []);

  return (
    <>
      <Head>
        <title>Paperhood - Contact</title>
      </Head>

      <MainLightLayout defaultTheme="dark" defaultLogoTheme="dark">
        <StickyBar />
        <FixedSearch />
        <Header title="Contact Us." />
        <main className="main-content">
          <Contact />
          <Footer />
        </main>
      </MainLightLayout>
    </>
  );
};

export default ContactPage;
