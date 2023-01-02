/* eslint-disable @next/next/no-img-element */
import * as Yup from "yup";
import { useFormik } from "formik";
import "yup-phone";
import { TextField, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useRouter } from "next/router";

const Clients = ({ slides }) => {
  const router = useRouter();
  const errorHelper = (formik, values) => {
    return {
      error: formik.errors[values] && formik.touched[values] ? true : undefined,
      helperText:
        formik.errors[values] && formik.touched[values]
          ? formik.errors[values]
          : undefined,
    };
  };

  const registerFormik = useFormik({
    initialValues: {
      mobile: "",
      email: "",
    },

    validationSchema: Yup.object({
      mobile: Yup.string()
        .phone("IN", true, "Mobile Number is invalid")
        .required("Sorry, Mobile Number is required"),
      email: Yup.string()
        .required("Sorry, E-mail is required")
        .email("Enter a valid e-mail"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      router.push(`/signup?email=${values.email}&mobile=${values.mobile}`);
    },
  });
  return (
    <section className="clients-carsouel shad up" id="getStarted">
      <div className="container radius-15 px-5">
        <h3 className="mb-40">Get Started</h3>
        <div className="d-flex justify-content-between mt-20 mobile-column">
          <TextField
            id="email"
            className="login_input"
            label="E-mail"
            variant="filled"
            {...registerFormik.getFieldProps("email")}
            {...errorHelper(registerFormik, "email")}
          />
          <TextField
            id="mobile"
            className="login_input"
            label="Mobile Number"
            variant="filled"
            {...registerFormik.getFieldProps("mobile")}
            {...errorHelper(registerFormik, "mobile")}
          />
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            onClick={registerFormik.handleSubmit}
          >
            Get Access
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Clients;
