import React, { useEffect, useState } from 'react';
import parseEslintResults from '../utils/parseEslintResults';
import summarizeResults from '../utils/summarizeResults';
import SummaryDashboard from './SummaryDashboard';
import RulesTable from './RulesTable';
import ScatterPlot from './ScatterPlot';
import ActionableItems from './ActionableItems'; // Import the new component
import Divider from './Divider';

const ESLintResults = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/eslint-results.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const results = await response.json();
        console.log('Fetched ESLint results:', results);

        // Parse ESLint results
        const { customRules, genericRules, parsingErrors, severityCounts } =
          parseEslintResults(results);
        console.log('Parsed Results:', { customRules, genericRules, parsingErrors, severityCounts });

        // Summarize the results and include the raw results
        const summary = {
          ...summarizeResults(customRules, genericRules, parsingErrors),
          results: results.results, // Include the raw results array
          severityCounts, // Include severityCounts for heatmap
        };
        console.log('Summary Data:', summary);

        setData({ summary, customRules, genericRules, parsingErrors });
      } catch (error) {
        console.error('Error fetching ESLint results:', error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <SummaryDashboard summary={data.summary} />
      <Divider title="Heat Map" />
      <ScatterPlot summary={data.summary} />

      <Divider title="Top Issues" />
      <RulesTable customRules={data.customRules} genericRules={data.genericRules} />

      <Divider title="Actionable Items" />
      <ActionableItems summary={data.summary} />


      
    </div>
  );
};

export default ESLintResults;
