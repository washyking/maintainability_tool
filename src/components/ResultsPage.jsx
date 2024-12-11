import { useEffect, useState } from 'preact/hooks';
import { Chart } from 'chart.js/auto';

const ResultsPage = () => {
  const [data, setData] = useState(null);

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
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: Object.keys(data).map((url) => url), // Page URLs
            datasets: [
              {
                label: 'Performance',
                data: Object.values(data).map((metrics) => metrics.performance.score * 100),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              },
              {
                label: 'Accessibility',
                data: Object.values(data).map((metrics) => metrics.accessibility.score * 100),
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
              },
              {
                label: 'SEO',
                data: Object.values(data).map((metrics) => metrics.seo.score * 100),
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                borderColor: 'rgba(255, 159, 64, 1)',
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
                text: 'Lighthouse Metrics',
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
