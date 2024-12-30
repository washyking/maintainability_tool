const summarizeResults = (customRules, genericRules, parsingErrors) => {
  const countOccurrences = (rules) => {
    const ruleOccurrences = {};
    rules.forEach((rule) => {
      ruleOccurrences[rule.ruleId] = (ruleOccurrences[rule.ruleId] || 0) + 1;
    });
    return {
      count: Object.keys(ruleOccurrences).length, // Unique rules violated
      occurrences: rules.length, // Total violations
    };
  };

  const calculateSeverity = (rules) => ({
    error: rules.filter((rule) => rule.severity === "High").length, // Errors (severity === 2)
    warning: rules.filter((rule) => rule.severity === "Medium").length, // Warnings (severity === 1)
  });

  const customSummary = {
    ...countOccurrences(customRules),
    severity: calculateSeverity(customRules),
  };

  const genericSummary = {
    ...countOccurrences(genericRules),
    severity: calculateSeverity(genericRules),
  };

  const parsingSummary = {
    count: parsingErrors.length, // Number of files with parsing errors
    occurrences: parsingErrors.length, // Total parsing errors
  };

  return {
    custom: customSummary,
    generic: genericSummary,
    parsingErrors: parsingSummary,
  };
};

export default summarizeResults;
