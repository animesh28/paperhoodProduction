/* eslint-disable @next/next/no-css-tags */
import { useEffect, useState, useRef } from "react";
import Head from "next/head";
//= Layout
import DashboardLayout from "../../layouts/dashboard-layout";
//= Components
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import priceList from "../../data/price.json";
import Header from "../../components/CalculatorHeader";
import { HardCover, Paperback } from "../../components/AllSvgs";
import Testimonials from "../../components/TestimonialsNew";
import Footer from "../../components/FooterNew";
import Process from "../../components/ProcessCalc";

const optNames = [
  "hardCover",
  "jacket",
  '2"x 6" bookmarks- set of 180',
  '2"x 8" bookmarks- set of 180',
];

const Calculator = () => {
  const hardCoverRef = useRef();
  const paperbackRef = useRef();
  const [price, setPrice] = useState(priceList);
  const [page, setPage] = useState("");
  const [colors, setColors] = useState();
  const [weights, setWeights] = useState();
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedWeight, setSelectedWeight] = useState(null);
  const [variant, setVariant] = useState();
  const [noOfPages, setNoOfPages] = useState(0);
  const [noOfBooks, setNoOfBooks] = useState(1);
  const [addOns, setAddOns] = useState({ hardCover: false, jacket: false });
  const [singleBookCost, setSingleBookCost] = useState(0);
  const [customerInfo, setCustomerInfo] = useState({
    name: "Test",
    email: "test@gmail.com",
    contact: "8210118679",
  });
  const [MSP, setMSP] = useState(`₹ 0`);
  const [earning, setEarning] = useState(`₹ 0`);
  const [MRP, setMRP] = useState(0);

  useEffect(() => {
    if (singleBookCost) {
      setMSP(`₹ ${Math.ceil(singleBookCost + 20)}.00`);
    }
  }, [singleBookCost]);

  const handlePageChange = (event) => {
    setPage(event.target.value);
    const colors = [
      ...new Set(event.target.value.variants.map((p, i) => p.color)),
    ];
    setColors(colors);
    setSelectedColor(null);
    setSelectedWeight(null);
    setVariant(null);

    const sel = document.querySelectorAll(".color_container .pageType-select");

    sel.forEach((item) => item.classList.remove("pageType-select_active"));
  };
  const handleMRPChange = (event) => {
    setMRP(event.target.value);
    setEarning(
      `₹ ${
        Number(event.target.value.slice(event.target.value.indexOf("₹") + 1)) -
        Math.ceil(singleBookCost + 20)
      }`
    );
    console.log(
      Number(event.target.value.slice(event.target.value.indexOf("₹") + 1))
    );
  };
  const handleVariantChange = (event) => {
    let elem = event.target;

    while (!elem.classList.contains("pageType-select"))
      elem = elem.parentElement;

    const sel = document.querySelectorAll(
      ".dimension_container .pageType-select"
    );

    sel.forEach((item) => item.classList.remove("pageType-select_active"));

    elem.classList.add("pageType-select_active");

    setVariant(
      page.variants
        .filter(
          (p, i) => p.color === selectedColor && p.weight === selectedWeight
        )[0]
        .types.filter(
          (typ, i) => typ.dimension === elem.getAttribute("elem")
        )[0]
    );
  };
  const handleNoOfPagesChange = (event) => {
    if (event.target.value < 0) setNoOfPages(1);
    else setNoOfPages(event.target.value);
  };
  const handleNoOfBooksChange = (event) => {
    if (event.target.value < 0) setNoOfBooks(1);
    else setNoOfBooks(event.target.value);
  };
  const handleJacketChange = (event) => {
    setAddOns({ ...addOns, jacket: !addOns.jacket });
  };
  const handleHardcoverChange = (event) => {
    let selectItem = event.target;

    while (!selectItem.classList.contains("book-select"))
      selectItem = selectItem.parentElement;

    if (selectItem.getAttribute("elem") === "paperback") {
      paperbackRef.current.classList.add("book-select_active");
      hardCoverRef.current.classList.remove("book-select_active");
    } else {
      hardCoverRef.current.classList.add("book-select_active");
      paperbackRef.current.classList.remove("book-select_active");
    }
    setAddOns({
      ...addOns,
      hardCover: selectItem.getAttribute("elem") === "paperback" ? false : true,
    });
  };
  const handleNameChange = (event) => {
    setCustomerInfo({ ...customerInfo, name: event.target.value });
  };
  const handleContactChange = (event) => {
    setCustomerInfo({ ...customerInfo, contact: event.target.value });
  };
  const handleEmailChange = (event) => {
    setCustomerInfo({ ...customerInfo, email: event.target.value });
  };
  const handleColorChange = (event) => {
    if (event.target.textContent === "Multicolor") {
      document
        .querySelector(`.pageType-selectmc`)
        ?.classList.add("pageType-select_active");
      document
        .querySelector(`.pageType-selectbw`)
        ?.classList.remove("pageType-select_active");
    } else {
      document
        .querySelector(`.pageType-selectbw`)
        ?.classList.add("pageType-select_active");
      document
        .querySelector(`.pageType-selectmc`)
        ?.classList.remove("pageType-select_active");
    }
    setSelectedColor(event.target.textContent);
    const weights = page.variants
      .filter((p, i) => p.color === event.target.textContent)
      .map((fil, i) => fil.weight);
    setWeights(weights);
    const dimElem = document.querySelectorAll(
      ".dimension_container .pageType-select"
    );

    dimElem.forEach((item) => item.classList.remove("pageType-select_active"));

    const weightElem = document.querySelectorAll(
      ".weights_container .pageType-select"
    );

    weightElem.forEach((item) =>
      item.classList.remove("pageType-select_active")
    );
  };
  const handleWeightChange = (event) => {
    let elem = event.target;
    while (!elem.classList.contains("pageType-select"))
      elem = elem.parentElement;

    const sel = document.querySelectorAll(
      ".weights_container .pageType-select"
    );

    sel.forEach((item) => item.classList.remove("pageType-select_active"));

    elem.classList.add("pageType-select_active");
    setSelectedWeight(elem.getAttribute("elem"));
    const dimElem = document.querySelectorAll(
      ".dimension_container .pageType-select"
    );

    dimElem.forEach((item) => item.classList.remove("pageType-select_active"));
  };

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };
  const handlePrintOrder = () => {};
  useEffect(() => {
    document.body.classList.add("land-demo2");
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

  const retreiveOptional = (item) => {
    for (let opt of price.optional) {
      if (opt.name === item) return Number(opt.price);
    }
  };

  useEffect(() => {
    if (variant) {
      let price = "";
      if (noOfPages < 30) price = "page_1_29";
      else if (noOfPages < 100) price = "page_30_99";
      else price = "page_100_500";
      let cost = Number(variant.prices[price]) * Number(noOfPages);
      cost += addOns.hardCover ? retreiveOptional(optNames[0]) : 0;
      cost += addOns.jacket ? retreiveOptional(optNames[1]) : 0;
      setSingleBookCost(cost);
    }
  }, [variant, addOns, noOfPages, noOfBooks]);

  return (
    <>
      <Head>
        <title>Paperhood - Marketplace for Books</title>
        <link rel="stylesheet" href="/css/calc.css" />
        <link rel="stylesheet" href="css/bootstrap.min.css" />
        <link rel="stylesheet" href="css/bootstrap-datepicker.css" />
        <link rel="stylesheet" href="css/fontawesome-all.css" />
        <link rel="stylesheet" href="css/animate.min.css" />
        <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
        <script src="js/bootstrap-datepicker.min.js" />
        <script src="js/jquery.validate.min.js" />
        <script src="js/calcMain.js" />
      </Head>

      <DashboardLayout className="dashboard">
        <main className="mt-30 container d-flex flex-column justify-content-center align-items-center calc">
          <div className="container row calculator d-flex justify-content-center align-items-center">
            <div className="col-lg-7 col-md-7 col-sm-12 px-5 row">
              <h4 className="fw-800 mb-10">
                Estimate{" "}
                <span className="gr-purple-red-text">Printing Cost</span>
              </h4>
              <div className="col-lg-7 d-flex flex-column justify-content-center">
                <TextField
                  id="pages"
                  label="1. Pages"
                  variant="filled"
                  fullWidth
                  value={noOfPages}
                  color="primary"
                  onChange={handleNoOfPagesChange}
                  InputLabelProps={{
                    color: "success",
                  }}
                />
                <FormControl
                  variant="filled"
                  fullWidth
                  sx={{ marginBottom: "30px", marginTop: "40px" }}
                >
                  <InputLabel id="demo-simple-select-label" color="primary">
                    2. Select Page Type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={page}
                    label="2. Select Page Type"
                    color="primary"
                    onChange={handlePageChange}
                  >
                    {price &&
                      price.pages.map((page, i) => (
                        <MenuItem
                          value={page}
                          key={`pageType${page.name}${i + 1}`}
                        >
                          {page.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
                <div className="row d-flex justify-content-around">
                  <span className="heading-calc mb-10">3. Book Type</span>
                  <div
                    className="col-lg-5 col-md-5 col-sm-12 book-select d-flex flex-column justify-content-center align-items-center my-1"
                    onClick={handleHardcoverChange}
                    ref={hardCoverRef}
                    elem="hardCover"
                  >
                    <HardCover />
                    <span className="mt-10">Hardcover</span>
                  </div>
                  <div
                    className="col-lg-5 col-md-5 col-sm-12 book-select d-flex flex-column justify-content-center align-items-center"
                    onClick={handleHardcoverChange}
                    ref={paperbackRef}
                    elem="paperback"
                  >
                    <Paperback />
                    <span className="mt-10">Paperback</span>
                  </div>
                </div>
                <div className="d-flex mt-20 mb-20 align-items-center">
                  <input
                    type="checkbox"
                    id="switch"
                    className="jacketSelect"
                    onChange={handleJacketChange}
                  />
                  <label className="jacketSelectLabel" for="switch">
                    Toggle
                  </label>
                  <span className="ml-10 fz-14 label-calc">
                    Add Jacket - ₹35.00/- per book
                  </span>
                </div>
                {colors ? (
                  <div className="row d-flex justify-content-around color_container">
                    <span className="heading-calc mb-10">4. Page Color</span>
                    {colors &&
                      colors.map((p, i) => (
                        <div
                          className={`col-lg-5 col-md-5 col-sm-12 pageType-select pageType-select${
                            p === "Multicolor" ? "mc" : "bw"
                          } d-flex justify-content-center align-items-center my-1`}
                          onClick={handleColorChange}
                          elem={p}
                        >
                          {p}
                        </div>
                      ))}
                  </div>
                ) : null}
              </div>
              {page?.variants && selectedColor ? (
                <div className="col-lg-5 d-flex flex-column justify-content-center ">
                  <div className="row d-flex flex-column justify-content-center">
                    {weights ? (
                      <div className="d-flex flex-column justify-content-between weights_container mb-20">
                        <span className="heading-calc mb-10 p-0">
                          5. Page Weight
                        </span>
                        <div className="row d-flex justify-content-around">
                          {weights &&
                            weights.map((p, i) => (
                              <div
                                className={`my-1 col-lg-5 col-md-5 col-sm-12 pageType-select d-flex justify-content-center align-items-center `}
                                onClick={handleWeightChange}
                                elem={p}
                              >
                                {p}
                              </div>
                            ))}
                        </div>
                      </div>
                    ) : null}
                    {page?.variants && selectedColor && selectedWeight ? (
                      <div className="dimension_container">
                        <span className="heading-calc mb-10">
                          6. Page Dimensions
                        </span>
                        {page?.variants &&
                          selectedColor &&
                          selectedWeight &&
                          page.variants
                            .filter(
                              (p, i) =>
                                p.color === selectedColor &&
                                p.weight === selectedWeight
                            )[0]
                            ?.types.map((selected, i) => (
                              <div
                                className={`pageType-select d-flex justify-content-center align-items-center my-1`}
                                onClick={handleVariantChange}
                                elem={selected.dimension}
                              >
                                {selected.dimension}
                              </div>
                            ))}
                      </div>
                    ) : (
                      <div className="dimension_container">
                        <span className="heading-calc mb-10">
                          Page Dimensions
                        </span>
                        {priceList &&
                          priceList.pages[0].variants[0]?.types.map(
                            (selected, i) => (
                              <div
                                className={`pageType-select d-flex justify-content-center align-items-center my-1`}
                                onClick={handleVariantChange}
                                elem={selected.dimension}
                              >
                                {selected.dimension}
                              </div>
                            )
                          )}
                      </div>
                    )}
                  </div>
                  {/* <FormControl variant="filled" style={{ width: "50%" }}>
                  <InputLabel id="demo-simple-select-label" color="primary">
                    Select Page Dimension
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={variant}
                    label="Select Page Dimension"
                    color="primary"
                    onChange={handleVariantChange}
                  >
                    {page?.variants &&
                      selectedColor &&
                      selectedWeight &&
                      page.variants
                        .filter(
                          (p, i) =>
                            p.color === selectedColor &&
                            p.weight === selectedWeight
                        )[0]
                        .types.map((selected, i) => (
                          <MenuItem
                            value={selected}
                            key={`dimensionType${selected.dimension}${i + 1}`}
                          >
                            {selected.dimension}
                          </MenuItem>
                        ))}
                  </Select>
                </FormControl> */}
                </div>
              ) : (
                <div className="col-lg-5 d-flex flex-column justify-content-center ">
                  <div className="row d-flex flex-column justify-content-center">
                    <div className="d-flex flex-column justify-content-between weights_container mb-20">
                      <span className="heading-calc mb-10 p-0">
                        5. Page Weight
                      </span>
                      <div className="row d-flex justify-content-around">
                        {["xx gsm", "xx gsm"].map((p, i) => (
                          <div
                            className={`my-1 col-lg-5 col-md-5 col-sm-12 pageType-select d-flex justify-content-center align-items-center `}
                            onClick={handleWeightChange}
                            elem={p}
                          >
                            {p}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="dimension_container">
                      <span className="heading-calc mb-10">
                        6. Page Dimensions
                      </span>
                      {priceList &&
                        priceList.pages[0].variants[0]?.types.map(
                          (selected, i) => (
                            <div
                              className={`pageType-select d-flex justify-content-center align-items-center my-1`}
                              onClick={handleVariantChange}
                              elem={selected.dimension}
                            >
                              {selected.dimension}
                            </div>
                          )
                        )}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div
              className="col-lg-5 col-md-5 col-sm-12 d-flex flex-column justify-content-center py-3 rounded"
              style={{ background: "#F3F7F8", height: "fit-content" }}
            >
              <h4 className="fw-800 mb-30">
                Calculate <span className="gr-purple-red-text">Royalty</span>
              </h4>
              <TextField
                id="filled-basic"
                label="Minimum Selling Price"
                variant="filled"
                fullWidth
                value={MSP}
                color="primary"
                disabled
                sx={{ marginBottom: "35px" }}
              />
              <TextField
                id="filled-basic"
                label="Enter Selling Price"
                variant="filled"
                fullWidth
                value={MRP}
                color="primary"
                onChange={handleMRPChange}
                sx={{ marginBottom: "35px" }}
              />
              <TextField
                id="filled-basic"
                label="Earning"
                variant="filled"
                fullWidth
                value={earning}
                color="primary"
                disabled
                sx={{ marginBottom: "35px" }}
              />

              {variant ? (
                <div className="d-flex justify-content-around w-100 price-box">
                  <span>Estimated Price per Book: </span>
                  <span>
                    ₹{" "}
                    {Math.round((singleBookCost + Number.EPSILON) * 100) / 100}
                  </span>
                </div>
              ) : null}
              <div className="mb-20">
                <a
                  className="butn butn-md gr-purple-red-bg text-light radius-30 mt-15"
                  onClick={handlePrintOrder}
                >
                  <span className="text slide-up">Order in Bulk!</span>
                  <span className="text slide-down">Book slot!</span>
                </a>
              </div>
            </div>
          </div>

          <a href="https://merchant.razorpay.com/policy/Kn264p8Fo1iyFj/privacy"></a>
          <a href="https://merchant.razorpay.com/policy/Kn264p8Fo1iyFj/terms"></a>
          <a href="https://merchant.razorpay.com/policy/Kn264p8Fo1iyFj/refund"></a>
          <a href="https://merchant.razorpay.com/policy/Kn264p8Fo1iyFj/shipping"></a>
          <a href="https://merchant.razorpay.com/policy/Kn264p8Fo1iyFj/contact_us"></a>
        </main>
      </DashboardLayout>
    </>
  );
};

export default Calculator;
