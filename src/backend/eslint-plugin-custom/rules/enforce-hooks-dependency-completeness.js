module.exports = {
    meta: {
      type: 'problem',
      docs: {
        description: 'Ensure dependency arrays in useEffect hooks are complete',
        category: 'Possible Errors',
        recommended: true,
      },
      messages: {
        missingDependency: 'Dependency "{{dependency}}" is missing in useEffect.',
      },
    },
    create(context) {
      return {
        CallExpression(node) {
          if (node.callee.name === 'useEffect') {
            const dependencies = node.arguments[1];
            if (dependencies && dependencies.type === 'ArrayExpression') {
              const declared = new Set(context.getDeclaredVariables(context.getScope()).map((v) => v.name));
              const used = new Set();
  
              // Collect variables used inside the effect
              context.getScope().references.forEach((ref) => {
                if (!ref.resolved) return;
                if (ref.identifier.loc.start.line > node.loc.start.line) {
                  used.add(ref.identifier.name);
                }
              });
  
              // Compare sets
              used.forEach((dep) => {
                if (!declared.has(dep)) {
                  context.report({
                    node,
                    messageId: 'missingDependency',
                    data: { dependency: dep },
                  });
                }
              });
            }
          }
        },
      };
    },
  };
  