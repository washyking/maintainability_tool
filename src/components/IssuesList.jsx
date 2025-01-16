import React from "react";

const IssuesList = ({ issues }) => (
  <div>
    <h3>List of Issues</h3>
    {issues.length > 0 ? (
      <table>
        <thead>
          <tr>
            <th>Rule</th>
            <th>Line(s)</th>
            <th>Severity</th>
            <th>Documentation</th>
          </tr>
        </thead>
        <tbody>
          {issues.map((issue, index) => (
            <tr key={index}>
              <td>{issue.ruleId}</td>
              <td>{issue.line}</td>
              <td>{issue.severity === 2 ? "Error" : "Warning"}</td>
              <td>
                <a
                  href={`https://eslint.org/docs/rules/${issue.ruleId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Rule Info
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p>No issues found for this file.</p>
    )}
  </div>
);

export default IssuesList;
