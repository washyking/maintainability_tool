import { useEffect, useState } from 'preact/hooks';
import { Chart } from 'chart.js/auto';
import Tab from './Tab'; // Import the Tab component

const ResultsPage = () => {
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState('lighthouse'); // Default active tab
  const baseUrl = 'http://localhost:8080';

  useEffect(() => {
    // Fetch results.json
    fetch('/lighthouse-reports/results.json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((err) => console.error('Error loading results.json:', err));
  }, []);

  const renderChart = (toolData) => {
    const canvasElement = document.getElementById('lighthouseChart');
    if (canvasElement instanceof HTMLCanvasElement) {
      const ctx = canvasElement.getContext('2d');

      // Shorten URLs for X-axis labels
      const shortenedLabels = Object.keys(toolData).map(url => 
        url.replace(baseUrl, '').replace(/^\//, '')
      );

      // Optional: Truncate long labels
      const truncateLabel = (label, maxLength = 15) => {
        return label.length > maxLength ? label.slice(0, maxLength) + '...' : label;
      };
      const truncatedLabels = shortenedLabels.map(label => truncateLabel(label));

      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: truncatedLabels,
          datasets: [
            {
              label: 'Performance',
              data: Object.values(toolData).map((metrics) => metrics.performance.score * 100),
              backgroundColor: '#4BC0C0',
              borderColor: '#36A2EB',
              borderWidth: 1,
            },
            {
              label: 'Accessibility',
              data: Object.values(toolData).map((metrics) => metrics.accessibility.score * 100),
              backgroundColor: '#FF6384',
              borderColor: '#FF6384',
              borderWidth: 1,
            },
            {
              label: 'SEO',
              data: Object.values(toolData).map((metrics) => metrics.seo.score * 100),
              backgroundColor: '#FFCE56',
              borderColor: '#FFCE56',
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: `Metrics for ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`,
            },
            tooltip: {
              callbacks: {
                title: (context) => {
                  const fullUrl = Object.keys(toolData)[context[0].dataIndex];
                  return `Page: ${fullUrl}`;
                },
                label: (context) => {
                  return `${context.dataset.label}: ${context.raw}`;
                },
              },
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'URLs',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Lighthouse score: 0–100',
              },
              grid: {
                color: 'rgba(0, 0, 0, 0.1)',
              },
            },
          },
        },
      });
    }
  };

  useEffect(() => {
    if (data) {
      renderChart(data[activeTab]); // Render chart for the active tab
    }
  }, [data, activeTab]);

  return (
    <div>
      <h1>Lighthouse Results</h1>
      <Tab 
        tabs={['lighthouse', 'tool2', 'tool3']} // Add more tools as needed
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <canvas id="lighthouseChart" width="400" height="200"></canvas>
      {!data && <p>Loading results...</p>}
    </div>
  );
};

export default ResultsPage;
