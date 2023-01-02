import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../store/GlobalState";
import { useRouter } from "next/router";
import OrderDetail from "../../components/OrderDetails";
import MainLayout from "../../layouts/main-light";

const DetailOrder = () => {
  const [state, dispatch] = useContext(DataContext);
  const { orders, auth } = state;

  const router = useRouter();

  const [orderDetail, setOrderDetail] = useState([]);

  useEffect(() => {
    const newArr = orders.filter((order) => order._id === router.query.id);
    setOrderDetail(newArr);
  }, [orders]);

  if (!auth.user) return null;
  return (
    <MainLayout defaultLogoTheme="dark" defaultTheme="dark">
      <div className="my-3">
        <Head>
          <title>Detail Orders</title>
        </Head>

        <OrderDetail
          orderDetail={orderDetail}
          state={state}
          dispatch={dispatch}
        />
      </div>
    </MainLayout>
  );
};

export default DetailOrder;
