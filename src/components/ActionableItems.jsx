import React, { useState } from "react";

const ActionableItems = ({ summary }) => {
  const { results = [] } = summary;

  // Group issues based on severity
  const groupedIssues = results.reduce(
    (acc, file) => {
      file.messages.forEach((message) => {
        const severity =
          message.severity === 2
            ? "Critical"
            : message.severity === 1
            ? "Optimizations"
            : "Best Practices";

        acc[severity].push({
          filePath: file.filePath,
          message: message.message,
          ruleId: message.ruleId || "Unknown Rule",
        });
      });
      return acc;
    },
    { Critical: [], Optimizations: [], "Best Practices": [] }
  );

  // State for managing expanded sections (default all open)
  const [expandedSections, setExpandedSections] = useState({
    Critical: true,
    Optimizations: true,
    "Best Practices": true,
  });

  const toggleSection = (category) => {
    setExpandedSections((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  // Generate items with expand/collapse logic
  const generateItems = (category, limit) => {
    const issues = groupedIssues[category];
    const isExpanded = expandedSections[category];
    const itemsToShow = isExpanded ? issues.slice(0, limit) : [];
  
    return (
      <div>
        <ul>
          {itemsToShow.map((issue, index) => (
            <li key={index} style={{ marginBottom: "10px" }}>
              <strong>Rule:</strong> {issue.ruleId} <br />
              <strong>File:</strong> {issue.filePath} <br />
              <strong>Message:</strong> {issue.message}
            </li>
          ))}
        </ul>
        {issues.length > limit && (
          <button
            style={{
              marginTop: "10px",
              background: "none",
              color: "#36A2EB",
              border: "none",
              cursor: "pointer",
              textDecoration: "underline",
            }}
            onClick={() => toggleSection(category)}
          >

          </button>
        )}
      </div>
    );
  };
  

  return (
    <div style={{ width: "70%", margin: "0 auto", color: "#fff" }}>

      {/* Critical Fixes */}
      <div
        style={{
          borderBottom: "1px solid #444",
          paddingBottom: "10px",
          marginBottom: "10px",
        }}
      >
        <h3
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          onClick={() => toggleSection("Critical")}
        >
          <span style={{ marginRight: "10px", color: "red" }}>Critical Fixes</span>
          <span style={{ transform: expandedSections.Critical ? "rotate(180deg)" : "rotate(0)" }}>
            ▼
          </span>
        </h3>
        {generateItems("Critical", 5)}
      </div>

      {/* Optimizations */}
      <div
        style={{
          borderBottom: "1px solid #444",
          paddingBottom: "10px",
          marginBottom: "10px",
        }}
      >
        <h3
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          onClick={() => toggleSection("Optimizations")}
        >
          <span style={{ marginRight: "10px", color: "orange" }}>Optimizations</span>
          <span
            style={{
              transform: expandedSections.Optimizations ? "rotate(180deg)" : "rotate(0)",
            }}
          >
            ▼
          </span>
        </h3>
        {generateItems("Optimizations", 5)} {/* Limit to 5 */}
      </div>

      {/* Best Practices */}
      <div>
        <h3
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          onClick={() => toggleSection("Best Practices")}
        >
          <span style={{ marginRight: "10px", color: "green" }}>Best Practices</span>
          <span
            style={{
              transform: expandedSections["Best Practices"] ? "rotate(180deg)" : "rotate(0)",
            }}
          >
            ▼
          </span>
        </h3>
        {generateItems("Best Practices", 3)} {/* Optional: Limit to 3 */}
      </div>
    </div>
  );
};

export default ActionableItems;
