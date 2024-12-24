import React from 'react';
import { Pie } from 'react-chartjs-2';
import './SummaryDashboard.css'; // Import your CSS file for styling

const SummaryDashboard = ({ summary }) => {
  // Data for the pie chart
  const pieData = {
    labels: ['Errors', 'Warnings'],
    datasets: [
      {
        data: [
          summary.custom.severity.error + summary.generic.severity.error,
          summary.custom.severity.warning + summary.generic.severity.warning,
        ],
        backgroundColor: ['#FF6384', '#36A2EB'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB'],
      },
    ],
  };

  return (
    <div className="summary-dashboard">
      <div className="section">
        <h3>Custom Rules</h3>
        <div className="glowing-box-row">
          <div className="glowing-box">
            <p>Count: {summary.custom.count}</p>
          </div>
          <div className="glowing-box">
            <p>Occurrences: {summary.custom.occurrences}</p>
          </div>
        </div>
        <div className="pie-chart">
          <Pie data={pieData} />
        </div>
      </div>
      <div className="section">
        <h3>Generic Rules</h3>
        <div className="glowing-box-row">
          <div className="glowing-box">
            <p>Count: {summary.generic.count}</p>
          </div>
          <div className="glowing-box">
            <p>Occurrences: {summary.generic.occurrences}</p>
          </div>
        </div>
        <div className="pie-chart">
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  );
};

export default SummaryDashboard; 