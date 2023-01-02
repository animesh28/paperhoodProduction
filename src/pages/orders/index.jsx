import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../store/GlobalState";
import Link from "next/link";
import { imageUpload } from "../../server_utils/imageUpload";
import valid from "../../server_utils/valid";
import { patchData } from "../../server_utils/fetchData";
import { updateItem } from "../../store/Actions";
import { error, success } from "../../components/Notify";
import MainLayout from "../../layouts/main-light";
import DashboardLayout from "../../layouts/dashboard-layout";

const Profile = () => {
  const initialSate = {
    avatar: "",
    name: "",
    password: "",
    cf_password: "",
  };
  const [data, setData] = useState(initialSate);
  const { avatar, name, password, cf_password } = data;

  const [state, dispatch] = useContext(DataContext);
  const { auth, notify, orders } = state;

  useEffect(() => {
    if (auth.user) setData({ ...data, name: auth.user.name });
  }, [auth.user]);

  const handleUndelivered = (order) => {
    dispatch({ type: "NOTIFY", payload: { loading: true } });

    patchData(`order/undeliver/${order._id}`, null, auth.token).then((res) => {
      if (res.err) {
        dispatch({ type: "NOTIFY", payload: { loading: false } });
        return error(res.err);
      }

      const { paid, dateOfPayment, method } = res.result;

      dispatch(
        updateItem(
          orders,
          order._id,
          {
            ...order,
            paid,
            dateOfPayment,
            method,
            delivered: false,
          },
          "ADD_ORDERS"
        )
      );
      dispatch({ type: "NOTIFY", payload: { loading: false } });
      return success(res.msg);
    });
  };

  const handleDelivered = (order) => {
    dispatch({ type: "NOTIFY", payload: { loading: true } });

    patchData(`order/delivered/${order._id}`, null, auth.token).then((res) => {
      if (res.err) {
        dispatch({ type: "NOTIFY", payload: { loading: false } });
        return error(res.err);
      }

      const { paid, dateOfPayment, method, delivered } = res.result;

      dispatch(
        updateItem(
          orders,
          order._id,
          {
            ...order,
            paid,
            dateOfPayment,
            method,
            delivered,
          },
          "ADD_ORDERS"
        )
      );
      dispatch({ type: "NOTIFY", payload: { loading: false } });
      return success(res.msg);
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    dispatch({ type: "NOTIFY", payload: {} });
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    if (password) {
      console.log(auth.user.email);
      const errMsg = valid(
        name,
        82101186769,
        auth.user.email,
        password,
        cf_password
      );
      if (errMsg) error(errMsg);
      updatePassword();
    }

    if (name !== auth.user.name || avatar) updateInfor();
  };

  const updatePassword = () => {
    dispatch({ type: "NOTIFY", payload: { loading: true } });
    patchData("user/resetPassword", { password }, auth.token).then((res) => {
      if (res.err) {
        dispatch({ type: "NOTIFY", payload: { loading: false } });
        return error(res.err);
      }
      dispatch({ type: "NOTIFY", payload: { loading: false } });
      return success(res.msg);
    });
  };

  const changeAvatar = (e) => {
    const file = e.target.files[0];
    if (!file) return error("File does not exist.");

    if (file.size > 1024 * 1024)
      //1mb
      return error("The largest image size is 1mb.");

    if (file.type !== "image/jpeg" && file.type !== "image/png")
      //1mb
      return error("Image format is incorrect.");

    setData({ ...data, avatar: file });
  };

  const updateInfor = async () => {
    let media;
    dispatch({ type: "NOTIFY", payload: { loading: true } });

    if (avatar) media = await imageUpload([avatar]);

    patchData(
      "user",
      {
        name,
        avatar: avatar ? media[0].url : auth.user.avatar,
      },
      auth.token
    ).then((res) => {
      if (res.err) {
        dispatch({ type: "NOTIFY", payload: { loading: false } });
        return error(res.err);
      }

      dispatch({
        type: "AUTH",
        payload: {
          token: auth.token,
          user: res.user,
        },
      });
      dispatch({ type: "NOTIFY", payload: { loading: false } });
      return success(res.msg);
    });
  };

  if (!auth.user) return null;
  return (
    <DashboardLayout>
      <div className="profile_page ml-100 mr-100 mt-100">
        <Head>
          <title>Orders</title>
        </Head>

        <section className="row text-secondary my-3">
          <div className="col-md-12">
            <h3 className="text-uppercase">Orders</h3>

            <div className="my-3 table-responsive">
              <table
                className="table-bordered table-hover w-100 text-uppercase"
                style={{ minWidth: "600px", cursor: "pointer" }}
              >
                <thead className="bg-light font-weight-bold">
                  <tr>
                    <td className="p-2">id</td>
                    <td className="p-2">date</td>
                    <td className="p-2">total</td>
                    <td className="p-2">delivered</td>
                    <td className="p-2">paid</td>
                    {(auth.user.role === "admin" ||
                      auth.user.role === "op") && (
                      <td className="p-2">Action</td>
                    )}
                  </tr>
                </thead>

                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td className="p-2">
                        <Link href={`/order/${order._id}`}>
                          <a>{order._id}</a>
                        </Link>
                      </td>
                      <td className="p-2">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-2">₹ {order.total}</td>
                      <td className="p-2">
                        {order.delivered ? (
                          <i className="fas fa-check text-success"></i>
                        ) : (
                          <i className="fas fa-times text-danger"></i>
                        )}
                      </td>
                      <td className="p-2">
                        {order.paid ? (
                          <i className="fas fa-check text-success"></i>
                        ) : (
                          <i className="fas fa-times text-danger"></i>
                        )}
                      </td>
                      {(auth.user.role === "admin" ||
                        auth.user.role === "op") && (
                        <td className="p-2">
                          {!order.delivered ? (
                            <button
                              className="btn btn-dark text-uppercase ml-20"
                              onClick={() => handleDelivered(order)}
                            >
                              Mark as delivered
                            </button>
                          ) : (
                            <button
                              className="btn btn-dark text-uppercase ml-20"
                              onClick={() => handleUndelivered(order)}
                            >
                              Mark as un-delivered
                            </button>
                          )}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
