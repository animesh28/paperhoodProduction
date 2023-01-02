/* eslint-disable @next/next/no-img-element */
import NFTCard from "../NFT-Card";
import features from "../../../data/nfts/features.json";
import { useEffect, useState } from "react";
import BookCover from "../../BookCover";

const Features = ({ productList }) => {
  return (
    <section className="feat-card section-padding" data-scroll-index="1">
      <div className="container">
        <div className="sec-head-bord mb-50">
          <div className="container">
            <div className="row">
              <div className="col-md-8 rest">
                <div className="sec-head">
                  <h4 className="fw-800">
                    <span className="icon">
                      <i className="fas fa-fire"></i>
                    </span>{" "}
                    Best <span className="gr-purple-red-text">Seller</span>
                  </h4>
                </div>
              </div>
              <div className="col-md-4"></div>
            </div>
          </div>
        </div>
        <div className="row">
          {productList &&
            productList
              .filter((item) => item.category === "featured")
              .map((feature, i) => (
                <BookCover data={feature} key={i} countdown={true} />
              ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
