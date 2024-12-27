import React, { useEffect, useState } from 'react';
import parseEslintResults from '../utils/parseEslintResults';
import summarizeResults from '../utils/summarizeResults';
import SummaryDashboard from './SummaryDashboard';
import RulesTable from './RulesTable';
import FileHeatmap from './FileHeatmap';
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
        const { customRules, genericRules, parsingErrors } = parseEslintResults(results);
        console.log('Parsed Results:', { customRules, genericRules, parsingErrors });

        // Summarize the results and include the raw results
        const summary = {
          ...summarizeResults(customRules, genericRules, parsingErrors),
          results: results.results, // Include the raw results array
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
      <FileHeatmap summary={data.summary} />

      <Divider title="Top Issues" />
      {/* Display custom and generic rules in a table */}
      <RulesTable customRules={data.customRules} genericRules={data.genericRules} />

      {/* Display parsing errors separately */}
      {data.parsingErrors.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h3>Parsing Errors</h3>
          <ul>
            {data.parsingErrors.map((error, index) => (
              <li key={index}>
                <strong>{error.message}</strong>
                <br />
                File: <code>{error.filePath}</code>, Line: {error.line}, Column: {error.column}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ESLintResults;
