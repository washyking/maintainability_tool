import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import './styles/SummaryDashboard.css';

// Register chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const SummaryDashboard = ({ summary }) => {
  const { custom, generic } = summary;

  // Calculate passing and failing files
  const results = summary.results || []; // Safeguard against undefined results
  const totalFiles = results.length;
  const failingFiles = results.filter((file) => file.errorCount > 0).length;
  const passingFiles = totalFiles - failingFiles; // Remaining files are passing
  const passingPercentage = totalFiles > 0 ? ((passingFiles / totalFiles) * 100).toFixed(2) : 0; // Percentage of passing files

  if (totalFiles === 0) {
    return <p>No files were analyzed.</p>;
  }

  const pieData = {
    labels: ['Passing', 'Failing'],
    datasets: [
      {
        data: [passingFiles, failingFiles],
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
                <p>{custom.count}</p>
              </div>
              <p>Distinct Errors</p>
            </div>
            <div className="glowing-box-container">
              <div className="glowing-box">
                <p>{custom.occurrences}</p>
              </div>
              <p>Error Occurrences</p>
            </div>
          </div>
        </div>
        <div className="section">
          <h3>General JavaScript Rules</h3>
          <div className="glowing-box-row">
            <div className="glowing-box-container">
              <div className="glowing-box">
                <p>{generic.count}</p>
              </div>
              <p>Distinct Errors</p>
            </div>
            <div className="glowing-box-container">
              <div className="glowing-box">
                <p>{generic.occurrences}</p>
              </div>
              <p>Error Occurrences</p>
            </div>
          </div>
        </div>
      </div>
      <div className="pie-chart" style={{ width: '400px', height: '400px' }}>
        <Pie data={pieData} />
        <p>{passingPercentage}% of files passing rules</p>
      </div>
    </div>
  );
};

export default SummaryDashboard;
