import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import "./adminhome.scss";
import axiosInstance from "../../../axosInstance";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

export default function AdminHome() {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState(null);

  const fetchUserCount = () => {
    axiosInstance
      .get(`admin/dashboard_data/`)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
        const registrations = response.data.user_per_day.map((item) => item.registrations);
        const chartData = {
          labels: response.data.user_per_day.map((item) => item.day),
          datasets: [
            {
              label: "Registrations",
              data: registrations,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
          ],
        };
        setChartData(chartData);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  useEffect(() => {
    fetchUserCount();

    // Cleanup function to destroy the chart instance when unmounting
    return () => {
      const chartInstance = ChartJS.getChart("chart");
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, []);

  return (
    <div className="admin_home">
      <div className="user_statistics">
        <Box className="user_statistics_item">
          <h1>Total Users</h1>
          <h5>{data && data.user_count}</h5>
        </Box>
{/* 
        <Box className="user_statistics_item">
          <h1>Users Online</h1>
          <h5>1453</h5>
        </Box> */}

        <Box className="user_statistics_item">
          <h1>Total Posts</h1>
          <h5>{data && data.post_count}</h5>
        </Box>

        <Box className="user_statistics_item">
          <h1>Deleted Posts</h1>
          <h5>{data && data.deleted_post_count}</h5>
        </Box>
      </div>

      <div id="chart" className="charts">
        <div className="chart">
        {chartData ? <Bar data={chartData} options={options} /> : null}
        </div>
        <div className="chart">
        {/* {chartData ? <Bar data={chartData} options={options} /> : null} */}
        </div>
      </div>
    </div>
  );
}
