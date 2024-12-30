console.log('Custom plugin loaded');

module.exports = {
  rules: {
    'limit-prop-drill-depth': require('./rules/limit-prop-drill-depth'),
    'consistent-component-naming': require('./rules/consistent-component-naming'),
    'limit-jsx-nesting-depth': require('./rules/limit-jsx-nesting-depth'),
    'require-default-props': require('./rules/require-default-props'),
    'avoid-anonymous-functions-in-jsx': require('./rules/avoid-anonymous-functions-in-jsx'),
    'enforce-hooks-dependency-completeness': require('./rules/enforce-hooks-dependency-completeness'),
  },
};
