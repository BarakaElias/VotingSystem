import React from "react";
import { Pie } from "react-chartjs-2";

import { Card } from "react-bootstrap";

import usePalette from "../../hooks/usePalette";

const PieChart = () => {
  const palette = usePalette();

  const data = {
    labels: ["Social", "Search Engines", "Direct", "Other"],
    datasets: [
      {
        data: [260, 125],
        backgroundColor: [palette.primary, "#E8EAED"],
        borderColor: "transparent",
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
  };

  return (
    <React.Fragment>
      <h3>Votes</h3>
      <h6 className="card-subtitle text-muted"></h6>

      <div className="chart chart-sm">
        <Pie data={data} options={options} />
      </div>
    </React.Fragment>
  );
};

export default PieChart;
