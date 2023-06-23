import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./verifyotp.scss";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js.cookie";
import { useState } from "react";
import axiosInstance from "../../axosInstance";

export default function VerifyOTP() {
  const email = Cookies.get("email");
  const [error, setError] = useState();
  const [otp, setOTP] = useState();
  const navigate = useNavigate();

  const submitOTP = () => {
    axiosInstance
      .post(`users/verify_otp/`, { email: email, otp: otp })
      .then((response) => {
        if (response.status === 200) {
          Cookies.remove('email');
          navigate("/login");
          setError("");
        }
      })
      .catch((error) => {
        setError("The otp entered by you is not valid");
      });
  };

  return (
    <div className="verify-otp">
      <div className="center-content">
        <p style={{ color: "red" }}>{error && error}</p>
        <TextField
          className="otp-input"
          label="Your OTP here"
          variant="outlined"
          placeholder="Enter OTP"
          onChange={(e) => setOTP(e.target.value)}
        />
        <Button
          onClick={submitOTP}
          variant="contained"
          className="verify-button"
        >
          Verify
        </Button>
      </div>
    </div>
  );
}
