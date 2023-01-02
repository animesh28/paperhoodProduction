import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { error, success } from "../../components/Notify";
import DashboardLayout from "../../layouts/dashboard-layout";
import { postData } from "../../server_utils/fetchData";
import { DataContext } from "../../store/GlobalState";
import Link from "next/link";

function Coupons() {
  const [state, dispatch] = useContext(DataContext);
  const { auth, coupons } = state;

  const disTypeHandler = (e) => {
    const selected = e.target.getAttribute("id");

    const other = selected === "percentage" ? "fixed" : "percentage";

    setdisType({ [other]: false, [selected]: true });
    setCouponData({ ...couponData, dis_type: selected });
  };

  const [disType, setdisType] = useState({
    percentage: false,
    fixed: false,
  });
  const [couponData, setCouponData] = useState({
    dis_type: "",
    amount: "",
    code: "",
    expiry: "",
    max_limit: 0,
    min_amt: 0,
    free_ship: false,
  });

  const handleSubmit = async () => {
    const res = await postData("coupons", couponData, auth.token);
    dispatch({ type: "NOTIFY", payload: { loading: true } });
    if (res.err) {
      dispatch({ type: "NOTIFY", payload: { loading: false } });
      return error(res.err);
    }

    dispatch({ type: "NOTIFY", payload: { loading: false } });
    return success(res.msg);
  };

  return (
    <DashboardLayout>
      <div
        className="container mt-30 rounded-3 p-4"
        style={{ background: "#fff" }}
      >
        <h4>Coupon Manager</h4>

        <div className="row mt-20 p-4 ">
          <div className="col-lg-7">
            <label className="m-check-label fz-14">Discount Type</label>

            <div className="sign__action d-flex mb-20">
              <div className="sign__agree d-flex align-items-center mt-10 mr-50">
                <input
                  required=""
                  className="m-check-input"
                  type="checkbox"
                  id="percentage"
                  checked={disType.percentage}
                  onChange={disTypeHandler}
                />
                <label className="m-check-label fz-14" for="m-percentage ">
                  Percentage
                </label>
              </div>
              <div className="sign__agree d-flex align-items-center mt-10 dis_type">
                <input
                  required=""
                  className="m-check-input"
                  type="checkbox"
                  id="fixed"
                  checked={disType.fixed}
                  onChange={disTypeHandler}
                />
                <label className="m-check-label fz-14" for="m-fixed">
                  Fixed Amount Discount
                </label>
              </div>
            </div>
            <div className="mb-10">
              <label htmlFor="coupon_amt" className="my-2 fz-14">
                Amount or Percentage (without '%' or '₹')
              </label>
              <input
                type="text"
                name="amt"
                value={couponData.amount}
                placeholder="Amount / Percentage"
                className="d-block w-100 p-2 product_input"
                onChange={(e) =>
                  setCouponData({ ...couponData, amount: e.target.value })
                }
                id="coupon_amt"
              />
            </div>
            <div className="row">
              <div className="col-lg-4">
                <label htmlFor="pro_title" className="my-2 fz-14">
                  Expiry
                </label>
                <input
                  type="date"
                  name="date"
                  placeholder="Date"
                  className="d-block mb-4 w-100 p-2 product_input"
                  onChange={(e) =>
                    setCouponData({ ...couponData, expiry: e.target.value })
                  }
                  id="pro_date"
                />
              </div>
              <div className="col-lg-4">
                <label htmlFor="coupon_amt" className="my-2 fz-14">
                  Maximum Discount
                </label>
                <input
                  type="text"
                  name="dis"
                  value={couponData.max_limit}
                  placeholder="Amount"
                  className="d-block w-100 p-2 product_input"
                  onChange={(e) =>
                    setCouponData({ ...couponData, max_limit: e.target.value })
                  }
                  id="coupon_dis"
                />
              </div>
              <div className="col-lg-4">
                <label htmlFor="coupon_amt" className="my-2 fz-14">
                  Min Order Amount
                </label>
                <input
                  type="text"
                  name="amt"
                  value={couponData.min_amt}
                  placeholder="Amount"
                  className="d-block w-100 p-2 product_input"
                  onChange={(e) =>
                    setCouponData({ ...couponData, min_amt: e.target.value })
                  }
                  id="coupon_amt"
                />
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div>
              <label htmlFor="coupon_amt" className="my-2 fz-14">
                Enter Coupon Code
              </label>
              <input
                type="text"
                name="amt"
                value={couponData.code}
                placeholder="Code"
                className="d-block w-100 p-2 product_input"
                onChange={(e) =>
                  setCouponData({ ...couponData, code: e.target.value })
                }
                id="coupon_amt"
                style={{ height: "15vh", textAlign: "center" }}
              />

              <div className="sign__action d-flex mt-10">
                <div className="sign__agree d-flex align-items-center mt-10 mr-50">
                  <input
                    required=""
                    className="m-check-input"
                    type="checkbox"
                    id="m-percentage"
                    checked={couponData.free_ship}
                    onChange={(e) =>
                      setCouponData({
                        ...couponData,
                        free_ship: !couponData.free_ship,
                      })
                    }
                  />
                  <label className="m-check-label fz-16" for="m-percentage ">
                    Allow Free Shipping
                  </label>
                </div>
              </div>
              <div>
                <button className="btn btn-info mt-10" onClick={handleSubmit}>
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <table className="table w-100">
            <thead>
              <tr>
                <th></th>
                <th>Code</th>
                <th>Discount Type</th>
                <th>Amount / Percentage</th>
                <th>Expiry</th>
                <th>Maximum Limit</th>
                <th>Minimum Order</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {coupons &&
                coupons.map((user, index) => (
                  <tr key={user._id} style={{ cursor: "pointer" }}>
                    <th>{index + 1}</th>
                    <th>{user.code}</th>
                    <th>
                      {user.dis_type[0].toUpperCase() + user.dis_type.slice(1)}
                    </th>
                    <th>{user.amount}</th>
                    <th>{`${new Date(user.expiry).getDate()} / ${
                      new Date(user.expiry).getMonth() + 1
                    } / ${new Date(user.expiry).getFullYear()} `}</th>
                    <th>{user.max_limit}</th>
                    <th>{user.min_amt}</th>

                    <th>
                      {auth.user.role != "user" &&
                      auth.user.role != "seller" &&
                      auth.user.role != "print" ? (
                        <i
                          className="fas fa-trash-alt text-danger ml-10"
                          title="Remove"
                          data-toggle="modal"
                          data-target="#exampleModal"
                          onClick={() => {
                            dispatch({
                              type: "ADD_MODAL",
                              payload: [
                                {
                                  data: coupons,
                                  id: user._id,
                                  title: user.code,
                                  type: "DELETE_COUPON",
                                },
                              ],
                            });
                            document.querySelector("#open-modal").click();
                          }}
                        ></i>
                      ) : (
                        <i
                          className="fas fa-trash-alt text-danger ml-10"
                          title="Remove"
                        ></i>
                      )}
                    </th>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Coupons;
