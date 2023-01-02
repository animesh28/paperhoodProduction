import React from "react";
import { Doughnut } from "react-chartjs-2";

export default ({ title, data }) => (
  <div className="container d-flex flex-column justify-content-center align-items-center">
    <h5>{title}</h5>
    <Doughnut
      data={data}
      width={300}
      height={300}
      options={{
        responsive: false,
        maintainAspectRatio: false,
      }}
    />
  </div>
);
