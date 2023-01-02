/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { useState, useEffect, useContext } from "react";
import { DataContext } from "../../../store/GlobalState";
import { addToCart } from "../../../store/Actions";

const NFTCard = ({ data, countdown, sales = false }) => {
  const [state, dispatch] = useContext(DataContext);
  const { cart, auth } = state;
  const [dataImg, setDataImg] = useState();

  const userLink = () => {
    return (
      <div className="d-flex right ml-auto">
        <div className="bid mr-10">
          <Link href={`/product/${data._id}`}>View</Link>
        </div>
        <div className="bid" onClick={() => dispatch(addToCart(data, cart))}>
          <a href="#0">Buy</a>
        </div>
      </div>
    );
  };

  const adminLink = () => {
    return (
      <div className="d-flex right ml-auto">
        <div className="bid mr-10">
          <Link href={`create/${data._id}`}>Edit</Link>
        </div>
        <div
          className="bid"
          onClick={() => {
            dispatch({
              type: "ADD_MODAL",
              payload: [
                {
                  data: "",
                  id: data._id,
                  title: data.title,
                  type: "DELETE_PRODUCT",
                },
              ],
            });

            document.querySelector("#open-modal").click();
          }}
        >
          <a href="#0">Delete</a>
        </div>
      </div>
    );
  };

  const salesAnalytics = () => {
    return (
      <div className="fz-13 opacity-7 w-100">
        <div className="d-flex justify-content-between ">
          <span>Sold: {data.sold}</span>
          <span>Printing Cost: ₹ {data.printing_price}</span>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (data && data.images && data.images[0]) setDataImg(data.images[0].url);
  }, [data]);

  return (
    <div
      className={`col-lg-3 col-md-6 ${!countdown ? "mt-30" : ""}`}
      id={`${data._id}`}
    >
      <div className="item-card md-mb50">
        <div className="img">
          <a href="#0">
            <img src={dataImg} alt="" />
          </a>
          {countdown ? (
            <div
              className="clockdiv"
              style={{
                fontWeight: "600",
                color: "#f3f7f8",
                background: "rgba(0,0,0,0.5)",
              }}
            >
              Limited Period Offer{" "}
              <i className="fas fa-clock" style={{ color: "#f3f7f8" }}></i>
            </div>
          ) : null}
        </div>
        <div className="cont">
          <div className="info">
            <div className="item-title mt-15">
              <h6 className="fw-700">
                <a href="#0">{data.title}</a>
              </h6>
            </div>
            <div className="eth mt-10">
              <span className="fz-14">
                <span className="fz-12 opacity-7 mr-5">Price :</span>

                <span>₹ {data.price}</span>
              </span>
            </div>
          </div>
          <div className="botm flex">
            {sales
              ? salesAnalytics()
              : !auth.user || auth.user.role !== "admin"
              ? userLink()
              : adminLink()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
