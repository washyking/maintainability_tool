import fs from "fs/promises";

export const calculateMaintainabilityIndex = (halsteadVolume, cyclomaticComplexity, linesOfCode) => {
  const ln = Math.log;
  // Adjusted coefficients for JavaScript maintainability
  const hvWeight = 2.5; // Reduced weight for Halstead Volume
  const ccWeight = 0.15; // Increased weight for Cyclomatic Complexity
  const locWeight = 10.0; // Reduced weight for Lines of Code

  const rawMI = 171 
    - hvWeight * ln(Math.max(halsteadVolume, 1)) 
    - ccWeight * cyclomaticComplexity 
    - locWeight * ln(Math.max(linesOfCode, 1));

  return Math.max(0, Math.min(100, rawMI)); // Clamp MI between 0 and 100
};

export const analyzeMetrics = (eslintResults) => {
  let totalOperators = 0;
  let totalOperands = 0;
  const uniqueOperators = new Set();
  const uniqueOperands = new Set();
  let linesOfCode = 0;
  let cyclomaticComplexity = 0;
  let totalRuleViolations = 0;

  eslintResults.forEach((result) => {
    totalRuleViolations += result.messages.length;

    result.messages.forEach((msg) => {
      if (msg.ruleId === "complexity") {
        const complexityMatch = msg.message.match(/\d+/);
        if (complexityMatch) {
          cyclomaticComplexity += parseInt(complexityMatch[0], 10);
        }
      }
    });

    if (!result.source) return;

    result.source.split("\n").forEach((line) => {
      const trimmedLine = line.trim();
      if (trimmedLine && !trimmedLine.startsWith("//")) {
        linesOfCode++;

        const operators = trimmedLine.match(/[+\-*/=<>!&|?:]/g) || [];
        const operands = trimmedLine.match(/\b\w+\b/g) || [];

        totalOperators += operators.length;
        totalOperands += operands.length;

        operators.forEach((op) => uniqueOperators.add(op));
        operands
          .filter(op => !['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'true', 'false', 'null', 'undefined'].includes(op))
          .forEach(op => uniqueOperands.add(op));
      }
    });
  });

  const halsteadVolume =
    (totalOperators + totalOperands) *
    Math.log2(Math.max(1, uniqueOperators.size + uniqueOperands.size));

  const maintainabilityIndex = calculateMaintainabilityIndex(
    halsteadVolume,
    cyclomaticComplexity,
    linesOfCode
  );

  console.log("Metrics Breakdown:");
  console.log(`- Lines of Code: ${linesOfCode}`);
  console.log(`- Cyclomatic Complexity: ${cyclomaticComplexity}`);
  console.log(`- Halstead Volume: ${halsteadVolume}`);
  console.log(`- Total Rule Violations: ${totalRuleViolations}`);
  console.log(`- Maintainability Index: ${maintainabilityIndex}`);

  return {
    maintainabilityIndex,
    linesOfCode,
    cyclomaticComplexity,
    halsteadVolume,
    totalRuleViolations,
  };
};
