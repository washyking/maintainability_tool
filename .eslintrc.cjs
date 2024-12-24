module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true, // Enable JSX
    },
  },
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
  plugins: [
    'react',
    'react-hooks',
    'jsx-a11y',
    'import',
    'custom',
  ],
  rules: {
    'react/prop-types': 'off',
    'no-unused-vars': 'warn',
    'import/no-unused-modules': 'warn',
    'complexity': ['warn', 10],
    'custom/limit-prop-drill-depth': ['warn', { maxDepth: 3 }],
  },
};
