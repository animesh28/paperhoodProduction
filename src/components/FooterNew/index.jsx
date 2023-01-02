import { useEffect, useState } from "react";
import Link from "next/link";
import { isMobile } from "react-device-detect";
import FooterDesktop from "../Footer";
import FooterMobile from "../FooterMobile";

function Footer() {
  let mq;

  return !isMobile ? <FooterDesktop /> : <FooterMobile />;
}

export default Footer;
