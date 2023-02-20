import React from "react";
import { Pie } from "react-chartjs-2";

import { Card } from "react-bootstrap";

import usePalette from "../../hooks/usePalette";

const PieChart = ({ theData }) => {
  const palette = usePalette();

  const data = {
    labels: theData.labels,
    datasets: [
      {
        data: theData.data,
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

  if (theData.data.lenth === 0) {
    return (
      <React.Fragment>
        <h3>Votes</h3>
        <h6 className="card-subtitle text-muted"> No data to display</h6>
      </React.Fragment>
    );
  }

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
