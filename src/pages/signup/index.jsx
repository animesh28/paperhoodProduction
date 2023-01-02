import MainLayout from "../../layouts/main-light";
import { useState, useEffect } from "react";
import { TextField, Button, InputAdornment, IconButton } from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import HorizontalLinearStepper from "../../components/StepperRegister/StepperMain";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const errorHelper = (formik, values) => {
    return {
      error: formik.errors[values] && formik.touched[values] ? true : undefined,
      helperText:
        formik.errors[values] && formik.touched[values]
          ? formik.errors[values]
          : undefined,
    };
  };

  const loginFormik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      cf_password: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Sorry, Name is required"),

      email: Yup.string()
        .required("Sorry, E-mail is required")
        .email("Enter a valid e-mail"),

      password: Yup.string().required("Sorry, Password is required"),
      cf_password: Yup.string().required("Sorry, Password is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
    },
  });
  return (
    <MainLayout defaultLogoTheme="dark" defaultTheme="dark">
      <HorizontalLinearStepper />
    </MainLayout>
  );
}

export default Login;
