import React from "react";
import { Link } from "react-router-dom";
import Tab from "./Tab";

const Base = ({
  title = "My Title",
  description = "My desription",
  className = "bg-dark text-white p-4",
  children
}) => (
  <div>
    <Tab />
    <div className="container-fluid mt-4">
      <div className="jumbotron bg-dark text-white text-center ">
        <h2 className="display-4">{title}</h2>
        <p className="lead">{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>
  </div>
);

export default Base;
