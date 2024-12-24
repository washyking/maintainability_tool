import React from 'react';
import { HeatMap } from 'react-heatmap-grid'; // Correctly import HeatMap

const FileHeatmap = ({ fileData }) => {
  // Prepare data for heatmap
  const xLabels = ['Error Count', 'Warning Count']; // Example x labels
  const yLabels = fileData.map(file => file.filePath); // Use file paths as y labels
  const data = fileData.map(file => [file.errorCount, file.warningCount]); // Prepare 2D data array

  return (
    <div>
      <h2>File-Based View</h2>
      <HeatMap
        xLabels={xLabels}
        yLabels={yLabels}
        data={data}
        squares
        onClick={(x, y) => alert(`Clicked ${x}, ${y}`)} // Example click handler
        cellStyle={(background, value, min, max) => ({
          background: `rgba(66, 86, 244, ${1 - (max - value) / (max - min)})`,
          fontSize: '11px',
        })}
        cellRender={value => value && `${value}%`}
        title={value => `${value}`}
      />
    </div>
  );
};

export default FileHeatmap; 