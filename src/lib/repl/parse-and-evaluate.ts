import {tokenize} from "../tokenizer/tokenizer";
import {parse} from "../parser/parser";
import {evaluate} from "../evaluate/evaluate";
import R = require("ramda");
import {AST} from "../parser/types/ast.model";
import {AstNode} from "../parser/types/ast-nodes.model";

const getNodes = (ast: AST) => ast.body;

export const parseAndEvaluate = R.pipe(
    tokenize,
    parse,
    getNodes,
    (nodes: AstNode[]) => nodes.map(evaluate)
);