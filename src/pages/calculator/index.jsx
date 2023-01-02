/* eslint-disable @next/next/no-css-tags */
import { useEffect, useState, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
//= Layout
import MainLightLayout from "../../layouts/main-light";
//= Components
import {
  TextField,
  FormControl,
  InputAdornment,
  Select,
  MenuItem,
} from "@mui/material";
import priceList from "../../data/price.json";
import { HardCover, Paperback } from "../../components/AllSvgs";
import Footer from "../../components/FooterNew";

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
  const [page, setPage] = useState(
    priceList.pages.filter((p) => p.name === "Cream Paper")[0]
  );
  const [colors, setColors] = useState(["Black & White", "Multicolor"]);
  const [coverType, setCoverType] = useState("");
  const [selectedDimension, setSelectedDimension] = useState();
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedWeight, setSelectedWeight] = useState("75 gsm");
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

  const handleEstimationCost = () => {
    if (
      !page?.variants ||
      !selectedColor ||
      !selectedWeight ||
      !selectedDimension
    )
      return;

    setVariant(
      page.variants
        .filter(
          (p, i) => p.color === selectedColor && p.weight === selectedWeight
        )[0]
        .types.filter((typ, i) => typ.dimension === selectedDimension)[0]
    );
    let price = "";
    if (noOfPages < 30) price = "page_1_29";
    else if (noOfPages < 100) price = "page_30_99";
    else price = "page_100_500";
    let cost = Number(variant.prices[price]) * Number(noOfPages);
    cost += addOns.hardCover ? retreiveOptional(optNames[0]) : 0;
    cost += addOns.jacket ? retreiveOptional(optNames[1]) : 0;
    setSingleBookCost(cost);
    // document.querySelector("#price_box").innerHTML = `₹ ${Math.ceil(
    //   Math.round((cost + Number.EPSILON) * 100) / 100
    // )}`;
  };

  useEffect(() => {
    if (singleBookCost) {
      setMSP(`₹ ${Math.ceil(singleBookCost + 20)}.00`);
    }
  }, [singleBookCost]);

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
    let elem = event.target.value;

    setVariant(
      page.variants
        .filter(
          (p, i) => p.color === selectedColor && p.weight === selectedWeight
        )[0]
        .types.filter((typ, i) => typ.dimension === elem)[0]
    );
    setSelectedDimension(elem);
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
    if (!addOns.hardCover) return;

    setAddOns({ ...addOns, jacket: !addOns.jacket });
  };
  const handleHardcoverChange = (event) => {
    let selectItem = event.target.value;

    if (selectItem === "Paperback") {
      document.getElementById("switch").checked = false;
    }

    setAddOns({
      hardCover: selectItem === "Paperback" ? false : true,
      jacket: selectItem === "Paperback" ? false : addOns.jacket,
    });
    setCoverType(selectItem);
  };

  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
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

  const makePayment = async () => {
    const res = await initializeRazorpay();

    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }

    if (
      !(
        noOfPages &&
        page &&
        variant &&
        noOfBooks &&
        customerInfo.contact &&
        customerInfo.email &&
        customerInfo.name
      )
    ) {
      alert("Enter all details");
      return;
    }

    // Make API call to the serverless API
    const data = await fetch("/api/razorpay", {
      method: "POST",
      body: JSON.stringify({
        noOfPages: noOfPages,
        variant: page.name,
        weight: selectedWeight,
        color: selectedColor,
        dimension: variant.dimension,
        hardCover: addOns.hardCover,
        jacket: addOns.jacket,
        noOfBooks: noOfBooks,
      }),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    }).then((t) => t.json());

    var options = {
      key: process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
      name: "Paperhood Testing",
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: "Thank You! for your test payment",
      handler: function (response) {
        // Validate payment at server - using webhooks is a better idea.
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        name: customerInfo.name,
        email: customerInfo.email,
        contact: customerInfo.contact,
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

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
      // document.querySelector("#price_box").innerHTML = `₹ ${Math.ceil(
      //   Math.round((cost + Number.EPSILON) * 100) / 100
      // )}`;
    }
  }, [variant, addOns, noOfPages]);

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

      <MainLightLayout defaultLogoTheme="dark" defaultTheme="dark">
        <main
          style={{ margin: "17vh 0" }}
          className="container-fluid d-flex flex-column justify-content-center align-items-center calc"
        >
          <div className="container-fluid row calculator d-flex justify-content-between align-items-center flex-column">
            <div
              className="col-lg-5 col-md-5 col-sm-12 d-flex flex-column justify-content-center p-0 pb-30 mt-40 mb-10"
              style={{
                background: "#F3F7F8",
                height: "fit-content",
                borderRadius: "16px",
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              }}
            >
              <h4
                className="fw-800 mb-10 py-2"
                style={{
                  backgroundColor: "#0d9db8",
                  color: "#F3F7F8",
                  textAlign: "center",
                  borderTopLeftRadius: "16px",
                  borderTopRightRadius: "16px",
                }}
              >
                Estimate Printing Cost
              </h4>
              <div className="col-lg-12 d-flex flex-column justify-content-center px-4">
                <div className="row calc-sec_row">
                  <div className="col-lg-4 calc-sec_row-label">
                    No of Pages <span>:</span>{" "}
                  </div>
                  <TextField
                    id="pages"
                    label=""
                    variant="filled"
                    value={noOfPages}
                    color="primary"
                    onChange={handleNoOfPagesChange}
                    InputLabelProps={{
                      color: "primary",
                    }}
                    className="col-lg-8"
                  />
                </div>

                {colors ? (
                  <div className="row calc-sec_row">
                    <div className="col-lg-4 calc-sec_row-label">
                      Page Colour <span>:</span>{" "}
                    </div>
                    <FormControl variant="filled" className="col-lg-8">
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedColor}
                        label="Select Page Type"
                        color="primary"
                        onChange={handleColorChange}
                      >
                        {colors.map((color, i) => (
                          <MenuItem
                            value={color}
                            key={`colorType${color}${i + 1}`}
                            elem={color.toLowerCase()}
                          >
                            {color}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                ) : null}

                <div className="row calc-sec_row">
                  <div className="col-lg-4 calc-sec_row-label">
                    Book Size <span>:</span>{" "}
                  </div>
                  <FormControl variant="filled" className="col-lg-8">
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={selectedDimension}
                      label="Select Page Type"
                      color="primary"
                      onChange={handleVariantChange}
                    >
                      {page.variants[0].types.map((selDim, i) => (
                        <MenuItem
                          value={selDim.dimension}
                          key={`selDimType${selDim}${i + 1}`}
                        >
                          {selDim.dimension}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>

                <div className="row calc-sec_row">
                  <div className="col-lg-4 calc-sec_row-label">
                    Binding <span>:</span>{" "}
                  </div>
                  <FormControl variant="filled" className="col-lg-5">
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={coverType}
                      label="Select Page Type"
                      color="primary"
                      onChange={handleHardcoverChange}
                    >
                      {["HardCover", "Paperback"].map((page, i) => (
                        <MenuItem
                          value={page}
                          key={`pageType${page}${i + 1}`}
                          elem={page.toLowerCase()}
                        >
                          {page}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <div className="col-lg-3 d-flex align-items-center justify-content-center p-0">
                    <input
                      type="checkbox"
                      id="switch"
                      className="jacketSelect"
                      onChange={handleJacketChange}
                      disabled={addOns.hardCover ? false : true}
                    />
                    <label className="jacketSelectLabel" for="switch">
                      Toggle
                    </label>
                    <span className="ml-10 fz-14 label-calc">
                      Add Jacket <br />
                    </span>
                  </div>
                </div>
              </div>

              <div className="col-lg-12 d-flex  justify-content-center">
                <a
                  href="#sep"
                  className="butn butn-md gr-purple-red-bg text-light radius-30 mt-15"
                  style={{ width: "25%" }}
                  onClick={handleEstimationCost}
                >
                  <span className="text slide-up">Calculate Cost</span>
                  <span className="text slide-down">Calculate Cost</span>
                </a>
              </div>
              {/* {page?.variants ? (
                <div className="col-lg-5 d-flex flex-column justify-content-center ">
                  <div className="row d-flex flex-column justify-content-center">
                    {page?.variants && selectedWeight ? (
                      <div className="dimension_container">
                        <span className="heading-calc mb-10">
                          Page Dimensions
                        </span>
                        {page.variants[0].types.map((selected, i) => (
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
                  <InputLabel id="demo-simple-select-label" color="success">
                    Select Page Dimension
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={variant}
                    label="Select Page Dimension"
                    color="success"
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
                        </FormControl> //end comment
                </div>
              ) : null} */}
            </div>
            <div className="mt-100 mb-100" id="sep"></div>
            <div
              className="col-lg-6 col-md-6 col-sm-12 d-flex flex-column justify-content-center p-0 pb-40 royalty_container"
              style={{
                background: "#F3F7F8",
                height: "fit-content",
                borderRadius: "16px",
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              }}
            >
              <h4
                className="fw-800 mb-10 py-2"
                style={{
                  backgroundColor: "#0d9db8",
                  color: "#F3F7F8",
                  textAlign: "center",
                  borderTopLeftRadius: "16px",
                  borderTopRightRadius: "16px",
                }}
              >
                Calculate Royalty
              </h4>

              <div className="row calc-sec_row px-4">
                <div className="col-lg-4 calc-sec_row-label">
                  Printing Cost <span>:</span>{" "}
                </div>
                <div className="col-lg-8 px-4 py-2">
                  {`₹ ${Math.ceil(
                    Math.round((singleBookCost + Number.EPSILON) * 100) / 100
                  )}`}
                </div>
              </div>
              <div className="row calc-sec_row px-4">
                <div className="col-lg-4 calc-sec_row-label">
                  Minimum Selling Price <span>:</span>{" "}
                </div>
                <div className="col-lg-8 px-4 py-2">{MSP}</div>
              </div>
              <div className="row calc-sec_row px-4">
                <div className="col-lg-4 calc-sec_row-label">
                  Maximum Retail Price <span>:</span>{" "}
                </div>
                <TextField
                  className="col-lg-8 px-4"
                  id="filled-basic"
                  variant="standard"
                  value={MRP}
                  color="primary"
                  onChange={handleMRPChange}
                  InputLabelProps={{ color: "success" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">₹</InputAdornment>
                    ),
                  }}
                />
              </div>
              <div className="row calc-sec_row px-4">
                <div className="col-lg-4 calc-sec_row-label">
                  Royalty <span>:</span>{" "}
                </div>
                <div className="col-lg-8 px-4 py-2">{earning}</div>
              </div>
              <div
                className="d-flex justify-content-center"
                style={{ margin: "0 auto" }}
              >
                <Link href="/register">
                  <a
                    className="butn butn-md gr-dark text-light radius-30 mt-20"
                    style={{ width: "25%", marginLeft: "auto" }}
                  >
                    <span className="text slide-up">Order in Bulk</span>
                    <span className="text slide-down">Register Now!</span>
                  </a>
                </Link>
              </div>
            </div>
          </div>

          <a href="https://merchant.razorpay.com/policy/Kn264p8Fo1iyFj/privacy"></a>
          <a href="https://merchant.razorpay.com/policy/Kn264p8Fo1iyFj/terms"></a>
          <a href="https://merchant.razorpay.com/policy/Kn264p8Fo1iyFj/refund"></a>
          <a href="https://merchant.razorpay.com/policy/Kn264p8Fo1iyFj/shipping"></a>
          <a href="https://merchant.razorpay.com/policy/Kn264p8Fo1iyFj/contact_us"></a>
        </main>
        <Footer />
      </MainLightLayout>
    </>
  );
};

export default Calculator;
