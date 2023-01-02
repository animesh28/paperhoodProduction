import { IconButton } from "@mui/material";
import React from "react";
import { StatusUp } from "./AllSvgs";
import ExpandMenu from "./expand";

function InfoCard({ details }) {
  return (
    <div className="col-lg-4">
      <div className="dash_info-card">
        <div className="d-flex justify-content-between align-items-center">
          <span className="dash_info-card-title">{details.title}</span>
          <ExpandMenu />
        </div>
        <div className="mt-20 d-flex align-items-center">
          <span className="dash_info-card-content">{details.content}</span>
          <span className="dash_info-card-status">
            {details.status.slice(1)} <StatusUp />{" "}
          </span>
        </div>
        <div className="dash_info-card-history mt-10">{details.history}</div>
      </div>
    </div>
  );
}

export default InfoCard;
