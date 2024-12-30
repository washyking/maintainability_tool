const parseEslintResults = (eslintData) => {
  if (!eslintData || typeof eslintData !== "object") {
    console.error("Invalid ESLint data format. Expected an object.");
    console.log("Received data:", eslintData);
    return { customRules: [], genericRules: [], parsingErrors: [], severityCounts: {} };
  }

  const { results } = eslintData;

  if (!Array.isArray(results)) {
    console.error("Unexpected results format. 'results' should be an array.");
    console.log("Received results:", results);
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
    if (!result || !Array.isArray(result.messages)) {
      console.warn(`Skipping malformed result for file: ${result.filePath}`);
      return;
    }

    result.messages.forEach((message) => {
      const severityLevel =
        message.fatal
          ? "Critical"
          : message.severity === 2
          ? "High"
          : message.severity === 1
          ? "Medium"
          : "Low";

      severityCounts[severityLevel] += 1;

      const rule = {
        ruleId: message.ruleId || "Parsing Error",
        severity: severityLevel,
        filePath: result.filePath || "Unknown File",
        message: message.message || "No message provided",
        fatal: !!message.fatal,
        line: message.line || 0,
        column: message.column || 0,
      };

      if (message.ruleId && message.ruleId.startsWith("custom/")) {
        customRules.push(rule);
      } else if (message.ruleId) {
        genericRules.push(rule);
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
