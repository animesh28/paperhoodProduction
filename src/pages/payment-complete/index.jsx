import { useRouter } from "next/router";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import MainLayout from "../../layouts/main-light";
import { postData } from "../../server_utils/fetchData";
import { DataContext } from "../../store/GlobalState";
import { error, success } from "../../components/Notify";
import Link from "next/link";
import { Button } from "@mui/material";

function PaymentComplete() {
  const [state, dispatch] = useContext(DataContext);
  const { auth, cart, orders } = state;
  const router = useRouter();
  const [data, setData] = useState();

  useEffect(() => {
    if (router.query && cart.length != 0 && auth.token && orders) {
      let price = 0;

      cart.forEach((item) => {
        price += item.price * item.quantity;
      });

      postData(
        "order",
        {
          address: localStorage.getItem("address"),
          mobile: localStorage.getItem("mobile"),
          cart,
          total: price,
          paymentId: router.query.payment_id,
          paid: true,
        },
        auth.token
      ).then((res) => {
        if (res.err) {
          return error(res.err);
        }
        dispatch({ type: "ADD_CART", payload: [] });

        setData({ newOrder: res.newOrder });
        return success(res.msg);
      });
    }
  }, [auth]);

  useEffect(() => {
    if (data && data.newOrder)
      dispatch({
        type: "ADD_ORDERS",
        payload: [...orders, data.newOrder],
      });
  }, [data]);

  return (
    <MainLayout defaultLogoTheme="dark" defaultTheme="dark">
      <div
        className="container d-flex flex-column justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <img
          src="img/pay.jpg"
          style={{ width: "640px", height: "274px" }}
          alt="pay"
        />
        <h4 className="mt-20">Payment Complete</h4>

        <Link href="/home">
          <Button variant="contained" className="mt-20">
            Go to Home
          </Button>
        </Link>
      </div>
    </MainLayout>
  );
}

export async function getServerSideProps() {
  // server side rendering
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default PaymentComplete;
