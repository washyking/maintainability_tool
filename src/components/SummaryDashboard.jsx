import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import './styles/SummaryDashboard.css';

// Register chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const SummaryDashboard = ({ summary }) => {
  const results = summary.results || []; // Safeguard against undefined results

  // Calculate passing and failing files
  const totalFiles = results.length;
  const failingFiles = results.filter(file => file.errorCount > 0).length;
  const passingFiles = totalFiles - failingFiles; // Remaining files are passing

  console.log('Total Files:', totalFiles);
  console.log('Failing Files:', failingFiles);
  console.log('Passing Files:', passingFiles);

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

  console.log('Pie Chart Data:', JSON.stringify(pieData, null, 2));

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
      <div className="pie-chart" style={{ width: '400px', height: '400px' }}>
        <Pie data={pieData} />
        <p>% of files passing rules</p>
      </div>
    </div>
  );
};

export default SummaryDashboard;
