import { useEffect } from "react";
import Link from "next/link";

const StickyBar = () => {
  useEffect(() => {
    const sticky_bar = document.querySelector(".sticky-bar");
    if (window.pageYOffset > 600) {
      sticky_bar.classList.add("active");
    } else {
      sticky_bar.classList.remove("active");
    }

    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 600) {
        sticky_bar.classList.add("active");
      } else {
        sticky_bar.classList.remove("active");
      }
    });
  }, []);

  return (
    <div className="sticky-bar">
      <div className="left-bar">
        <Link href="/contact">
          <a className="contact-butn">
            <span>Contact Us</span>
            <span className="icon ml-10">
              <i className="far fa-comment"></i>
            </span>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default StickyBar;
