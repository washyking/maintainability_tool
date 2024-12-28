import React from 'react';
import './styles/RulesTable.css';

const RulesTable = ({ customRules, genericRules, parsingErrors = [] }) => {
  const allRules = [
    ...customRules.map((rule) => ({ ...rule, category: 'Custom' })),
    ...genericRules.map((rule) => ({ ...rule, category: 'Generic' })),
    ...parsingErrors.map((error) => ({
      ruleId: 'Parsing Error',
      category: 'Parsing Error',
      severity: 'Error',
      filePath: error.filePath,
      message: error.message,
    })),
  ];

  // Aggregate rule occurrences
  const ruleCounts = allRules.reduce((acc, rule) => {
    acc[rule.ruleId] = (acc[rule.ruleId] || 0) + 1;
    return acc;
  }, {});

  // Sort and get the top 5 rules
  const topRules = Object.entries(ruleCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([ruleId, count]) => ({ ruleId, count }));

  // Aggregate error counts for each file
  const fileCounts = allRules.reduce((acc, rule) => {
    acc[rule.filePath] = (acc[rule.filePath] || 0) + 1;
    return acc;
  }, {});

  // Sort and get the top 5 most problematic files
  const topFiles = Object.entries(fileCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([filePath, count]) => ({ filePath, count }));

  if (allRules.length === 0) {
    return <div>No rules to display.</div>;
  }

  return (
    <div>
      {/* Top 5 Rules Violated */}
      <h3 className="title-left">Top 5 Rules Violated</h3>
      <table>
        <thead>
          <tr>
            <th>Rule Name</th>
            <th>Occurrences</th>
          </tr>
        </thead>
        <tbody>
          {topRules.map((rule, index) => (
            <tr key={index}>
              <td>{rule.ruleId}</td>
              <td>{rule.count}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Top 5 Most Problematic Files */}
      <h3 className="title-left">Top 5 Most Problematic Files</h3>
      <table>
        <thead>
          <tr>
            <th>File Path</th>
            <th>Error/Warning Count</th>
          </tr>
        </thead>
        <tbody>
          {topFiles.map((file, index) => (
            <tr key={index}>
              <td>{file.filePath}</td>
              <td>{file.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RulesTable;
