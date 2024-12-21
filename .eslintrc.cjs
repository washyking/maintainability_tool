module.exports = {
  parser: '@babel/eslint-parser', // or 'babel-eslint'
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
      pragma: 'h',
      version: 'detect',
    },
  },
  plugins: ['react', 'react-hooks', 'jsx-a11y', 'import'],
  rules: {
    'react/prop-types': 'off',
    'no-unused-vars': 'warn',
    'import/no-unused-modules': 'warn',
    'complexity': ['warn', 10], // Cyclomatic Complexity Rule
  },
};
