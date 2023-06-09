import React from "react";
import { InfinitySpin } from "react-loader-spinner";
import "./preloader.scss";

export default function Preloader() {
  return (
    <div className="preloader">
      <InfinitySpin />
    </div>
  );
}
