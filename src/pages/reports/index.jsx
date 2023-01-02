import React from "react";
import Explore from "../../components/MyBooksComp";
import DashboardLayout from "../../layouts/dashboard-layout";
import { getData } from "../../server_utils/fetchData";
function Sales({ productList }) {
  return (
    <DashboardLayout>
      <div>
        <Explore productList={productList} sales={true} />
      </div>
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
export default Sales;
