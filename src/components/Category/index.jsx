import { useState, useEffect, useRef, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Autoplay } from "swiper";
import services from "../../data/mobile-app/services.json";

import "swiper/css/pagination";
import { DataContext } from "../../store/GlobalState";
import Link from "next/link";

SwiperCore.use([Pagination, Autoplay]);

const Category = () => {
  const [state, dispatch] = useContext(DataContext);
  const { categories } = state;
  const [load, setLoad] = useState(true);
  const paginationRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      setLoad(false);

      let contianer = document.querySelector(
        ".services-carsouel .swiper-container"
      );
      if (contianer) contianer.appendChild(paginationRef.current);

      document
        .querySelector(".services-carsouel .swiper-wrapper")
        .classList.add("pb-40");
    });
  }, []);
  return (
    <section
      className="services-carsouel py-5 sub-bg anim-pagination"
      data-scroll-index="2"
    >
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-9 d-flex justify-content-center text-center mb-40">
            <div className="simple-head">
              <div>
                <h6 className="sub-head radius mb-20">
                  <span className="fz-12 ls2 text-u">Diversity</span>
                </h6>
              </div>
              <h2 className="fz-40 fw-800 gr-purple-red-text inline">
                Disover Categories
              </h2>
            </div>
          </div>
        </div>
        {!load ? (
          <Swiper
            className="swiper-container"
            id="content-carousel-container-unq-2"
            spaceBetween={0}
            slidesPerView={7}
            loop={true}
            centeredSlides={true}
            autoplay={true}
            speed={1000}
            pagination={{
              clickable: true,
              renderBullet: function (index, className) {
                return (
                  '<span className="' +
                  className +
                  '">' +
                  '<svg className="fp-arc-loader" width="16" height="16" viewBox="0 0 16 16">' +
                  '<circle className="path" cx="8" cy="8" r="5.5" fill="none" transform="rotate(-90 8 8)" stroke="#FFF"' +
                  'stroke-opacity="1" stroke-width="1px"></circle>' +
                  '<circle cx="8" cy="8" r="3" fill="#FFF"></circle>' +
                  "</svg></span>"
                );
              },
            }}
            onBeforeInit={(swiper) => {
              swiper.params.pagination.el = paginationRef.current;
            }}
            onSwiper={(swiper) => {
              setTimeout(() => {
                swiper.params.pagination.el = paginationRef.current;
                swiper.pagination.destroy();
                swiper.pagination.init();
                swiper.pagination.update();
              });
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 3.5,
              },
              1024: {
                slidesPerView: 7,
              },
            }}
          >
            {categories &&
              categories.map((item, idx) => (
                <SwiperSlide key={idx}>
                  <Link href={`/books?search=all&category=${item._id}`}>
                    <div
                      className="item text-center"
                      style={{
                        background: `url(${item?.image})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: `center center`,
                      }}
                    >
                      <h6 className="mb-10 cat-head">
                        <img
                          src={item.icon}
                          style={{
                            width: "30px",
                            height: "30px",
                            filter: "brightness(0) invert(1)",
                          }}
                        />
                        &nbsp;&nbsp;&nbsp;
                        {item.name}
                      </h6>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
          </Swiper>
        ) : null}
        <div className="swiper-pagination" ref={paginationRef}></div>
      </div>
    </section>
  );
};

export default Category;
