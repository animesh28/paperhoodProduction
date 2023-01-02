/* eslint-disable @next/next/no-css-tags */
import { useEffect } from "react";
import Head from "next/head";
//= Layout
import MainLightLayout from "../../layouts/main-light";
//= Components
import StickyBar from "../../components/StickyBar";
import FixedSearch from "../../components/FixedSearch";
import Header from "../../components/TextHeader";
import About from "../../components/AboutUs";
import Numbers from "../../components/Numbers";
import Team from "../../components/Team";
import Skills from "../../components/CreativeSkills";
import Services from "../../components/AboutServices";
import Clients from "../../components/Clients";
import CallAction from "../../components/CallAction";
import Footer from "../../components/FooterNew";
import OurJourneyToDreams from "../../components/About";

const AboutCreative = () => {
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
        <title>Paperhood - About Us</title>
      </Head>

      <MainLightLayout defaultTheme="dark" defaultLogoTheme="dark">
        <StickyBar />
        <FixedSearch />
        <Header title="About Us." />
        <main className="main-content">
          <About />
          <OurJourneyToDreams />
          <Numbers />
          <Team />
          <Skills />
          <Services />
          <Clients pt={true} />
          <CallAction />
          <Footer />
        </main>
      </MainLightLayout>
    </>
  );
};

export default AboutCreative;
