import React from "react";
import { Card, Typography } from "@mui/material";
import { Chart, ArcElement, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

Chart.register(ArcElement, Tooltip);

const DoughnutChart = ({marks}) => {
  const data = {
    labels: ["Hindi", "English", "Maths", "Science", "Social", "Computer"],
    datasets: [
      {
        label: "Marks",
        data: marks,
        backgroundColor: [
          "#4e73df",
          "#1cc88a",
          "#76ff03",
          "#36b9cc",
          "#ff9800",
          "#ff1744",
        ],
        borderColor: [
          "#4e73df",
          "#1cc88a",
          "#76ff03",
          "#36b9cc",
          "#ff9800",
          "#ff1744",
        ],
        offset: 8,
        cutout: "82%",
      },
    ],
  };
  const options = {
    layout: {
      padding: 32,
    },
    scales: {
      y: {
        beginAtZero: true,
        display: false,
      },
    },
    plugins: {
      tooltip: {
        intersect: false,
        backgroundColor: "#fff",
        bodyColor: "#858796",
        bodyFont: {
          family: "sans-serif",
        },
        padding: 12,
        cornerRadius: 3,
        displayColors: false,
        borderWidth: 0.5,
        borderColor: "#858796",
      },
    },
  };

  return (
    <Card elevation={0}>
      <Typography variant="h6" sx={{ color: "#495057", fontWeight: "bold" }}>
        Subject wise performance
      </Typography>
      <Doughnut data={data} options={options} />
    </Card>
  );
};

export default DoughnutChart;
