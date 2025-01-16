import React, { useEffect, useState } from 'react';
import MetricsOverview from './MetricsOverview';
import IssuesList from './IssuesList';

const FileMetrics = ({ selectedFile }) => {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    if (selectedFile) {
      const fetchMetrics = async (filePath) => {
        try {
          const formattedFilePath = filePath.replace(/\//g, '_');
          const response = await fetch(`/metrics/${formattedFilePath}.json`);
          if (!response.ok) {
            throw new Error(`Failed to fetch metrics: ${response.status}`);
          }
          const data = await response.json();
          setMetrics(data);
        } catch (error) {
          console.error('Error fetching file metrics:', error);
          setMetrics(null);
        }
      };

      fetchMetrics(selectedFile);
    }
  }, [selectedFile]);

  return metrics ? (
    <div className="file-metrics-container">
      <MetricsOverview metrics={metrics.metrics} />
      <IssuesList issues={metrics.issues || []} />
    </div>
  ) : (
    <p>Select a file to view its metrics.</p>
  );
};

export default FileMetrics;
