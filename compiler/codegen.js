const codegen = (ast) =>{
    let js = '';
    ast.forEach((node)=>{
        js += genNode(node);
    });
    return js;
};

const genNode = (node)=>{
    if (node.type === 'identifier') {
        return node.name;
    } else if (node.type === 'number') {
        return node.value;
    } else if (node.type === 'property') {
        return node.object + "." + node.property;
    } else if(node.type === 'expression') {
        const logic = {
            'and' : '&&',
            'or' : '||'
        }
        return genNode(node.left) + ' '
          + logic[node.logic] + ' '
          + genNode(node.right);
    } else if (node.type === 'method') {
      return node.object + "." + node.method + "(); ";
    } else if (node.type === "finish"){
      return "return; ";
    } else if (node.type === 'math') {
        return genNode(node.left) + ' '
          + node.operator + ' '
          + genNode(node.right);
    } else if (node.type === 'if') {
        return 'if (' +
            genNode(node.condition) +
          ') {\n' +
            codegen(node.body) +
          '}';
    } else if(node.type === 'while') {
        return 'while (' +
              genNode(node.condition) +
            ') {\n' +
              codegen(node.body) +
            '}';
    } else if(node.type === 'comparison') {
        const operators = {
            '=' : '===',
            '<=' : '<==',
            '>=' : '>==',
            '<'  : '<',
            '>'  : '>',
        }

        const jsOperator = operators[node.operator];
        return genNode(node.left) + ' '
            + jsOperator + ' '
            + genNode(node.right);
    } else {
        return new Error('Unkonwn node: ' + JSON.stringify(node));
    }
};

module.exports = codegen;
