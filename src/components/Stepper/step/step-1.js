import React, { useState, useEffect } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import priceList from "../../../data/price.json";
const label = { inputProps: { "aria-label": "Checkbox demo" } };
const optNames = [
  "hardCover",
  "jacket",
  '2"x 6" bookmarks- set of 180',
  '2"x 8" bookmarks- set of 180',
];

const StepOne = ({ singleBookCost, setSingleBookCost }) => {
  const [price, setPrice] = useState(priceList);
  const [page, setPage] = useState(null);
  const [colors, setColors] = useState();
  const [weights, setWeights] = useState();
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedWeight, setSelectedWeight] = useState(null);
  const [variant, setVariant] = useState(null);
  const [noOfPages, setNoOfPages] = useState(0);
  const [noOfBooks, setNoOfBooks] = useState(1);
  const [addOns, setAddOns] = useState({ hardCover: false, jacket: false });
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
    setVariant(event.target.value);
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
    console.log("hello");
    setAddOns({ ...addOns, jacket: !addOns.jacket });
  };
  const handleHardcoverChange = (event) => {
    setAddOns({ ...addOns, hardCover: !addOns.hardCover });
  };
  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
    const weights = page.variants
      .filter((p, i) => p.color === event.target.value)
      .map((fil, i) => fil.weight);
    setWeights(weights);
  };
  const handleWeightChange = (event) => {
    setSelectedWeight(event.target.value);
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
  }, [variant, addOns]);
  return (
    <div
      className="multisteps-form__panel js-active"
      data-animation="slideHorz"
    >
      {/* div 1 */}
      <div className="wizard-forms">
        <div className="inner d-flex flex-column w-100">
          <div className="form-content pera-content">
            <div className="step-inner-content">
              <span className="step-no">Step 1</span>
              <div className="col-lg-12">
                <h4 className="fw-800 mb-10">
                  Estimate{" "}
                  <span className="gr-purple-red-text">Printing Cost</span>
                </h4>
                <TextField
                  id="filled-basic"
                  label="Pages"
                  variant="filled"
                  fullWidth
                  value={noOfPages}
                  color="success"
                  className="mt-15 mb-15"
                  onChange={handleNoOfPagesChange}
                  InputLabelProps={{ color: "success" }}
                />

                <FormControl variant="filled" fullWidth className="mt-15 mb-15">
                  <InputLabel id="demo-simple-select-label" color="success">
                    Select Page Type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={page}
                    label="Select Page Type"
                    color="success"
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
                <FormControl variant="filled" fullWidth className="mt-15 mb-15">
                  <InputLabel id="demo-simple-select-label" color="success">
                    Select Page Colour
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedColor}
                    label="Select Page Color"
                    color="success"
                    onChange={handleColorChange}
                  >
                    {colors &&
                      colors.map((p, i) => (
                        <MenuItem value={p} key={`colorType${p}${i + 1}`}>
                          {p}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
                <FormControl variant="filled" fullWidth className="mt-15 mb-15">
                  <InputLabel id="demo-simple-select-label" color="success">
                    Select Page Weight
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedWeight}
                    label="Select Page Weight"
                    color="success"
                    onChange={handleWeightChange}
                  >
                    {weights &&
                      weights.map((p, i) => (
                        <MenuItem value={p} key={`weightType${p}${i + 1}`}>
                          {p}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
                <FormControl variant="filled" fullWidth className="mt-15 mb-15">
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
                </FormControl>

                <FormControl variant="filled" fullWidth className="mt-15 mb-15">
                  <InputLabel id="demo-simple-select-label" color="success">
                    Select Cover Type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={addOns.hardCover}
                    label="Select Page Weight"
                    color="success"
                    onChange={handleHardcoverChange}
                  >
                    {[true, false].map((p, i) => (
                      <MenuItem value={p} key={`weightType${p}${i + 1}`}>
                        {p ? "HardCover" : "Paperback"}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormGroup className="jacketBookCalculator">
                  <FormControlLabel
                    label="Jacket ₹35.00/- per book"
                    control={
                      <Checkbox
                        icon={<FavoriteBorder style={{ fill: "#0d9db8" }} />}
                        checkedIcon={<Favorite style={{ fill: "#0d9db8" }} />}
                        checked={addOns.jacket}
                        onChange={handleJacketChange}
                      />
                    }
                  />
                </FormGroup>
              </div>
            </div>
          </div>
        </div>
        {/* /.inner */}
        <div className="actions">
          <ul>
            <li className="disable" aria-disabled="true">
              <span className="js-btn-next" title="NEXT">
                Backward <i className="fa fa-arrow-right" />
              </span>
            </li>
            <li>
              <span className="js-btn-next" title="NEXT">
                NEXT <i className="fa fa-arrow-right" />
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StepOne;
