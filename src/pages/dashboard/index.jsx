import React from "react";
import Head from "next/head";
import DashboardLayout from "../../layouts/dashboard-layout";
import InfoCard from "../../components/infoCard";
import ReactVirtualizedTable from "../../components/table";
import ExpandMenu from "../../components/expand";
import { BookSeller, OpenBook, PeopleLove } from "../../components/AllSvgs";
import LineGraph from "../../components/LineGraph";
import BarGraph from "../../components/BarGraph";
import PieChart from "../../components/PieChart";
import { useContext } from "react";
import { DataContext } from "../../store/GlobalState";
import { useEffect } from "react";
import { useRouter } from "next/router";

const infoCardDetails = [
  {
    title: "Store Sales",
    content: "782",
    status: "+2.5%",
    history: "Last month 543",
  },
  {
    title: "Store Revenue",
    content: "₹4589.00",
    status: "+3.5%",
    history: "Last month ₹5439",
  },
  {
    title: "Publisher Revenue",
    content: "₹18589.00",
    status: "-4.1%",
    history: "Last month ₹9875",
  },
];

const statsDetails = [
  {
    name: "Books",
    content: "1200",
    icon: <OpenBook />,
  },
  {
    name: "Sellers",
    content: "75",
    icon: <BookSeller />,
  },
  {
    name: "Customers",
    content: "893",
    icon: <PeopleLove />,
  },
];

const StatItem = ({ details }) => {
  return (
    <div className="dash_statistics-item">
      <div>
        <p className="dash_statistics-item-name">{details.name}</p>
        <p className="dash_statistics-item-content mt-10">{details.content}</p>
      </div>
      <div className="dash_statistics-item-icon">{details.icon}</div>
    </div>
  );
};

function Dashboard() {
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
  const [state, dispatch] = useContext(DataContext);
  const { auth } = state;
  const router = useRouter();

  useEffect(() => {
    if (
      auth &&
      auth.user &&
      auth.user.role != "admin" &&
      auth.user.role != "op"
    )
      router.push("/my-account");
  }, [auth]);

  return (
    <>
      <Head>
        <title>Paperhood - Marketplace for Books</title>
      </Head>
      <DashboardLayout className="dashboard">
        {auth && auth.user && auth.user.role === "admin" ? (
          <>
            <div className="row px-4 mt-30">
              {infoCardDetails.map((details, i) => (
                <InfoCard
                  key={`card${details.title}${i + 1}`}
                  details={details}
                />
              ))}
            </div>
            <div className="container row my-4 justify-content-center align-items-center">
              <div className="col-lg-4 justify-content-center align-items-center">
                <LineGraph />
              </div>
              <div className="col-lg-4 justify-content-center align-items-center">
                <BarGraph />
                <BarGraph />
              </div>
              <div className="col-lg-4 justify-content-center align-items-center">
                <PieChart data={revenuePieData} title="Revenue Partition" />
              </div>
            </div>
          </>
        ) : null}

        <div className="analytics_home row mt-20 px-4">
          <div className="col-lg-8">
            <ReactVirtualizedTable />
            <ReactVirtualizedTable mrgtop={true} />
          </div>
          <div className="col-lg-4 ">
            <div className="dash_statistics py-5 px-4">
              <div>
                <div className="d-flex align-items-center justify-content-between mt-20 mb-30">
                  <p className="dash_statistics-title">Statistics</p>
                  <ExpandMenu />
                </div>
              </div>
              <div>
                {statsDetails.map((details, i) => (
                  <StatItem
                    details={details}
                    key={`statsItem${details.name}${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}

export default Dashboard;
