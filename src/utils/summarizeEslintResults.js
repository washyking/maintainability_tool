const summarizeResults = (customRules, genericRules, parsingErrors) => {
  const countOccurrences = (rules) => {
    const ruleOccurrences = {};
    rules.forEach((rule) => {
      ruleOccurrences[rule.ruleId] = (ruleOccurrences[rule.ruleId] || 0) + 1;
    });
    return {
      count: Object.keys(ruleOccurrences).length, // Unique rules
      occurrences: rules.length, // Total occurrences
    };
  };

  const customSummary = countOccurrences(customRules);
  const genericSummary = countOccurrences(genericRules);

  return {
    custom: {
      ...customSummary,
      severity: {
        error: customRules.filter(rule => rule.severity === 'Error').length,
        warning: customRules.filter(rule => rule.severity === 'Warning').length,
      },
    },
    generic: {
      ...genericSummary,
      severity: {
        error: genericRules.filter(rule => rule.severity === 'Error').length,
        warning: genericRules.filter(rule => rule.severity === 'Warning').length,
      },
    },
    parsingErrors: {
      count: parsingErrors.length,
      occurrences: parsingErrors.length,
    },
  };
};


export default summarizeResults;
