import React from 'react';
import { Pie } from 'react-chartjs-2';
import './SummaryDashboard.css'; // Import your CSS file for styling

const SummaryDashboard = ({ summary }) => {
  // Data for the pie chart
  const pieData = {
    labels: ['Passing', 'Failing'],
    datasets: [
      {
        data: [
          summary.custom.count - summary.custom.severity.error, // Assuming this is the passing count
          summary.custom.severity.error, // Failing count
        ],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  return (
    <div className="summary-dashboard">
      <div className="sections-container">
        <div className="section">
          <h3>Preact Specific Rules</h3>
          <div className="glowing-box-row">
            <div className="glowing-box-container">
              <div className="glowing-box">
                <p>{summary.custom.severity.error}</p>
              </div>
              <p>Error count</p>
            </div>
            <div className="glowing-box-container">
              <div className="glowing-box">
                <p>{summary.custom.occurrences}</p>
              </div>
              <p>Error occurrences</p>
            </div>
          </div>
        </div>
        <div className="section">
          <h3>General JavaScript Rules</h3>
          <div className="glowing-box-row">
            <div className="glowing-box-container">
              <div className="glowing-box">
                <p>{summary.generic.severity.error}</p>
              </div>
              <p>Error count</p>
            </div>
            <div className="glowing-box-container">
              <div className="glowing-box">
                <p>{summary.generic.occurrences}</p>
              </div>
              <p>Error occurrences</p>
            </div>
          </div>
        </div>
      </div>
      <div className="pie-chart">
        <Pie data={pieData} />
        <p>% of files passing rules</p>
      </div>
    </div>
  );
};

export default SummaryDashboard; 