import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
const StepTwo = ({ singleBookCost }) => {
  const [variant, setVariant] = useState();
  const [noOfBooks, setNoOfBooks] = useState(1);
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
  return (
    <div className="multisteps-form__panel" data-animation="slideHorz">
      {/* div 2 */}
      <div className="wizard-forms">
        <div className="inner d-flex flex-column w-100">
          <div className="form-content pera-content">
            <div className="step-inner-content">
              <span className="step-no bottom-line">Step 2</span>
              <div className="step-progress float-right">
                <span>2 of 5 completed</span>
                <div className="step-progress-bar">
                  <div className="progress">
                    <div className="progress-bar"></div>
                  </div>
                </div>
              </div>

              <div className="col-lg-12 col-sm-12">
                {singleBookCost ? (
                  <>
                    <h4 className="fw-800 mb-10">
                      Estimate{" "}
                      <span className="gr-purple-red-text">Printing Cost</span>
                    </h4>
                    <TextField
                      id="filled-basic"
                      label="No of Copies"
                      variant="filled"
                      fullWidth
                      value={noOfBooks}
                      color="success"
                      className="mt-15 mb-15"
                      InputLabelProps={{ color: "success" }}
                      onChange={handleNoOfBooksChange}
                    />
                  </>
                ) : null}

                {variant ? (
                  <div className="sub-head radius sub-head_header fz-13 ls2 text-u mb-10 mt-10">
                    <span>
                      Estimated Price per Book: ₹{" "}
                      {Math.round((singleBookCost + Number.EPSILON) * 100) /
                        100}
                    </span>
                  </div>
                ) : null}
                <br />
                {singleBookCost && noOfBooks ? (
                  <div className="sub-head radius sub-head_header fz-13 ls2 text-u mb-10 mt-10">
                    <span>
                      Total Cost: ₹{" "}
                      {Math.round(
                        (singleBookCost * noOfBooks + Number.EPSILON) * 100
                      ) / 100}
                    </span>
                  </div>
                ) : null}
                <h4 className="fw-800 mb-10">
                  Calculate <span className="gr-purple-red-text">Royalty</span>
                </h4>
                <TextField
                  id="filled-basic"
                  label="Minimum Selling Price"
                  variant="filled"
                  fullWidth
                  value={MSP}
                  color="success"
                  disabled
                  className="mt-15 mb-15"
                  InputLabelProps={{ color: "success" }}
                />
                <TextField
                  id="filled-basic"
                  label="Enter Selling Price"
                  variant="filled"
                  fullWidth
                  value={MRP}
                  color="success"
                  onChange={handleMRPChange}
                  InputLabelProps={{ color: "success" }}
                  className="mt-15 mb-15"
                />
                <TextField
                  id="filled-basic"
                  label="Earning"
                  variant="filled"
                  fullWidth
                  value={earning}
                  color="success"
                  disabled
                  InputLabelProps={{ color: "success" }}
                  className="mt-15 mb-15"
                />
                <div className="mb-20">
                  <a
                    className="butn butn-md gr-purple-red-bg text-light radius-30 mt-15"
                    onClick={makePayment}
                  >
                    <span className="text slide-up">Pay Now!</span>
                    <span className="text slide-down">Book slot!</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/*<!-- /.inner -->*/}
          <div className="actions">
            <ul className="justify-content-end">
              <li>
                <span className="js-btn-prev" title="BACK">
                  <i className="fa fa-arrow-left"></i> BACK{" "}
                </span>
              </li>
              <li>
                <span className="js-btn-next" title="NEXT">
                  NEXT <i className="fa fa-arrow-right"></i>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <a href="https://merchant.razorpay.com/policy/Kn264p8Fo1iyFj/privacy"></a>
      <a href="https://merchant.razorpay.com/policy/Kn264p8Fo1iyFj/terms"></a>
      <a href="https://merchant.razorpay.com/policy/Kn264p8Fo1iyFj/refund"></a>
      <a href="https://merchant.razorpay.com/policy/Kn264p8Fo1iyFj/shipping"></a>
      <a href="https://merchant.razorpay.com/policy/Kn264p8Fo1iyFj/contact_us"></a>
    </div>
  );
};

export default StepTwo;
