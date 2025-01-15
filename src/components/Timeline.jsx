import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import './styles/timeline.css'; // Import the CSS file

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

const Timeline = () => {
  const [snapshots, setSnapshots] = useState([]);
  const [selectedSnapshots, setSelectedSnapshots] = useState([]);
  const [comparisonData, setComparisonData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/public/snapshots.json'); // Adjust path if necessary
        const data = await response.json();
        setSnapshots(data.snapshots || []);
      } catch (error) {
        console.error('Error fetching snapshots:', error);
      }
    };

    fetchData();
  }, []);

  // Handle snapshot selection
  const handleSnapshotSelect = (timestamp) => {
    const updatedSelection = selectedSnapshots.includes(timestamp)
      ? selectedSnapshots.filter((t) => t !== timestamp)
      : [...selectedSnapshots, timestamp];

    setSelectedSnapshots(updatedSelection);

    // If exactly two snapshots selected, calculate comparison
    if (updatedSelection.length === 2) {
      const [first, second] = updatedSelection;
      const firstSnapshot = snapshots.find((snap) => snap.timestamp === first);
      const secondSnapshot = snapshots.find((snap) => snap.timestamp === second);

      setComparisonData({
        maintainabilityIndexChange: secondSnapshot.maintainabilityIndex - firstSnapshot.maintainabilityIndex,
        linesOfCodeChange: secondSnapshot.linesOfCode - firstSnapshot.linesOfCode,
        cyclomaticComplexityChange: secondSnapshot.cyclomaticComplexity - firstSnapshot.cyclomaticComplexity,
      });
    } else {
      setComparisonData(null);
    }
  };

  // Prepare data for the chart
  const timestamps = snapshots.map((snapshot) => new Date(snapshot.timestamp).toLocaleString());
  const maintainabilityIndex = snapshots.map((snapshot) => snapshot.maintainabilityIndex);
  const cyclomaticComplexity = snapshots.map((snapshot) => snapshot.cyclomaticComplexity);
  const linesOfCode = snapshots.map((snapshot) => snapshot.linesOfCode);

  const data = {
    labels: timestamps,
    datasets: [
      {
        label: 'Maintainability Index',
        data: maintainabilityIndex,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.3,
      },
      {
        label: 'Cyclomatic Complexity',
        data: cyclomaticComplexity,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
        tension: 0.3,
      },
      {
        label: 'Lines of Code',
        data: linesOfCode,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Timestamp',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Metric Value',
        },
      },
    },
  };

  return (
    <div className="timeline-container">
      <h2 className="timeline-title">Improvement Over Time</h2>
      {snapshots.length ? (
        <>
          <Line data={data} options={options} />
          <h3 className="comparison-title">Snapshot Comparison (Compare 2 Snapshots)</h3>
          <p className="comparison-instructions">
            Select two snapshots to compare their maintainability metrics.
          </p>

          <div className="snapshot-buttons">
            {snapshots.map((snap) => (
              <button
                key={snap.timestamp}
                onClick={() => handleSnapshotSelect(snap.timestamp)}
                className={`snapshot-button ${selectedSnapshots.includes(snap.timestamp) ? 'selected' : ''}`}
              >
                {new Date(snap.timestamp).toLocaleString()}
              </button>
            ))}
          </div>
          {comparisonData && (
            <div className="comparison-results">
            <h4>Comparison Results:</h4>
            <div className="comparison-metric">
              <p>Maintainability Index Change:</p>
              <span>{comparisonData.maintainabilityIndexChange}</span>
            </div>
            <div className="comparison-metric">
              <p>Lines of Code Change:</p>
              <span>{comparisonData.linesOfCodeChange}</span>
            </div>
            <div className="comparison-metric">
              <p>Cyclomatic Complexity Change:</p>
              <span>{comparisonData.cyclomaticComplexityChange}</span>
            </div>
          </div>
          
          )}
        </>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default Timeline;
