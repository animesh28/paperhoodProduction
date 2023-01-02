/* eslint-disable @next/next/no-css-tags */
import { useEffect, useState } from "react";
import Head from "next/head";
//= Layout
import MainLightLayout from "../../layouts/main-light";
//= Components
import StickyBar from "../../components/StickyBar";
import FixedSearch from "../../components/FixedSearch";
import Header from "../../components/RegisterHeader";
import Clients from "../../components/Clients";
import Services from "../../components/Services";
import Skills from "../../components/Skills";
import Footer from "../../components/FooterNew";
import Process from "../../components/Process";
import CreativeSkills from "../../components/CreativeSkills";
import Sell from "../../components/Sell";
import CallAction from "../../components/CallAction";
import Testimonials from "../../components/TestimonialsNew";
import FeaturesRegister from "../../components/FeaturesRegister";
import Contact from "../../components/GetInTouch";
import Hero from "../../components/Hero";

const Home = () => {
  const [mobile, setMobile] = useState();
  let mq;
  useEffect(() => {
    document.body.classList.add("land-demo2");
    mq = window.matchMedia("(max-width: 50em)").matches;
    setMobile(mq);
    const removeClasses = [
      "index-bus1",
      "index-corporate",
      "index-restaurant",
      "index-arch",
      "index-freelancer",
      "cr-agency",
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
        <title>Paperhood - Marketplace for Books</title>
      </Head>

      <MainLightLayout
        defaultLogoTheme="dark"
        defaultTheme="dark"
        registerPageNav={true}
      >
        {/* <StickyBar />
        <FixedSearch /> */}
        <Header
          btnText="Become a Seller"
          registerPage={true}
          headerMain="Become Seller on Paperhood"
          headerSec="Sell your Books with Transparency"
        />
        <Clients />
        <Services />
        {/* <Process /> */}
        <FeaturesRegister />
        <Sell />
        {/* <CreativeSkills /> */}
        {!mobile ? <Skills /> : null}
        {!mobile ? <Hero /> : null}
        <Testimonials />
        <Contact />
        <CallAction />
        <Footer />
      </MainLightLayout>
    </>
  );
};

export default Home;
