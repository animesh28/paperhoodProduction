import React, { useState } from "react";

const featureDetails = [
  {
    color: "btn-light-blue",
    data: "Dashboard",
    content:
      "Get Access to Dashboard and Track your Sales, Monitor your Growth, List Book(s), Order Copies in Bulk & Explore Lots of Other options",
    icon: "fas fa-cogs",
    bg: "#27a0df",
    rgb: [39, 160, 223],
  },
  {
    color: "btn-light-orange",
    data: "Order Books in Bulk",
    content:
      "Buy/Order your Copies in Bulk with minimal Printing Cost & Premium Page Quality with customizable options for Printing",
    icon: "fas fa-book",
    bg: "#ef7338",
    rgb: [239, 115, 56],
  },
  {
    color: "btn-blue",
    data: "Payments on-the-go",
    content:
      "Withdraw your Earnings in One-click from the Dashboard to your given Bank Details",
    icon: "fas fa-money-check-alt",
    bg: "#346ada",
    rgb: [52, 106, 218],
  },
  {
    color: "btn-purple",
    data: "Distribution",
    content:
      "Get Orders online for your Book(s) and Let us take care of Printing & Distribution of the Books",
    icon: "fas fa-dolly-flatbed",
    bg: "#4c3cce",
    rgb: [76, 60, 206],
  },
  {
    color: "btn-teal",
    data: "Earn 100% Profits",
    content: "Sell your Books at Minimal Printing Cost and Earn maximum Profit",
    icon: "fas fa-money-bill-wave",
    bg: "#1cc9e4",
    rgb: [28, 201, 228],
  },
  {
    color: "btn-red",
    data: "Sell your Used Books",
    content:
      "Got a Bunch of Old Books? List them at Paperhood & Sell like never before!",
    icon: "fas fa-tags",
    bg: "#ff4b4b",
    rgb: [255, 75, 75],
  },
];

function FeaturesRegister() {
  const [content, setContent] = useState(featureDetails[0].content);
  const [icon, setIcon] = useState(featureDetails[0].icon);

  const handleFeatureChange = (feat) => {
    document.querySelectorAll(".features_btn").forEach((btn) =>
      btn.classList.forEach((cls) => {
        if (cls.startsWith("selected")) {
          btn.classList.remove(cls);
        }
      })
    );

    document
      .querySelector(`.${feat.color}`)
      .classList.add(`selected-${feat.color}`);

    document.querySelector(
      ".iconFeaturesRegiter"
    ).style.background = `linear-gradient(
        90deg,
        rgba(${feat.rgb[0]},${feat.rgb[1]},${feat.rgb[2]}, 0.5) 0%,
        rgba(217, 217, 217, 0.2) 100%
      )`;
    document.querySelector(
      ".contentFeaturesRegiter"
    ).style.background = `linear-gradient(
        90deg,
        rgba(${feat.rgb[0]},${feat.rgb[1]},${feat.rgb[2]}, 0.5) 0%,
        rgba(217, 217, 217, 0) 100%
      )`;

    document.querySelector(
      ".iconFeaturesRegiter"
    ).style.boxShadow = `0 5px 0 0 rgba(${feat.rgb[0]},${feat.rgb[1]},${feat.rgb[2]}, 1),
    0 10px 0 0 rgba(${feat.rgb[0]},${feat.rgb[1]},${feat.rgb[2]}, 0.6), 0 15px 0 0 rgba(${feat.rgb[0]},${feat.rgb[1]},${feat.rgb[2]}, 0.4),
    0 20px 0 0 rgba(${feat.rgb[0]},${feat.rgb[1]},${feat.rgb[2]}, 0.2), 0 25px 0 0 rgba(${feat.rgb[0]},${feat.rgb[1]},${feat.rgb[2]}, 0.1)`;
    document.querySelector(
      ".contentFeaturesRegiter"
    ).style.boxShadow = `5px 5px 0 0 rgba(${feat.rgb[0]},${feat.rgb[1]},${feat.rgb[2]}, 1),
    10px 10px 0 0 rgba(${feat.rgb[0]},${feat.rgb[1]},${feat.rgb[2]}, 0.6), 15px 15px 0 0 rgba(${feat.rgb[0]},${feat.rgb[1]},${feat.rgb[2]}, 0.4),
    20px 20px 0 0 rgba(${feat.rgb[0]},${feat.rgb[1]},${feat.rgb[2]}, 0.2), 25px 25px 0 0 rgba(${feat.rgb[0]},${feat.rgb[1]},${feat.rgb[2]}, 0.1)`;

    setContent(
      featureDetails.filter((feature, i) => feature.color === feat.color)[0]
        .content
    );

    setIcon(
      featureDetails.filter((feature, i) => feature.color === feat.color)[0]
        .icon
    );
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="simple-head text-center mb-50">
            <h6 className="sub-head radius">Our Features</h6>
            <h2 className="fw-800">
              What We <span className="gr-purple-red-text">Offer</span>
            </h2>
          </div>
        </div>
      </div>
      <div
        className="d-flex justify-content-around button-container"
        id="features_btn-container"
      >
        <div className="d-flex justify-content-around button-container w-100">
          {featureDetails.map((feat, i) => (
            <button
              class={`features_btn ${feat.color} ${
                i === 0 ? `selected-${feat.color}` : ""
              }`}
              onClick={() => handleFeatureChange(feat)}
            >
              {feat.data}
            </button>
          ))}
        </div>

        <div className="d-flex align-items-center justify-content-around mt-30">
          <span className={`iconFeaturesRegiter ${icon}`}></span>
          <span className="contentFeaturesRegiter">{content}</span>
        </div>
      </div>
    </div>
  );
}

export default FeaturesRegister;
