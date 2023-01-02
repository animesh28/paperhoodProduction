import React from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

const data = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Dec",
  ],
  datasets: [
    {
      label: ["# of Sales"],
      data: [200, 250, 300, 200, 102, 203, 301, 1020, 99, 1002, 293, 290],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

export default () => ({
  displayName: "BarExample",

  render() {
    return (
      <div className="container mt-20 px-5">
        <h5>Sales Graph Analysis</h5>
        <Bar
          data={data}
          width={400}
          height={200}
          options={{
            maintainAspectRatio: true,
          }}
        />
      </div>
    );
  },
});
