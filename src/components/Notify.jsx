import { toast } from "react-toastify";
import { useContext } from "react";
import { DataContext } from "../store/GlobalState";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useState } from "react";

export const success = (msg) => {
  toast.success(msg, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

export const error = (msg) => {
  toast.error(msg, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

const Notify = () => {
  const [state, dispatch] = useContext(DataContext);
  const { notify, cart } = state;

  const successMsg = (msg) => {
    toast.success(msg, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

    dispatch({ type: "NOTIFY", payload: {} });
  };

  const errorMsg = (msg) => {
    toast.error(msg, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    dispatch({ type: "NOTIFY", payload: {} });
  };

  return (
    notify && (
      <>
        {notify.error && errorMsg(notify.error)}

        {notify.success && successMsg(notify.error)}
      </>
    )
  );
};

export default Notify;
