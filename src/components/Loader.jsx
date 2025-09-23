import React from "react";
import "./Loader.css";

const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="content-loader">
      <div className="spinner"></div>
      <p>{text}</p>
    </div>
  );
};

export default Loader;
