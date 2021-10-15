import React from "react";

import PuffLoader from "react-spinners/PuffLoader";

import "./loader.scss";

const Loader = ({ isLoading }) => {
  return (
    <div className="overlay">
      <PuffLoader color={"#FFFFFF"} loading={isLoading} size={80} />
    </div>
  );
};

export default Loader;
