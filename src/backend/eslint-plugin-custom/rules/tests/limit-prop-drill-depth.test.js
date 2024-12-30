const { RuleTester } = require('eslint');
const rule = require('../limit-prop-drill-depth');

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 2021, sourceType: 'module', ecmaFeatures: { jsx: true } },
});

ruleTester.run('limit-prop-drill-depth', rule, {
  valid: [
    {
      code: `<Parent><Child /><Child /></Parent>`,
      options: [{ maxDepth: 2 }],
    },
    {
      code: `<Parent><Child><GrandChild /></Child></Parent>`,
      options: [{ maxDepth: 3 }],
    },
  ],
  invalid: [
    {
      code: `<Parent><Child><GrandChild><GreatGrandChild /></GrandChild></Child></Parent>`,
      options: [{ maxDepth: 2 }],
      errors: [
        {
          messageId: 'excessivePropDrilling',
          data: { depth: 3 },
        },
      ],
    },
    {
      code: `<Parent><Child><GrandChild><GreatGrandChild><GreatGreatGrandChild /></GreatGrandChild></GrandChild></Child></Parent>`,
      options: [{ maxDepth: 3 }],
      errors: [
        {
          messageId: 'excessivePropDrilling',
          data: { depth: 4 },
        },
      ],
    },
  ],
});
