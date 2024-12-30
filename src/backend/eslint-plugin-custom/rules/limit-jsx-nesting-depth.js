module.exports = {
    meta: {
      type: 'suggestion',
      docs: {
        description: 'Limit nesting depth of JSX elements to improve readability',
        category: 'Best Practices',
        recommended: true,
      },
      schema: [
        {
          type: 'object',
          properties: {
            maxDepth: { type: 'number', default: 4 },
          },
          additionalProperties: false,
        },
      ],
      messages: {
        excessiveNesting: 'JSX nesting exceeds {{depth}} levels. Consider splitting into smaller components.',
      },
    },
    create(context) {
      const maxDepth = context.options[0]?.maxDepth ?? 4;
  
      function checkNesting(node, depth = 0) {
        if (depth > maxDepth) {
          context.report({
            node,
            messageId: 'excessiveNesting',
            data: { depth },
          });
        }
  
        if (node.children) {
          node.children.forEach((child) => {
            if (child.type === 'JSXElement') {
              checkNesting(child, depth + 1);
            }
          });
        }
      }
  
      return {
        JSXElement(node) {
          checkNesting(node);
        },
      };
    },
  };
  