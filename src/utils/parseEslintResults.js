const parseEslintResults = (eslintData) => {
  const { results, summary } = eslintData;

  if (!Array.isArray(results)) {
    console.error("Unexpected results format. 'results' should be an array.");
    return { customRules: [], genericRules: [], parsingErrors: [] };
  }

  const customRules = [];
  const genericRules = [];
  const parsingErrors = [];

  results.forEach((result) => {
    result.messages.forEach((message) => {
      const rule = {
        ruleId: message.ruleId || 'Parsing Error',
        severity: message.severity === 2 ? 'Error' : 'Warning',
        filePath: result.filePath,
        message: message.message,
        fatal: message.fatal || false,
        line: message.line,
        column: message.column,
      };

      if (message.ruleId) {
        // Categorize as custom or generic based on ruleId
        if (message.ruleId.startsWith('custom/')) {
          customRules.push(rule);
        } else {
          genericRules.push(rule);
        }
      } else {
        // Categorize as a parsing error
        parsingErrors.push(rule);
      }
    });
  });

  return {
    customRules,
    genericRules,
    parsingErrors,
    summary, // Include the summary for further use
  };
};

export default parseEslintResults;
