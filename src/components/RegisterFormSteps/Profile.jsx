import { useState, useContext, useEffect } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { DataContext } from "../../store/GlobalState";
import "yup-phone";
import { useRouter } from "next/router";
import { postData } from "../../server_utils/fetchData";
import { error, success } from "../Notify";

function Profile({ setFormik, formik }) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const [state, dispatch] = useContext(DataContext);

  const handleSubmit = async (values) => {
    const res = await postData("auth/register", values);

    if (res.err) return error(res.err);
    return success(res.msg);
  };

  const errorHelper = (formik, values) => {
    return {
      error: formik.errors[values] && formik.touched[values] ? true : undefined,
      helperText:
        formik.errors[values] && formik.touched[values]
          ? formik.errors[values]
          : undefined,
    };
  };
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const loginFormik = useFormik({
    initialValues: {
      name: formik?.values?.name ? formik?.values?.name : "",
      mobile: router?.query?.mobile
        ? router?.query?.mobile
        : formik?.values?.mobile
        ? formik?.values?.mobile
        : "",
      email: router?.query?.email
        ? router?.query?.email
        : formik?.values?.email
        ? formik?.values?.email
        : "",
      password: formik?.values?.password ? formik?.values?.password : "",
      cf_password: formik?.values?.cf_password
        ? formik?.values?.cf_password
        : "",
      role_descrip: formik?.values?.role_descrip
        ? formik?.values?.role_descrip
        : "seller",
      role: "seller",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Sorry, Name is required"),

      mobile: Yup.string()
        .phone("IN", true, "Mobile Number is invalid")
        .required("Sorry, Mobile Number is required"),
      email: Yup.string()
        .required("Sorry, E-mail is required")
        .email("Enter a valid e-mail"),

      password: Yup.string().required("Sorry, Password is required"),
      cf_password: Yup.string().required("Sorry, Password is required"),
      role_descrip: Yup.string().required("Sorry! Role is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      setFormik(loginFormik);
      handleSubmit(values);
    },
  });

  useEffect(() => {
    setFormik(loginFormik);
  }, []);

  useEffect(() => {
    setFormik(loginFormik);
  }, [loginFormik.errors, loginFormik.values]);

  return (
    <div className="login_container mt-30">
      <TextField
        id="name"
        className="login_input"
        label="Name"
        variant="filled"
        InputLabelProps={{
          style: { color: "#074954" },
        }}
        {...loginFormik.getFieldProps("name")}
        {...errorHelper(loginFormik, "name")}
      />
      <TextField
        id="mobile"
        className="login_input"
        label="Mobile Number"
        variant="filled"
        InputLabelProps={{
          style: { color: "#074954" },
        }}
        {...loginFormik.getFieldProps("mobile")}
        {...errorHelper(loginFormik, "mobile")}
      />

      <TextField
        id="email"
        className="login_input"
        label="E-mail"
        variant="filled"
        InputLabelProps={{
          style: { color: "#074954" },
        }}
        {...loginFormik.getFieldProps("email")}
        {...errorHelper(loginFormik, "email")}
      />
      <TextField
        id="password"
        className="login_input"
        type={showPassword ? "text" : "password"}
        label="Password"
        variant="filled"
        InputLabelProps={{
          style: { color: "#074954" },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        {...loginFormik.getFieldProps("password")}
        {...errorHelper(loginFormik, "password")}
      />
      <TextField
        id="cf_password"
        className="login_input"
        type={showPassword ? "text" : "password"}
        label="Confirm Password"
        variant="filled"
        InputLabelProps={{
          style: { color: "#074954" },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        {...loginFormik.getFieldProps("cf_password")}
        {...errorHelper(loginFormik, "cf_password")}
      />
      <FormControl className="login_input">
        <InputLabel id="seller-role">I'm a</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Role"
          variant="filled"
          {...loginFormik.getFieldProps("role_descrip")}
          {...errorHelper(loginFormik, "role_descrip")}
        >
          <MenuItem value={"author"}>Author</MenuItem>
          <MenuItem value={"publisher"}>Publisher</MenuItem>
          <MenuItem value={"seller"}>Seller</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default Profile;
