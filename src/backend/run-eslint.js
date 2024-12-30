import { ESLint } from "eslint";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";
import parseEslintResults from "../utils/parseEslintResults.js";
import summarizeResults from "../utils/summarizeResults.js";

// Resolve __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

    const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`ESLint completed in ${elapsedTime} seconds.`);

    // Parse and summarize results
    const parsedResults = parseEslintResults(results);
    const summary = summarizeResults(
      parsedResults.customRules,
      parsedResults.genericRules,
      parsedResults.parsingErrors
    );

    const resultsDir = path.resolve(__dirname, "../../public");
    await fs.mkdir(resultsDir, { recursive: true });

    const resultsPath = path.join(resultsDir, "eslint-results.json");
    await fs.writeFile(resultsPath, JSON.stringify({ summary, results }, null, 2));

    console.log(`Results saved to: ${resultsPath}`);
  } catch (error) {
    console.error("Error running ESLint:", {
      message: error.message,
      stack: error.stack,
    });
  }
};

// Get the project path from the command-line argument
const projectPath = process.argv[2];
if (projectPath) {
  runESLint(projectPath);
} else {
  console.error("Please provide the path to a project.");
}
