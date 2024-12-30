module.exports = {
    meta: {
      type: 'suggestion',
      docs: {
        description: 'Avoid using anonymous functions in JSX to improve performance',
        category: 'Best Practices',
        recommended: true,
      },
      messages: {
        anonymousFunction: 'Avoid anonymous functions in JSX. Use a named function or useCallback instead.',
      },
    },
    create(context) {
      return {
        JSXAttribute(node) {
          if (
            node.value &&
            node.value.type === 'JSXExpressionContainer' &&
            node.value.expression.type === 'ArrowFunctionExpression'
          ) {
            context.report({
              node: node.value.expression,
              messageId: 'anonymousFunction',
            });
          }
        },
      };
    },
  };
  