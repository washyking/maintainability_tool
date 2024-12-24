import React, { useEffect, useRef, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart } from "chart.js/auto";

const ESLintBarChart = () => {
  const chartRef = useRef(null);
  const [eslintData, setEslintData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/eslint-results.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setEslintData(data);
      } catch (error) {
        console.error("Failed to load ESLint data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: eslintData.map(file => file.filePath.split("/").slice(-1)[0]),
    datasets: [
      {
        label: 'Errors',
        data: eslintData.map(result => result.errorCount),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Warnings',
        data: eslintData.map(result => result.warningCount),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
    ],
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>ESLint Results</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default ESLintBarChart;
