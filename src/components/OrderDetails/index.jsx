import Link from "next/link";
import { patchData } from "../../server_utils/fetchData";
import { updateItem } from "../../store/Actions";
import { error, success } from "../Notify";

const OrderDetail = ({ orderDetail, state, dispatch }) => {
  const { auth, orders } = state;

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

  if (!auth.user) return null;
  return (
    <>
      {orderDetail &&
        orderDetail.map((order) => (
          <div
            key={order._id}
            style={{ margin: "20px auto" }}
            className="row justify-content-around"
          >
            <div className="text-uppercase my-3" style={{ maxWidth: "600px" }}>
              <h3 className="text-break">Order {order._id}</h3>

              <div className="mt-4 text-secondary">
                <h3>Shipping</h3>
                <p>Name: {order.user.name}</p>
                <p>Email: {order.user.email}</p>
                <p>Address: {order.address}</p>
                <p>Mobile: {order.mobile}</p>

                {(auth.user.role === "admin" || auth.user.role === "op") && (
                  <div
                    className={`alert ${
                      order.delivered ? "alert-success" : "alert-danger"
                    }
                        d-flex justify-content-between align-items-center`}
                    role="alert"
                  >
                    {order.delivered
                      ? `Deliverd on ${order.updatedAt}`
                      : "Not Delivered"}
                    {(auth.user.role === "admin" || auth.user.role === "op") &&
                    !order.delivered ? (
                      <button
                        className="btn btn-dark text-uppercase"
                        onClick={() => handleDelivered(order)}
                      >
                        Mark as delivered
                      </button>
                    ) : (
                      <button
                        className="btn btn-dark text-uppercase"
                        onClick={() => handleUndelivered(order)}
                      >
                        Mark as un-delivered
                      </button>
                    )}
                  </div>
                )}

                <h3>Payment</h3>
                {order.method && (
                  <h6>
                    Method: <em>{order.method}</em>
                  </h6>
                )}

                {order.paymentId && (
                  <p>
                    PaymentId: <em>{order.paymentId}</em>
                  </p>
                )}

                <div
                  className={`alert ${
                    order.paid ? "alert-success" : "alert-danger"
                  }
                        d-flex justify-content-between align-items-center`}
                  role="alert"
                >
                  {order.paid ? `Paid on Instamojo` : "Not Paid"}
                </div>

                <div>
                  <h3>Order Items</h3>
                  {order.cart.map((item) => (
                    <div
                      className="row border-bottom mx-0 p-2 justify-content-betwenn
                                    align-items-center"
                      key={item._id}
                      style={{ maxWidth: "550px" }}
                    >
                      <img
                        src={item.images[0].url}
                        alt={item.images[0].url}
                        style={{
                          width: "50px",
                          height: "45px",
                          objectFit: "cover",
                        }}
                      />

                      <h5
                        className="text-secondary px-3 m-0"
                        style={{ width: "fit-content" }}
                      >
                        <Link href={`/product/${item._id}`}>
                          <a>{item.title}</a>
                        </Link>
                      </h5>

                      <span
                        className="text-info"
                        style={{ width: "fit-content", marginLeft: "auto" }}
                      >
                        {item.quantity} x ₹{item.price} = ₹
                        {item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {!order.paid && auth.user.role !== "admin" && (
              <div className="p-4">
                <h2 className="mb-4 text-uppercase">Total: ${order.total}</h2>
              </div>
            )}
          </div>
        ))}
    </>
  );
};

export default OrderDetail;
