import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Autoplay } from "swiper";
import testimonials from "../../data/business/testimonials.json";

import "swiper/css/pagination";

SwiperCore.use([Pagination, Autoplay]);

const Testimonials = () => {
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
      className="services-carsouel section-padding sub-bg anim-pagination"
      data-scroll-index="2"
    >
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-9 d-flex justify-content-center text-center mb-40">
            <div className="simple-head">
              <div>
                <h6 className="sub-head radius mb-20">
                  <span className="fz-12 ls2 text-u">Testimonials</span>
                </h6>
              </div>
              <h2 className="fz-40 fw-800 gr-purple-red-text inline">
                Feedback From Our Clients
              </h2>
            </div>
          </div>
        </div>
        {!load ? (
          <Swiper
            className="swiper-container swiper-container_test"
            id="content-carousel-container-unq-2"
            spaceBetween={0}
            slidesPerView={3}
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
                slidesPerView: 1,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
          >
            {testimonials.galleryTop.map((item, idx) => (
              <SwiperSlide key={idx}>
                <div className="item item-test flex-column text-center">
                  <img
                    src={testimonials.galleryThumbs[idx]}
                    alt="dp"
                    className="item-test_img"
                  />
                  <h5>{item.author.name}</h5>
                  <span>{item.author.position}</span>
                  <br />
                  <p>{item.content}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : null}
        <div className="swiper-pagination" ref={paginationRef}></div>
      </div>
    </section>
  );
};

export default Testimonials;
