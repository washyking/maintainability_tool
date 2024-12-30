module.exports = {
    meta: {
      type: 'suggestion',
      docs: {
        description: 'Require default values for all props',
        category: 'Best Practices',
        recommended: true,
      },
      messages: {
        missingDefaultProp: 'Prop "{{prop}}" is missing a default value.',
      },
    },
    create(context) {
      return {
        AssignmentExpression(node) {
          if (
            node.left &&
            node.left.type === 'MemberExpression' &&
            node.left.property.name === 'defaultProps'
          ) {
            const props = new Set(node.right.properties.map((prop) => prop.key.name));
            const component = node.left.object.name;
  
            context.getDeclaredVariables(context.getScope()).forEach((variable) => {
              if (variable.name === component && variable.defs[0].node.type === 'FunctionDeclaration') {
                const params = variable.defs[0].node.params[0];
                if (params && params.type === 'ObjectPattern') {
                  params.properties.forEach((param) => {
                    if (!props.has(param.key.name)) {
                      context.report({
                        node: param,
                        messageId: 'missingDefaultProp',
                        data: { prop: param.key.name },
                      });
                    }
                  });
                }
              }
            });
          }
        },
      };
    },
  };
  