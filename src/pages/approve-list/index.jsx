import React from "react";
import { useContext } from "react";
import DashboardLayout from "../../layouts/dashboard-layout";
import { DataContext } from "../../store/GlobalState";
import { patchData } from "../../server_utils/fetchData";
import { updateItem } from "../../store/Actions";
import Head from "next/head";
import Link from "next/link";
import { success } from "../../components/Notify";
import { useEffect } from "react";
import { useState } from "react";

function ApproveListing() {
  const [state, dispatch] = useContext(DataContext);
  const { auth, users, products } = state;
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      setProductList(products);
    }
  }, [products]);

  const sellerName = (id) => {
    console.log(id);
    return users.filter((user) => user._id === id)[0].name;
  };

  const handleUnDelivered = (order) => {
    dispatch({ type: "NOTIFY", payload: { loading: true } });

    patchData(`product/disapprove/${order._id}`, null, auth.token).then(
      (res) => {
        if (res.err) {
          dispatch({ type: "NOTIFY", payload: { loading: false } });
          return error(res.err);
        }

        dispatch(
          updateItem(
            products,
            order._id,
            {
              ...order,
              approval: false,
            },
            "ADD_PRODUCT"
          )
        );

        dispatch({ type: "NOTIFY", payload: { loading: false } });

        return success(res.msg);
      }
    );
  };

  const handleDelivered = (order) => {
    dispatch({ type: "NOTIFY", payload: { loading: true } });

    patchData(`product/approve/${order._id}`, null, auth.token).then((res) => {
      if (res.err) {
        dispatch({ type: "NOTIFY", payload: { loading: false } });
        return error(res.err);
      }

      dispatch(
        updateItem(
          products,
          order._id,
          {
            ...order,
            approval: true,
          },
          "ADD_PRODUCT"
        )
      );

      dispatch({ type: "NOTIFY", payload: { loading: false } });

      return success(res.msg);
    });
  };

  return productList && users.length > 0 && auth && auth.user ? (
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
                    <td className="p-2">seller</td>
                    <td className="p-2">book title</td>
                    <td className="p-2">listed</td>
                    <td className="p-2">Action</td>
                  </tr>
                </thead>

                <tbody>
                  {productList.map((order) => (
                    <tr key={order._id}>
                      <td className="p-2">
                        <Link href={`/product/${order._id}`}>
                          <a>{order._id}</a>
                        </Link>
                      </td>
                      <td className="p-2">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-2">{sellerName(order.user)}</td>
                      <td className="p-2">{order.title}</td>
                      <td className="p-2">
                        {order.approval ? (
                          <i className="fas fa-check text-success"></i>
                        ) : (
                          <i className="fas fa-times text-danger"></i>
                        )}
                      </td>
                      <td className="p-2">
                        {(auth.user.role === "admin" ||
                          auth.user.role === "op") &&
                        !order.approval ? (
                          <button
                            className="btn btn-dark text-uppercase ml-20"
                            onClick={() => handleDelivered(order)}
                          >
                            Approve Listing
                          </button>
                        ) : (
                          <button
                            className="btn btn-dark text-uppercase ml-20"
                            onClick={() => handleUnDelivered(order)}
                          >
                            Hide Book
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  ) : (
    <DashboardLayout></DashboardLayout>
  );
}

export default ApproveListing;
