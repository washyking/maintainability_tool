import babelParser from '@babel/eslint-parser';
import customPlugin from './src/backend/eslint-plugin-custom/index.js';
import reactPlugin from 'eslint-plugin-react';

export default [
  {
    files: ['**/*.{js,jsx,ts,tsx}'], // Target JS, JSX, TS, and TSX files
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        ecmaVersion: 2021,
        sourceType: 'module',
        babelOptions: {
          presets: ['@babel/preset-react'], // Ensure JSX/TSX parsing
        },
      },
      globals: {
        React: 'readonly',
      },
    },
    plugins: {
      custom: customPlugin,
      react: reactPlugin, // Include React plugin
    },
    settings: {
      react: {
        pragma: 'React',
        version: 'detect', // Auto-detect React version
      },
    },
    rules: {
      // Custom ESLint Rules
      'custom/limit-prop-drill-depth': ['error', { maxDepth: 3 }],
      'custom/consistent-component-naming': 'error',
      'custom/limit-jsx-nesting-depth': ['warn', { maxDepth: 4 }],
      'custom/require-default-props': 'error',
      'custom/avoid-anonymous-functions-in-jsx': 'warn',
      'custom/enforce-hooks-dependency-completeness': 'error',

      // React Rules
      'react/jsx-uses-react': 'error', // Ensure React is used in JSX files
      'react/jsx-uses-vars': 'error', // Prevent unused variables in JSX

      // Generic Best Practices
      'complexity': ['warn', 10], // Limit cyclomatic complexity
      'max-lines-per-function': ['warn', { max: 50 }], // Enforce shorter functions
      'no-console': 'warn', // Warn about console logs in production
    },
  },
];
