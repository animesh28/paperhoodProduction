import React from "react";
import MainLayout from "../../layouts/main-light";
import { Box, Button, Typography, Modal } from "@mui/material";
import { useState, useEffect } from "react";
import { patchData } from "../../server_utils/fetchData";
import { useContext } from "react";
import { DataContext } from "../../store/GlobalState";
import { error, success } from "../../components/Notify";
import Cookie from "js-cookie";
import { useRouter } from "next/router";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70vw",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Checkout() {
  const router = useRouter();
  const [state, dispatch] = useContext(DataContext);
  const { auth, cart, coupons } = state;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [coupon, setCoupon] = useState("");
  const [coupApplied, setCoupApplied] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    pincode: "",
    locality: "",
    address: "",
    city: "",
    state: "",
    landmark: "",
    altMobile: "",
  });
  const [selectedAdd, setSelectedAdd] = useState({ id: "" });

  const selectAddress = (id) => {
    document
      .querySelectorAll(".address-item")
      .forEach((item) => item.classList.remove("address-item_selected"));

    const elem = document.getElementById(id);
    elem.classList.add("address-item_selected");
    console.log(elem.textContent);
    setSelectedAdd({ id: id });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "NOTIFY", payload: { loading: true } });

    patchData(`user/address`, formData, auth.token).then((res) => {
      if (res.err) {
        dispatch({ type: "NOTIFY", payload: { loading: false } });
        return error(res.err);
      }

      dispatch({
        type: "AUTH",
        payload: {
          token: auth.token,
          user: {
            ...auth.user,
            address: [...auth.user.address, formData],
          },
        },
      });

      dispatch({ type: "NOTIFY", payload: { loading: false } });

      return success(res.msg);
    });
  };

  const makePayment = async () => {
    if (selectedAdd.id == "") {
      return error("Select a address to continue");
    }

    const item = auth.user.address.filter((add) => add.id === selectedAdd.id);

    Cookie.set("price", total);
    localStorage.setItem(
      "address",
      item[0].address +
        ", " +
        item[0]?.landmark +
        ", " +
        item[0].locality +
        ", " +
        item[0].city +
        ", " +
        item[0].state +
        ", " +
        item[0].pincode
    );
    localStorage.setItem("mobile", item[0].mobile + ", " + item[0].altMobile);
    router.push("/pay");
  };

  const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttarakhand",
    "Uttar Pradesh",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli",
    "Daman and Diu",
    "Delhi",
    "Lakshadweep",
    "Puducherry",
  ];

  const fields = [
    "name",
    "mobile",
    "address",
    "landmark",
    "locality",
    "city",
    "state",
    "pincode",
    "altMobile",
  ];
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const getTotal = () => {
      const res = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);
      setTotal(res);
    };

    getTotal();
  }, [cart]);

  const checkCoupon = () => {
    if (coupApplied) {
      return error("Only 1 coupon per order");
    }

    const item = coupons.filter((cp) => cp.code === coupon);

    if (item.length === 0) return error("Coupon Code not valid!");

    if (item[0].min_amt > total) {
      return error(`Minimum Order: Rs. ${item[0].min_amt}`);
    }

    if (item[0].dis_type === "fixed") {
      setTotal(total - item[0].amount);
      setCoupApplied(true);
      return success("Coupon code applied");
    } else {
      if ((item[0].amount / 100) * total > item[0].max_limit) {
        setTotal(total - item[0].max_limit);
        setCoupApplied(true);
        return success("Coupon code applied");
      } else {
        setTotal(total - (item[0].amount / 100) * total);
        setCoupApplied(true);
        return success("Coupon code applied");
      }
    }
  };
  return (
    <MainLayout defaultLogoTheme="dark" defaultTheme="dark">
      <div className="mt-100 container">
        <div className="row">
          <div className="col-lg-9 col-md-9 col-sm-12">
            <div>
              <h4>Tap on the address you want to select</h4>
              {auth &&
                auth.user &&
                auth.user.address &&
                auth.user.address.map((item) => (
                  <div
                    className="px-3 py-2 my-3 cursor-pointer address-item"
                    id={item.id}
                    onClick={() => selectAddress(item.id)}
                  >
                    {fields.map((f, i) => {
                      let toRet = item[f];
                      if (i != fields.length - 1) toRet += ", ";
                      return toRet;
                    })}
                  </div>
                ))}
            </div>
            <Button onClick={handleOpen}>Add Address</Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Enter all details
                </Typography>
                <div className="container my-3">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-lg-6">
                        <label htmlFor="name-add">Receiver's Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          placeholder="Name"
                          className="d-block mb-4 w-100 p-2 product_input"
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          id="name-add"
                        />
                      </div>
                      <div className="col-lg-6">
                        <label htmlFor="mob-add">10-digit Mobile Number</label>
                        <input
                          type="text"
                          name="mobile"
                          value={formData.mobile}
                          placeholder="Mobile"
                          className="d-block mb-4 w-100 p-2 product_input"
                          onChange={(e) =>
                            setFormData({ ...formData, mobile: e.target.value })
                          }
                          id="mob-add"
                          pattern="[6789][0-9]{9}"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6">
                        <label htmlFor="pin-add">Pincode</label>
                        <input
                          type="text"
                          name="pin"
                          value={formData.pincode}
                          placeholder="Pincode"
                          className="d-block mb-4 w-100 p-2 product_input"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              pincode: e.target.value,
                            })
                          }
                          id="pin-add"
                          pattern="^[1-9][0-9]{5}$"
                        />
                      </div>
                      <div className="col-lg-6">
                        <label htmlFor="locality-add">Locality</label>
                        <input
                          type="text"
                          name="local"
                          value={formData.locality}
                          placeholder="Locality"
                          className="d-block mb-4 w-100 p-2 product_input"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              locality: e.target.value,
                            })
                          }
                          id="locality-add"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12">
                        <label htmlFor="description">
                          Address (Area and Street)
                        </label>
                        <textarea
                          name="address"
                          id="address"
                          cols="30"
                          rows="4"
                          placeholder="Address (Area and Street)"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              address: e.target.value,
                            })
                          }
                          className="d-block mb-4 w-100 p-2 product_input"
                          value={formData.address}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6">
                        <label htmlFor="name-add">City/District/Town</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          placeholder="City/District/Town"
                          className="d-block mb-4 w-100 p-2 product_input"
                          onChange={(e) =>
                            setFormData({ ...formData, city: e.target.value })
                          }
                          id="name-add"
                        />
                      </div>
                      <div className="col-lg-6">
                        <label htmlFor="">State</label>
                        <select
                          name="state"
                          id="state"
                          value={formData.state}
                          onChange={(e) =>
                            setFormData({ ...formData, state: e.target.value })
                          }
                          className="custom-select text-capitalize product_input"
                        >
                          <option value="all">State</option>
                          {states.map((item, i) => (
                            <option
                              key={item + (i + 1) + "state-select"}
                              value={item}
                            >
                              {item}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6">
                        <label htmlFor="land-add">Landmark</label>
                        <input
                          type="text"
                          name="land"
                          value={formData.landmark}
                          placeholder="Landmark"
                          className="d-block mb-4 w-100 p-2 product_input"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              landmark: e.target.value,
                            })
                          }
                          id="land-add"
                        />
                      </div>
                      <div className="col-lg-6">
                        <label htmlFor="altmob-add">
                          Alternate Mobile Number
                        </label>
                        <input
                          type="text"
                          name="altMobile"
                          value={formData.altMobile}
                          placeholder="Alternate Mobile"
                          className="d-block mb-4 w-100 p-2 product_input"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              altMobile: e.target.value,
                            })
                          }
                          id="altmob-add"
                          pattern="[66789][0-9]{9}"
                        />
                      </div>
                    </div>
                    <Button
                      variant="contained"
                      style={{ marginLeft: "auto" }}
                      type="submit"
                    >
                      Add Address
                    </Button>
                  </form>
                </div>
              </Box>
            </Modal>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-12">
            <h4>Total Payable</h4>
            <div className="container">
              <h6 className="price mt-10">Total: ₹ {total}</h6>
              <div className="coupon-section mt-20">
                <label htmlFor="altmob-add">Coupon Code</label>
                <input
                  type="text"
                  name="coupon"
                  value={coupon}
                  placeholder="Coupon Code"
                  className="d-block mb-4 w-100 p-2 product_input"
                  onChange={(e) => setCoupon(e.target.value)}
                  id="altmob-add"
                  pattern="[66789][0-9]{9}"
                />
                <Button variant="contained" onClick={checkCoupon}>
                  Apply
                </Button>
              </div>
              <Button
                variant="contained"
                className="mt-20"
                color="success"
                onClick={makePayment}
              >
                Proceed to Pay
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Checkout;
