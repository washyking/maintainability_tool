module.exports = {
    ruleKey: 'component-documentation',
    description: 'Enforce documentation for React components.',
    type: 'CODE_SMELL',
    severity: 'MAJOR',
    implementation: {
      filePattern: '**/*.jsx',
      script: `
        function checkDocumentation(astNode) {
          if (!astNode.leadingComments || !astNode.leadingComments.some(comment => comment.value.includes('@component'))) {
            console.log('Missing documentation for component:', astNode.id.name);
          }
        }
  
        module.exports = {
          rules: {
            'component-documentation': {
              create(context) {
                return {
                  ClassDeclaration(node) {
                    checkDocumentation(node);
                  },
                  FunctionDeclaration(node) {
                    checkDocumentation(node);
                  }
                };
              }
            }
          }
        };
      `,
    },
  };
  