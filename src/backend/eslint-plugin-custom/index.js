console.log('Custom plugin loaded');

module.exports = {
  rules: {
    'limit-prop-drill-depth': require('./rules/limit-prop-drill-depth'),
  },
};
