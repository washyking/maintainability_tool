import { ESLint } from "eslint";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";
import parseEslintResults from "../utils/parseEslintResults.js";
import summarizeResults from "../utils/summarizeResults.js";
import { analyzeMetrics } from "../utils/calculateMI.js";

// Resolve __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to save snapshot
const saveSnapshot = async (metrics) => {
  const snapshotsPath = path.resolve(__dirname, "../../public/snapshots.json");
  let snapshots = [];

  try {
    const data = await fs.readFile(snapshotsPath, "utf-8");
    snapshots = JSON.parse(data).snapshots || [];
  } catch (error) {
    if (error.code !== "ENOENT") throw error; // Ignore file not found error
  }

  // Add current metrics with a timestamp
  snapshots.push({
    timestamp: new Date().toISOString(),
    ...metrics,
  });

  // Save updated snapshots back to the file
  await fs.writeFile(
    snapshotsPath,
    JSON.stringify({ snapshots }, null, 2)
  );

  console.log(`Snapshot saved to: ${snapshotsPath}`);
};

// Function to save individual file metrics
const saveFileMetrics = async (eslintResults, projectPath) => {
  const metricsDir = path.resolve(__dirname, "../../public/metrics");
  await fs.mkdir(metricsDir, { recursive: true });

  for (const result of eslintResults) {
    const relativePath = path.relative(projectPath, result.filePath);
    const fileMetrics = analyzeMetrics([result]); // Analyze metrics for the specific file

    // Extract issues (rule violations) from the ESLint result
    const issues = result.messages.map((message) => ({
      ruleId: message.ruleId || "Unknown Rule",
      line: message.line,
      severity: message.severity,
      message: message.message,
    }));

    // Add dependency details (optional, assuming you have a way to extract imports/exports)
    const dependencies = {
      imports: [], // Fill this with the imports if you're parsing them elsewhere
      exports: [], // Fill this with the exports if you're parsing them elsewhere
    };

    // Combine metrics, issues, and dependencies
    const fileData = {
      metrics: fileMetrics,
      issues: issues,
      dependencies: dependencies, // Add any additional data here
    };

    const metricsPath = path.join(metricsDir, `${relativePath.replace(/\//g, '_')}.json`);
    await fs.writeFile(metricsPath, JSON.stringify(fileData, null, 2));
    console.log(`File metrics saved for ${relativePath}`);
  }
};



// Function to save the file list
const saveFileList = async (eslintResults, projectPath) => {
  const files = eslintResults.map(result => path.relative(projectPath, result.filePath));
  const fileListPath = path.resolve(__dirname, "../../public/files.json");
  await fs.writeFile(fileListPath, JSON.stringify({ files }, null, 2));
  console.log(`File list saved to: ${fileListPath}`);
};

const runESLint = async (projectPath) => {
  try {
    const startTime = Date.now();

    const customPlugin = await import(path.resolve(__dirname, "../../src/backend/eslint-plugin-custom/index.js"));

    const eslint = new ESLint({
      useEslintrc: false,
      baseConfig: { extends: ["eslint:recommended"] },
      overrideConfig: {
        parser: "@babel/eslint-parser",
        plugins: ["custom"],
        parserOptions: {
          requireConfigFile: false,
          ecmaVersion: 2021,
          sourceType: "module",
          babelOptions: { presets: ["@babel/preset-react"] },
        },
        rules: {
          "custom/limit-prop-drill-depth": ["warn", { maxDepth: 3 }],
          "custom/consistent-component-naming": "error",
          "custom/limit-jsx-nesting-depth": ["warn", { maxDepth: 4 }],
          "custom/require-default-props": "error",
          "custom/avoid-anonymous-functions-in-jsx": "warn",
          "custom/enforce-hooks-dependency-completeness": "error",
          complexity: ["warn", 10],
        },
      },
      resolvePluginsRelativeTo: __dirname,
      plugins: { custom: customPlugin.default },
    });

    console.log(`Running ESLint on: ${projectPath}`);
    const results = await eslint.lintFiles([`${projectPath}/**/*.{js,jsx,ts,tsx}`]);

    if (!Array.isArray(results)) {
      console.error("Unexpected results format from ESLint. 'results' should be an array.");
      console.log("Received:", results);
      return;
    }

    const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`ESLint completed in ${elapsedTime} seconds.`);

    // Parse and summarize results
    const parsedResults = parseEslintResults({ results });
    const summary = summarizeResults(
      parsedResults.customRules,
      parsedResults.genericRules,
      parsedResults.parsingErrors
    );

    // Analyze maintainability metrics
    const metrics = analyzeMetrics(results);
    console.log("Maintainability Metrics:", metrics);

    // Save overall metrics and snapshots
    await saveSnapshot(metrics);

    // Save individual file metrics and file list
    await saveFileMetrics(results, projectPath);
    await saveFileList(results, projectPath);

    const resultsDir = path.resolve(__dirname, "../../public");
    await fs.mkdir(resultsDir, { recursive: true });

    const resultsPath = path.join(resultsDir, "eslint-results.json");
    await fs.writeFile(
      resultsPath,
      JSON.stringify({ summary, results, metrics }, null, 2)
    );

    console.log(`Results saved to: ${resultsPath}`);
  } catch (error) {
    console.error("Error running ESLint:", error);
  }
};

// Get the project path from the command-line argument
const projectPath = process.argv[2];
if (projectPath) {
  runESLint(projectPath);
} else {
  console.error("Please provide the path to a project.");
}
