import {ParserFn, PredicateFn} from "../types/parser.model";
import {Token, TokenType} from "../../tokenizer/types/token.model";
import {Operators} from "../../helpers/operators";
import {VariableDeclarationTypes} from "../types/variable-declaration";
import {afterTheEndOfStatement, tillTheEndOfStatement} from "../../helpers/token-operations";
import {AstNode, EmptyNode, Identifier, VariableDeclaration, VariableDeclarator} from "../types/ast-nodes.model";
import {__parse} from "../parser";
import {bottom, top} from "../../helpers/array-helpers";
import {endsWithEndOfStatement} from "../../helpers/ends-with-end-of-statement";
import {AstMetaData} from "../types/ast.model";
import {stripExpressionStatement} from "../helpers";

const isVariableDeclarationOperator = (token: Token) => {
    return token.type === TokenType.Operator && (token.value === Operators.VariableDeclaration || token.value === Operators.ConstantDeclaration);
};

const getIdentifier = (token: Token) => {
    return new Identifier(token.start, token.end, token.value);
};

const getInit = (tokens: Token[]) => {
    if (tokens.length === 0) {
        return new EmptyNode();
    }

    return stripExpressionStatement(__parse(tokens)[0]);
};

const getVariableDeclarator = (tokens: Token[]) => {
    const [identifierToken, assigmentToken, ...initTokens] = tokens;
    const identifier: Identifier = getIdentifier(identifierToken);
    const init: AstNode = getInit(initTokens);

    return new VariableDeclarator(bottom(tokens).start, top(tokens).end, identifier, init);
};

export const variableDeclarationPredicate: PredicateFn = (tokens: Token[]) => {
    return tokens.length >= 0 && isVariableDeclarationOperator(tokens[0]);
};

export const variableDeclarationParser: ParserFn = (tokens: Token[]) => {
    const _expressionTokens = tillTheEndOfStatement(tokens);
    const _remainingTokens: Token[] = afterTheEndOfStatement(tokens);
    const _endsWithEndOfStatement = endsWithEndOfStatement(tokens, _expressionTokens);

    const [kindToken, ...variableDeclaratorTokens] = _expressionTokens;

    const kind: VariableDeclarationTypes = <VariableDeclarationTypes> kindToken.value;
    const variableDeclarator: VariableDeclarator = getVariableDeclarator(variableDeclaratorTokens);

    const start = bottom(_expressionTokens).start;
    const end = _endsWithEndOfStatement ? top(_expressionTokens).end + 1 : top(_expressionTokens).end;

    const variableDeclaration: VariableDeclaration = new VariableDeclaration(start, end, [variableDeclarator], kind);

    return new AstMetaData(variableDeclaration, _remainingTokens);
};