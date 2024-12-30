module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Limit prop drilling depth to improve maintainability',
      category: 'Best Practices',
      recommended: true,
    },
    schema: [
      {
        type: 'object',
        properties: {
          maxDepth: { type: 'number', default: 3 },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      excessivePropDrilling: 'Props are drilled beyond {{depth}} levels. Consider using Context API or global state.',
    },
  },
  create(context) {
    const maxDepth = context.options[0]?.maxDepth ?? 3;

    const checkPropDrilling = (node, depth) => {
      if (depth > maxDepth) {
        context.report({
          node,
          messageId: 'excessivePropDrilling',
          data: { depth },
        });
      }
    };

    return {
      JSXElement(node) {
        let depth = 0;
        let current = node;

        // Traverse up the parent tree to calculate depth
        while (current.parent && current.parent.type === 'JSXElement') {
          depth++;
          current = current.parent;
        }

        // Report only the deepest element exceeding maxDepth
        if (depth > maxDepth) {
          checkPropDrilling(node.openingElement, depth);
        }
      },
    };
  },
};
