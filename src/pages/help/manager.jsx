import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { error, success } from "../../components/Notify";
import DashboardLayout from "../../layouts/dashboard-layout";
import { patchData } from "../../server_utils/fetchData";
import { DataContext } from "../../store/GlobalState";
import Link from "next/link";
import { updateItem } from "../../store/Actions";

function manager() {
  const [state, dispatch] = useContext(DataContext);
  const { tickets, auth } = state;

  const handleResolve = (order) => {
    dispatch({ type: "NOTIFY", payload: { loading: true } });

    patchData(`help/resolve/${order._id}`, null, auth.token).then((res) => {
      if (res.err) {
        dispatch({ type: "NOTIFY", payload: { loading: false } });
        return error(res.err);
      }

      const { status } = res.result;

      dispatch(
        updateItem(
          tickets,
          order._id,
          {
            ...order,
            status,
          },
          "ADD_TICKET"
        )
      );
      dispatch({ type: "NOTIFY", payload: { loading: false } });
      return success(res.msg);
    });
  };

  const handleRaise = (order) => {
    dispatch({ type: "NOTIFY", payload: { loading: true } });

    patchData(`help/raise/${order._id}`, null, auth.token).then((res) => {
      if (res.err) {
        dispatch({ type: "NOTIFY", payload: { loading: false } });
        return error(res.err);
      }

      const { status } = res.result;

      dispatch(
        updateItem(
          tickets,
          order._id,
          {
            ...order,
            status,
          },
          "ADD_TICKET"
        )
      );
      dispatch({ type: "NOTIFY", payload: { loading: false } });
      return success(res.msg);
    });
  };
  return (
    <DashboardLayout>
      <div className="container mt-30">
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
                <td className="p-2">status</td>
                <td className="p-2">Action</td>
              </tr>
            </thead>

            <tbody>
              {tickets.length > 0 &&
                tickets.map((order) => (
                  <tr key={order._id}>
                    <td className="p-2">
                      <Link href={`${order._id}`}>
                        <a>{order._id}</a>
                      </Link>
                    </td>
                    <td className="p-2">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-2">{order.issue}</td>
                    <td className="p-2">
                      {order.status ? (
                        <i className="fas fa-check text-success"></i>
                      ) : (
                        <i className="fas fa-times text-danger"></i>
                      )}
                    </td>
                    <td className="p-2">
                      {auth.user.role != "user" && !order.status ? (
                        <button
                          className="btn btn-dark text-uppercase ml-20"
                          onClick={() => handleResolve(order)}
                        >
                          Mark as resolved
                        </button>
                      ) : (
                        <button
                          className="btn btn-dark text-uppercase ml-20"
                          onClick={() => handleRaise(order)}
                        >
                          Re-raise ticket
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default manager;
