import {ParserFn, PredicateFn} from "../types/parser.model";
import {Token, TokenType} from "../../tokenizer/types/token.model";
import {tokensInParenthesis} from "../../helpers/token-operations";
import {AstMetaData} from "../types/ast.model";
import {__parse} from "../parser";
import {AstNode} from "../types/ast-expression.model";
import {stripExpressionStatement} from "./expression-statment.parser";

export const parenthesisPredicate: PredicateFn = (tokens: Token[]) => {
    return tokens.length >= 0 && tokens[0].type === TokenType.Parenthesis && tokens[0].value === '(';
};

export const parenthesisParser: ParserFn = (tokens: Token[]) => {
    const insideOfParenthesis: Token[] = tokensInParenthesis(tokens);
    const remainingTokens: Token[] = [...tokens].slice(insideOfParenthesis.length + 2);

    const astNode: AstNode = stripExpressionStatement(__parse(insideOfParenthesis)[0]);

    return new AstMetaData(astNode, remainingTokens);
};
