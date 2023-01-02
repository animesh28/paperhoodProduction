/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import coll from "../../data/nfts/collection.json";
import homeColl from "../../data/nfts/homeCollection.json";
import { getData } from "../../server_utils/fetchData";

const Collection = ({ loc, blackHead = "Combo", gradiantHead = "Offers" }) => {
  const collections = loc === "home" ? homeColl : coll;
  const pad = loc === "home" ? "pt-0" : "";
  return (
    <section
      className={`collection-box section-padding ${pad}`}
      data-scroll-index="4"
    >
      <div className="container">
        <div className="sec-head-bord mb-50">
          <div className="container">
            <div className="row">
              {loc === "home" ? (
                <div className="col-md-12 rest">
                  <div className="simple-head d-flex flex-column align-items-center">
                    <div>
                      <h6 className="sub-head radius mb-20">
                        <span className="fz-12 ls2 text-u">Showcase</span>
                      </h6>
                    </div>
                    <h2 className="fz-40 fw-800 gr-purple-red-text inline">
                      Hand Picked
                    </h2>
                  </div>
                </div>
              ) : (
                <div className="col-md-8 rest">
                  <div className="sec-head">
                    <h4 className="fw-800">
                      <span className="icon">
                        <i className="fas fa-fire"></i>
                      </span>{" "}
                      {blackHead}{" "}
                      <span className="gr-purple-red-text">{gradiantHead}</span>
                    </h4>
                  </div>
                </div>
              )}
              <div className="col-md-4"></div>
            </div>
          </div>
        </div>
        <div className="row">
          {collections.map((collection, idx) => (
            <div className="col-lg-4" key={idx}>
              <div
                className={`coll-item ${
                  idx !== collections.length - 1 ? "md-mb50" : ""
                }`}
              >
                <div className="imgs">
                  <div className="flex">
                    <div className="img">
                      <img src={collection.images[0]} alt="" />
                    </div>
                    <div className="img">
                      <img src={collection.images[1]} alt="" />
                    </div>
                  </div>
                  <div className="img mt-10">
                    <img src={collection.images[2]} alt="" />
                  </div>
                </div>
                <div className="cont">
                  <div className="se-img">
                    <img src={collection.author.image} alt="" />
                    <span className="icon">
                      <i className="fas fa-check"></i>
                    </span>
                  </div>
                  <div className="text flex">
                    <div className="left">
                      <h6>
                        <a href="#0">{collection.title}</a>
                      </h6>
                      <p>
                        Created by : <a href="#0">{collection.author.name}</a>
                      </p>
                    </div>
                    <div className="right ml-auto valign">
                      <div className="item-calc">
                        <span className="fz-12">{collection.items} Items</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collection;
