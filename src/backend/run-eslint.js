import { ESLint } from "eslint";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// Resolve __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const runESLint = async (projectPath) => {
  const eslint = new ESLint({
    overrideConfigFile: path.resolve(__dirname, "../../.eslintrc.cjs"), // Adjusted path
    useEslintrc: false,
  });

  console.log(`Running ESLint on: ${projectPath}`);
  const results = await eslint.lintFiles([`${projectPath}/**/*.jsx`]);

  // Save the results to a JSON file
  const resultsPath = path.resolve("public/eslint-results.json");
  fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));

  console.log(`ESLint results saved to: ${resultsPath}`);
};

const projectPath = process.argv[2]; // Supply folder as an argument
if (projectPath) {
  runESLint(projectPath);
} else {
  console.error("Please provide the path to a Preact project.");
}
