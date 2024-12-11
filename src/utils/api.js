export const fetchMetrics = async () => {
    const response = await fetch('/api/metrics');
    return await response.json();
  };
  