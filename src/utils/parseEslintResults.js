const parseEslintResults = (eslintData) => {
  const { results } = eslintData;

  if (!Array.isArray(results)) {
    console.error("Unexpected results format. 'results' should be an array.");
    return { customRules: [], genericRules: [], parsingErrors: [], severityCounts: {} };
  }

  const customRules = [];
  const genericRules = [];
  const parsingErrors = [];
  const severityCounts = {
    Critical: 0,
    High: 0,
    Medium: 0,
    Low: 0,
  };

  results.forEach((result) => {
    result.messages.forEach((message) => {
      const severityLevel =
        message.severity === 2
          ? "High"
          : message.fatal
          ? "Critical"
          : "Medium"; // Adjust severity mapping as needed

      severityCounts[severityLevel] = (severityCounts[severityLevel] || 0) + 1;

      const rule = {
        ruleId: message.ruleId || "Parsing Error",
        severity: severityLevel,
        filePath: result.filePath,
        message: message.message,
        fatal: message.fatal || false,
        line: message.line,
        column: message.column,
      };

      if (message.ruleId) {
        if (message.ruleId.startsWith("custom/")) {
          customRules.push(rule);
        } else {
          genericRules.push(rule);
        }
      } else {
        parsingErrors.push(rule);
      }
    });
  });

  return {
    customRules,
    genericRules,
    parsingErrors,
    severityCounts,
  };
};

export default parseEslintResults;
