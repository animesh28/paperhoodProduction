import React from "react";
import { useEffect } from "react";
import { TextField } from "@mui/material";

function PreviewRegisterForm({ formData }) {
  const codeSequence = [
    "name",
    "email",
    "mobile",
    "accountNo",
    "accountHolderName",
    "bankName",
    "bankBranchAddress",
    "ifscCode",
    "upi",
  ];

  const formikValuesToNameMap = {
    name: "Name",
    email: "E-mail Address",
    mobile: "Mobile Number",
    accountNo: "Account Number",
    accountHolderName: "Account Holder Name",
    bankName: "Bank Name",
    bankBranchAddress: "Bank Branch Address",
    ifscCode: "IFSC Code",
    upi: "UPI ID",
  };

  useEffect(() => {
    console.log(formData);
  }, []);

  return formData ? (
    <div className="mt-30 container d-flex flex-column align-items-center">
      <div className="simple-head text-center mb-30">
        <div>
          <h6 className={`sub-head radius mb-20`}>
            <span className="fz-12 ls2 text-u">Profile Details</span>
          </h6>
        </div>
        <h2 className="fz-40 fw-800 gr-purple-red-text inline">
          Review Profile
        </h2>
      </div>
      <div className="formPreivew_container">
        {codeSequence.map((item, i) => (
          <TextField
            id={item}
            className="login_input"
            label={formikValuesToNameMap[item]}
            variant="filled"
            value={formData[item]}
            disabled
            InputProps={{
              style: { WebkitTextFillColor: "#000" },
            }}
            InputLabelProps={{
              style: { color: "#074954" },
            }}
          />
        ))}
      </div>
    </div>
  ) : null;
}

export default PreviewRegisterForm;
