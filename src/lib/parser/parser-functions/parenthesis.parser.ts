import {ParserFn, PredicateFn} from "../types/parser.model";
import {Token, TokenType} from "../../tokenizer/types/token.model";
import {tokensInParenthesis} from "../../helpers/token-operations";
import {AstMetaData} from "../types/ast.model";
import {__parse} from "../parser";
import {AstNode, AstNodeType, EmptyNode, Parenthesis} from "../types/ast-expression.model";
import {Box} from "../../helpers/box";
import {bottom, top} from "../../helpers/array-helpers";
import {stripExpressionStatement} from "./expression-statment.parser";

export const parenthesisPredicate: PredicateFn = (tokens: Token[]) => {
    return tokens.length >= 0 && tokens[0].type === TokenType.Parenthesis && tokens[0].value === '(';
};

export const parenthesisParser: ParserFn = (tokens: Token[]) => {
    const insideOfParenthesis: Token[] = tokensInParenthesis(tokens);
    const remainingTokens: Token[] = [...tokens].slice(insideOfParenthesis.length + 2);

    const astNode: AstNode = new Box(insideOfParenthesis)
        .map(__parse)
        .map(bottom)
        .fold(stripExpressionStatement);

    const firstToken = bottom(insideOfParenthesis);
    const lastToken = top(insideOfParenthesis);

    return new AstMetaData(new Parenthesis(firstToken.start - 1, lastToken.end + 1, astNode), remainingTokens);
};

export const stripParenthesis = (astNode: AstNode) => {
    while (astNode && astNode.type === AstNodeType.Parenthesis) {
        astNode = astNode.expression;
    }

    return astNode ? astNode : new EmptyNode();
};
