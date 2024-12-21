import { useEffect, useState } from 'preact/hooks';
import { Chart } from 'chart.js/auto';

const ResultsPage = () => {
  const [data, setData] = useState(null);
  const baseUrl = 'http://localhost:8080';

  useEffect(() => {
    // Fetch results.json
    fetch('/lighthouse-reports/results.json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((err) => console.error('Error loading results.json:', err));
  }, []);

  useEffect(() => {
    if (data) {
      // Create Chart after data is loaded
      const canvasElement = document.getElementById('lighthouseChart');
      if (canvasElement instanceof HTMLCanvasElement) {
        const ctx = canvasElement.getContext('2d');

        // Shorten URLs for X-axis labels
        const shortenedLabels = Object.keys(data).map(url => 
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
            labels: truncatedLabels, // Use shortened or truncated labels
            datasets: [
              {
                label: 'Performance',
                data: Object.values(data).map((metrics) => metrics.performance.score * 100),
                backgroundColor: '#4BC0C0',
                borderColor: '#36A2EB',
                borderWidth: 1,
              },
              {
                label: 'Accessibility',
                data: Object.values(data).map((metrics) => metrics.accessibility.score * 100),
                backgroundColor: '#FF6384',
                borderColor: '#FF6384',
                borderWidth: 1,
              },
              {
                label: 'SEO',
                data: Object.values(data).map((metrics) => metrics.seo.score * 100),
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
                text: 'Lighthouse Metrics for Preact Codebase',
              },
              tooltip: {
                callbacks: {
                  title: (context) => {
                    const fullUrl = Object.keys(data)[context[0].dataIndex]; // Access the full URL
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
    }
  }, [data]);

  return (
    <div>
      <h1>Lighthouse Results</h1>
      <canvas id="lighthouseChart" width="400" height="200"></canvas>
      {!data && <p>Loading results...</p>}
    </div>
  );
};

export default ResultsPage;
