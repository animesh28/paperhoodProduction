import { useContext } from "react";
import { useState, useEffect } from "react";
import DashboardLayout from "../layouts/dashboard-layout";
import { DataContext } from "../store/GlobalState";
import InfoCard from "../components/infoCard";
import { getData } from "../server_utils/fetchData";
import BarGraph from "../components/BarGraph";
import PieChart from "../components/PieChart";

function Sales({ productList }) {
  const [state, dispatch] = useContext(DataContext);
  const { auth, categories } = state;
  const [revenue, setRevenue] = useState(0);
  const [royalty, setRoyalty] = useState(0);
  const [paperhoodRevenue, setPaperhoodRevenue] = useState(0);
  const [myProducts, setMyProducts] = useState(null);

  useEffect(() => {
    if (productList && auth.user)
      setMyProducts(
        productList.filter((cardData) => cardData.user === auth.user.id)
      );
  }, [productList, auth]);

  useEffect(() => {
    if (myProducts && auth.user) {
      setRevenue(
        myProducts.reduce(function (accumulator, currentValue) {
          return accumulator + currentValue.sold * currentValue.price;
        }, 0)
      );

      setRoyalty(
        myProducts.reduce(function (accumulator, currentValue) {
          return (
            accumulator +
            (currentValue.sold * currentValue.price -
              currentValue.sold * currentValue.printing_price)
          );
        }, 0)
      );
    }
  }, [myProducts, auth]);

  const infoCardDetails = [
    {
      title: "Store Revenue",
      content: `₹ ${revenue} /-`,
      status: "+2.5%",
      history: "",
    },
    {
      title: "Royalty",
      content: `₹ ${royalty} /-`,
      status: "+2.5%",
      history: "",
    },
    {
      title: "Printing Revenue",
      content: `₹ ${0} /-`,
      status: "+2.5%",
      history: "",
    },
  ];

  const revenuePieData = {
    labels: ["Store", "Printing"],
    datasets: [
      {
        data: [300, 50],
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  };

  const [categoryLabel, setCategoryLabel] = useState([]);

  useEffect(() => {
    if (categories) {
      setCategoryLabel(categories.map((cat) => cat.name));
    }
  }, [categories]);

  const category = {
    labels: categoryLabel,
    datasets: [
      {
        data: [300, 50, 200],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };
  return (
    <DashboardLayout>
      <div className="row px-4 mt-30">
        {infoCardDetails.map((details, i) => (
          <InfoCard key={`card${details.title}${i + 1}`} details={details} />
        ))}
      </div>
      <div>
        <BarGraph />
      </div>

      <div className="row d-flex mt-30 px-4">
        <div className="col-lg-6 justify-content-center">
          <PieChart title="Revenue Partition" data={revenuePieData} />
        </div>
        <div className="col-lg-6">
          <PieChart title="Trending Category" data={category} />
        </div>
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
