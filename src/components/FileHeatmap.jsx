import React from 'react';
import { HeatMapGrid } from 'react-grid-heatmap';

const FileHeatmap = ({ summary }) => {
  const results = summary.results || []; // Safeguard against undefined results

  // Aggregate errors and warnings for each file
  const aggregatedData = results.reduce((acc, file) => {
    const { filePath, errorCount, warningCount } = file;
    if (!acc[filePath]) {
      acc[filePath] = { errorCount: 0, warningCount: 0 };
    }
    acc[filePath].errorCount += errorCount || 0;
    acc[filePath].warningCount += warningCount || 0;
    return acc;
  }, {});

  // Prepare data for the heatmap
  const xLabels = ['Errors', 'Warnings'];
  const yLabels = Object.keys(aggregatedData).map(filePath =>
    filePath.split('/').slice(-2).join('/')
  ); // Shorten file paths
  const data = Object.values(aggregatedData).map(entry => [
    entry.errorCount,
    entry.warningCount,
  ]);

  // Find max value for dynamic gradient
  const maxValue = Math.max(...data.flat());

  return (
    <div style={{ padding: '20px', background: '#1e1e1e', borderRadius: '8px' }}>
      <h2 style={{ color: 'white', textAlign: 'center' }}>File-Based Heatmap</h2>
      {data.length > 0 ? (
        <HeatMapGrid
          data={data}
          xLabels={xLabels}
          yLabels={yLabels}
          // Render cell content as exact counts
          cellRender={(_x, _y, value) => (value !== undefined ? `${value}` : '')}
          // Apply gradient color based on value
          cellStyle={(_x, _y, value) => ({
            background: value
              ? `rgba(255, 0, 0, ${value / maxValue})` // Red gradient
              : 'transparent',
            color: value > 0.5 * maxValue ? 'white' : 'black', // Ensure contrast
            border: '1px solid #444', // Add borders for differentiation
            fontSize: '0.8rem',
            textAlign: 'center',
          })}
          cellHeight="2.5rem"
          xLabelsStyle={() => ({
            color: '#cccccc', // Make labels readable
            fontSize: '1rem',
            textAlign: 'center',
          })}
          yLabelsStyle={() => ({
            color: '#cccccc', // Make labels readable
            fontSize: '0.9rem',
            textAlign: 'right',
          })}
          square={false} // Make rectangular cells
        />
      ) : (
        <p style={{ color: 'white', textAlign: 'center' }}>
          No file data available for heatmap.
        </p>
      )}
    </div>
  );
};

export default FileHeatmap;
