import { useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { TextField, InputAdornment, IconButton } from "@mui/material";

function Bank({ formik, setFormik }) {
  const errorHelper = (formik, values) => {
    return {
      error: formik.errors[values] && formik.touched[values] ? true : undefined,
      helperText:
        formik.errors[values] && formik.touched[values]
          ? formik.errors[values]
          : undefined,
    };
  };
  const bankFormik = useFormik({
    initialValues: {
      accountHolderName: formik?.values?.accountHolderName
        ? formik?.values?.accountHolderName
        : "",
      bankName: formik?.values?.bankName ? formik?.values?.bankName : "",
      ifscCode: formik?.values?.ifscCode ? formik?.values?.ifscCode : "",
      accountNo: formik?.values?.accountNo ? formik?.values?.accountNo : "",
      bankBranchAddress: formik?.values?.bankBranchAddress
        ? formik?.values?.bankBranchAddress
        : "",
      upi: formik?.values?.upi ? formik?.values?.upi : "",
    },

    validationSchema: Yup.object({
      accountHolderName: Yup.string().required("Sorry, Name is required"),

      bankName: Yup.string().required("Sorry, Bank Name is required"),

      accountNo: Yup.string().required("Sorry, Account Number is required"),
      ifscCode: Yup.string()
        .required("Sorry, IFSC Code is required")
        .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC Code"),
      bankBranchAddress: Yup.string().required(
        "Sorry, Bank Branch Address is required"
      ),
      upi: Yup.string()
        .required("Sorry, Bank Branch Address is required")
        .matches(/^\w.+@\w+$/, "Invalid UPI ID"),
    }),
    onSubmit: (values, { resetForm }) => {
      setFormik(bankFormik);
      handleSubmit(values);
    },
  });

  useEffect(() => {
    setFormik(bankFormik);
  }, []);

  useEffect(() => {
    setFormik(bankFormik);
  }, [bankFormik.errors, bankFormik.values]);
  return (
    <div className="bank_container mt-30">
      <TextField
        id="accountHolderName"
        className="login_input"
        label="Account Holder Name"
        variant="filled"
        InputLabelProps={{
          style: { color: "#074954" },
        }}
        {...bankFormik.getFieldProps("accountHolderName")}
        {...errorHelper(bankFormik, "accountHolderName")}
      />
      <TextField
        id="bankName"
        className="login_input"
        label="Bank Name"
        variant="filled"
        InputLabelProps={{
          style: { color: "#074954" },
        }}
        {...bankFormik.getFieldProps("bankName")}
        {...errorHelper(bankFormik, "bankName")}
      />

      <TextField
        id="accountNo"
        className="login_input"
        label="Account Number"
        variant="filled"
        InputLabelProps={{
          style: { color: "#074954" },
        }}
        {...bankFormik.getFieldProps("accountNo")}
        {...errorHelper(bankFormik, "accountNo")}
      />

      <TextField
        id="ifscCode"
        className="login_input"
        label="IFSC Code"
        variant="filled"
        InputLabelProps={{
          style: { color: "#074954" },
        }}
        {...bankFormik.getFieldProps("ifscCode")}
        {...errorHelper(bankFormik, "ifscCode")}
      />

      <TextField
        id="bankBranchAddress"
        className="login_input"
        label="Bank's Branch Address"
        variant="filled"
        InputLabelProps={{
          style: { color: "#074954" },
        }}
        {...bankFormik.getFieldProps("bankBranchAddress")}
        {...errorHelper(bankFormik, "bankBranchAddress")}
      />
      <TextField
        id="upi"
        className="login_input"
        label="UPI ID"
        variant="filled"
        InputLabelProps={{
          style: { color: "#074954" },
        }}
        {...bankFormik.getFieldProps("upi")}
        {...errorHelper(bankFormik, "upi")}
      />
    </div>
  );
}

export default Bank;
