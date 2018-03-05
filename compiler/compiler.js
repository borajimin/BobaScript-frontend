const parse = require('../grammar.js').parse;
const commander = require('commander');
const fs = require('fs');
const codegen = require('./codegen.js');

module.exports = function(source) {
    try {
        commander.parse(source);
        const ast = parse(source);
        console.log(JSON.stringify(ast, null, 4));
        // console.log('\n==============\n');
        const js = codegen(ast);
        console.log(js);
        return {
            success: true,
            javascript: js
        };
    } catch(e) {
        console.log(e);
        return {
            success: false,
            error: e};
    }
};
