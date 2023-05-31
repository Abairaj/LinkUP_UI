import React from "react";
import { Box } from "@mui/material";
import "./adminhome.scss";


export default function AdminHome() {
  return (
    <div className="admin_home">
      <div className="user_statistics">
        <Box className="user_statistics_item" >
            <h1>Total Users</h1>
            <h5>1453</h5>
        </Box>


        <Box className="user_statistics_item" >
            <h1>Users Online</h1>
            <h5>1453</h5>
        </Box>

        <Box className="user_statistics_item" >
            <h1>Total Users</h1>
            <h5>1453</h5>
        </Box>
      </div>

      <div className="charts">

      </div>
    </div>
  );
}
