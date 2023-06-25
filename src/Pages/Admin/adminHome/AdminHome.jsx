import React, { useEffect, useState, useRef } from "react";
import { Box } from "@mui/material";
import "./adminhome.scss";
import axiosInstance from "../../../axosInstance";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

export default function AdminHome() {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  );

  const chartRef = useRef(null);
  const doughnutChartRef = useRef(null);
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState(null);

  const fetchUserCount = () => {
    axiosInstance
      .get(`admin/dashboard_data/`)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
        const registrations = response.data.user_per_day.map(
          (item) => item.registrations
        );
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

    return () => {
      if (chartRef.current !== null) {
        chartRef.current.destroy();
      }
      if (doughnutChartRef.current !== null) {
        doughnutChartRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (chartData) {
      if (chartRef.current === null) {
        chartRef.current = new ChartJS("chart", {
          type: "bar",
          data: chartData,
          options: options,
        });
      } else {
        chartRef.current.data = chartData;
        chartRef.current.update();
      }
    }
  }, [chartData]);

  // Custom doughnut chart data for deleted posts and total posts
  const doughnutChartData = {
    labels: ["Deleted Posts", "Total Posts"],
    datasets: [
      {
        data: [data.deleted_post_count, data.post_count],
        backgroundColor: ["red", "green"],
      },
    ],
  };

  useEffect(() => {
    if (data && data.post_count && data.deleted_post_count) {
      if (doughnutChartRef.current === null) {
        doughnutChartRef.current = new ChartJS("doughnutChart", {
          type: "doughnut",
          data: doughnutChartData,
          options: options,
        });
      } else {
        doughnutChartRef.current.data = doughnutChartData;
        doughnutChartRef.current.update();
      }
    }
  }, [data]);

  return (
    <div className="admin_home">
      <div className="scroll_box">
        <div className="scroll_content">
          <Box className="scrollitem">
            <h1>Total Users</h1>
            <h5>{data && data.user_count}</h5>
          </Box>

          <Box className="scrollitem">
            <h1>Total Posts</h1>
            <h5>{data && data.post_count}</h5>
          </Box>

          <Box className="scrollitem">
            <h1>Deleted Posts</h1>
            <h5>{data && data.deleted_post_count}</h5>
          </Box>
        </div>
      </div>

      <div className="charts">
        <div className="chart">
          <canvas id="chart"></canvas>
        </div>
        <div className="chart">
          <canvas id="doughnutChart"></canvas>
        </div>
      </div>
    </div>
  );
}
