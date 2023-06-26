import React from "react";
import "./noComponent.scss";
import nodata from '../../assets/no data.jpg'

const NoCOmponenet = () => {
  return <div className="no_comp">
    <img src={nodata} alt="" />
  </div>;
};

export default NoCOmponenet;
