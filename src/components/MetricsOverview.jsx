import React from "react";
import GaugeChart from "react-gauge-chart";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components and plugins
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartDataLabels
);

const MetricsOverview = ({ metrics }) => {
  const { maintainabilityIndex, linesOfCode, cyclomaticComplexity, halsteadVolume } = metrics;

  const barData = {
    labels: ["Lines of Code", "Cyclomatic Complexity", "Halstead Volume"],
    datasets: [
      {
        label: "Metrics",
        data: [linesOfCode, cyclomaticComplexity, halsteadVolume],
        backgroundColor: ["#4CAF50", "#FFC107", "#2196F3"],
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hides the legend
      },
      datalabels: {
        color: "#FFFFFF", // Makes data labels white
        anchor: "end",
        align: "top",
        font: {
          size: 14,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#FFFFFF", // Makes x-axis labels white
          font: {
            size: 14,
          },
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)", // Adjust gridline color if needed
        },
      },
      y: {
        ticks: {
          color: "#FFFFFF", // Makes y-axis labels white
          font: {
            size: 14,
          },
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)", // Adjust gridline color if needed
        },
      },
    },
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h3 style={{ color: "#FFFFFF" }}>Maintainability Index</h3>
      
      <GaugeChart
        id="gauge-chart"
        nrOfLevels={20}
        percent={maintainabilityIndex / 100}
        textColor="#FFFFFF" // Makes the gauge chart text white
        formatTextValue={() => `${Math.round(maintainabilityIndex)}`}
        arcsLength={[0.5, 0.3, 0.2]}
        colors={["#FF0000", "#FFC107", "#4CAF50"]}
        style={{ width: "300px" }} // Adjusts gauge size
      />
      <div style={{ width: "80%", marginBottom: "20px" }}>
        <Bar data={barData} options={barOptions} />
      </div>
    </div>
  );
};

export default MetricsOverview;
