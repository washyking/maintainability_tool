import babelParser from '@babel/eslint-parser';
import customPlugin from './src/backend/eslint-plugin-custom/index.js';
import reactPlugin from 'eslint-plugin-react';

export default [
  {
    files: ['**/*.jsx'], // Target JSX files
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        ecmaVersion: 2021,
        sourceType: 'module',
        babelOptions: {
          presets: ['@babel/preset-react'], // Ensures JSX is parsed correctly
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
      'custom/limit-prop-drill-depth': ['error', { maxDepth: 3 }],
      'react/jsx-uses-react': 'error', // Ensure React is used in JSX files
      'react/jsx-uses-vars': 'error', // Prevent unused variables in JSX
    },
  },
];
