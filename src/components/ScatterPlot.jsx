import React from 'react';
import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Legend, LinearScale, PointElement } from 'chart.js';

ChartJS.register(Tooltip, Legend, LinearScale, PointElement);

const ScatterPlot = ({ summary }) => {
  const { results = [] } = summary;

  // Process data for scatter plot
  const dataPoints = results.flatMap((file) =>
    file.messages.map((message) => ({
      x: file.errorCount + file.warningCount, // Frequency
      y: message.severity === 2 ? 3 : message.severity === 1 ? 2 : 1, // Map severity to levels (3=Critical, 2=High, 1=Low)
      filePath: file.filePath,
    }))
  );

  // Prepare dataset
  const scatterData = {
    datasets: [
      {
        label: 'Files',
        data: dataPoints.map((point) => ({
          x: point.x,
          y: point.y,
        })),
        pointBackgroundColor: '#000',
        pointBorderColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#FF6384',
        pointHoverBorderColor: 'white',
        pointRadius: 4,
      },
    ],
  };

  // Scatter plot options with gradient
  const scatterOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'linear',
        title: {
          display: true,
          text: 'Frequency of Errors',
          color: '#cccccc',
        },
        ticks: {
          color: '#cccccc',
        },
        grid: {
          color: '#444',
        },
      },
      y: {
        type: 'linear',
        min: 1, // Minimum severity level
        max: 3.5, // Extend max slightly for full visibility
        title: {
          display: true,
          text: 'Severity (1=Low, 3=Critical)',
          color: '#cccccc',
        },
        ticks: {
          stepSize: 0.5,
          color: '#cccccc',
        },
        grid: {
          color: '#444',
        },
      },
    },
    layout: {
      padding: 20,
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const dataIndex = context.dataIndex;
            const file = dataPoints[dataIndex];
            return `File: ${file.filePath}\nFrequency: ${file.x}, Severity: ${file.y}`;
          },
        },
      },
      legend: {
        display: true,
        labels: {
          color: 'white',
        },
      },
      title: {
        display: true,
        color: 'white',
        font: {
          size: 18,
        },
      },
      beforeDraw: (chart) => {
        const { ctx, chartArea } = chart;
  
        if (!chartArea) return; // Safeguard against uninitialized chart area
  
        const { left, top, width, height } = chartArea;
  
        // Create gradient
        const gradient = ctx.createLinearGradient(left, top, left, top + height);
        gradient.addColorStop(0, 'green'); // Low severity
        gradient.addColorStop(0.5, 'orange'); // Medium severity
        gradient.addColorStop(1, 'red'); // High severity
  
        // Fill chart area with gradient
        ctx.save();
        ctx.fillStyle = gradient;
        ctx.fillRect(left, top, width, height);
        ctx.restore();
      },
    },
  };
  

  return (
    <div style={{ padding: '20px', background: '#1e1e1e', borderRadius: '8px' }}>
      <h2 style={{ color: 'white', textAlign: 'center' }}>Severity vs Frequency Scatter Plot</h2>
      <div style={{ height: '400px' }}>
        <Scatter data={scatterData} options={scatterOptions} />
      </div>
    </div>
  );
};

export default ScatterPlot;
