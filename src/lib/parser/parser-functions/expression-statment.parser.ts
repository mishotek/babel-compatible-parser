import {ParserFn, PredicateFn} from "../types/parser.model";
import {Token} from "../../tokenizer/types/token.model";
import {literalParser, literalPredicate} from "./literal.parser";
import {defaultParser} from "./default.parser";
import {AstNode, AstNodeType, ExpressionStatement} from "../types/ast-expression.model";
import {AstMetaData} from "../types/ast.model";
import {binaryExpressionParser, binaryExpressionPredicate} from "./binary-expression.parser";
import R = require("ramda");
import {parenthesisParser, parenthesisPredicate} from "./parenthesis.parser";

export const expressionStatementPredicate: PredicateFn = R.anyPass([
    binaryExpressionPredicate,
    literalPredicate,
    parenthesisPredicate
]);

const parseInnerExpression: ParserFn = (tokens: Token[]) => {
    if (binaryExpressionPredicate(tokens)) {
        return binaryExpressionParser(tokens);
    }

    if (literalPredicate(tokens)) {
        return literalParser(tokens);
    }

    if (parenthesisPredicate(tokens)) {
        return parenthesisParser(tokens);
    }

    return defaultParser(tokens);
};

export const expressionStatementParser: ParserFn = (tokens: Token[]) => {
    const {node, remainingTokens} = parseInnerExpression(tokens);

    return new AstMetaData(wrapInExpressionStatement(node), remainingTokens);
};

export const wrapInExpressionStatement: (node: AstNode) => ExpressionStatement = (node: AstNode) => {
    if (node.type === AstNodeType.ExpressionStatement) {
        return node;
    }

    return new ExpressionStatement(node.start, node.end, node);
};

export const stripExpressionStatement: (astNode: AstNode) => AstNode = (astNode: AstNode) => {
    if (astNode.type === AstNodeType.ExpressionStatement) {
        return astNode.expression;
    }

    return astNode;
};
