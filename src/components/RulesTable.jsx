import React from 'react';

const RulesTable = ({ customRules, genericRules, parsingErrors = [] }) => {
  const allRules = [
    ...customRules.map((rule) => ({ ...rule, category: 'Custom' })),
    ...genericRules.map((rule) => ({ ...rule, category: 'Generic' })),
    ...parsingErrors.map((error) => ({
      ruleId: 'N/A',
      category: 'Parsing Error',
      severity: 'Error',
      filePath: error.filePath,
      message: error.message,
    })),
  ];

  if (allRules.length === 0) {
    return <div>No rules to display.</div>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Rule Name</th>
          <th>Category</th>
          <th>Severity</th>
          <th>File Path</th>
          <th>Message</th>
        </tr>
      </thead>
      <tbody>
        {allRules.map((rule, index) => (
          <tr key={index}>
            <td>{rule.ruleId}</td>
            <td>{rule.category}</td>
            <td>{rule.severity}</td>
            <td>{rule.filePath}</td>
            <td>{rule.message}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RulesTable;
