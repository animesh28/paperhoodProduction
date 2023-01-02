import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import Explore from "../../components/MyBooksComp";
import DashboardLayout from "../../layouts/dashboard-layout";
import { getData } from "../../server_utils/fetchData";
import { DataContext } from "../../store/GlobalState";

function MyBooks({ productList }) {
  const [state, dispatch] = useContext(DataContext);
  const { auth } = state;
  console.log(productList);
  return (
    <DashboardLayout>
      {auth && auth.user && (
        <div>
          <Explore
            productList={productList.filter(
              (item) => item.user === auth.user.id
            )}
            sales={false}
          />
        </div>
      )}
    </DashboardLayout>
  );
}

export async function getServerSideProps({ query }) {
  const page = query.page || 1;
  const category = query.category || "all";
  const sort = query.sort || "";
  const search = query.search || "all";
  const res = await getData(
    `product?category=${category}&sort=${sort}&title=${search}`
  );
  return {
    props: {
      productList: res.products,
      result: res.result,
    }, // will be passed to the page component as props
  };
}

export default MyBooks;
