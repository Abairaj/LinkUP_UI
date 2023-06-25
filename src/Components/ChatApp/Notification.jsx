import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useSocket } from "../../SocketProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const NotificationsTrigger = () => {
  const notification = useSelector((state) => state.notification);
  const socket = useSocket();

  useEffect(() => {
    console.log("useeffect working.............");
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data).message;
      if (message.event === "notification") {
        toast.info(notification);
      }
    };
  }, [notification]);



  return (
 <></>
  );
};
