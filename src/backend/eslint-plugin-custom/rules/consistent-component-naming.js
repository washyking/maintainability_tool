module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Ensure all React component names use PascalCase for maintainability',
      category: 'Stylistic Issues',
      recommended: true,
    },
    messages: {
      incorrectNaming: 'Component "{{name}}" should be named in PascalCase.',
    },
  },
  create(context) {
    return {
      JSXOpeningElement(node) {
        const elementName = node.name.name;

        // Skip if it's not a valid identifier (e.g., expressions or member expressions)
        if (typeof elementName !== 'string') return;

        // Skip native HTML elements (e.g., div, span, p, etc.)
        if (/^[a-z]/.test(elementName)) return;

        // Check if the name is not in PascalCase
        if (!/^[A-Z][a-zA-Z0-9]*$/.test(elementName)) {
          context.report({
            node,
            messageId: 'incorrectNaming',
            data: { name: elementName },
          });
        }
      },
    };
  },
};
