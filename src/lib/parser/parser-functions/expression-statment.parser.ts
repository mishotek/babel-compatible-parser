import {ParserFn, PredicateFn} from "../types/parser.model";
import {Token} from "../../tokenizer/types/token.model";
import {literalParser, literalPredicate} from "./literal.parser";
import {defaultParser} from "./default.parser";
import {AstNode, AstNodeType, ExpressionStatement} from "../types/ast-expression.model";
import {AstMetaData} from "../types/ast.model";
import {binaryExpressionParser, binaryExpressionPredicate} from "./binary-expression.parser";
import R = require("ramda");

export const expressionStatementPredicate: PredicateFn = R.either(binaryExpressionPredicate, literalPredicate);

const parseInnerExpression: ParserFn = (tokens: Token[]) => {
    if (binaryExpressionPredicate(tokens)) {
        return binaryExpressionParser(tokens);
    }

    if (literalPredicate(tokens)) {
        return literalParser(tokens);
    }

    return defaultParser(tokens);
};

export const expressionStatementParser: ParserFn = (tokens: Token[]) => {
    const {node, remainingTokens} = parseInnerExpression(tokens);

    return new AstMetaData(new ExpressionStatement(node.start, node.end, node), remainingTokens);
};

export const stripExpressionStatement: (astNode: AstNode) => AstNode = (astNode: AstNode) => {
    if (astNode.type === AstNodeType.ExpressionStatement) {
        return astNode.expression;
    }

    return astNode;
};
