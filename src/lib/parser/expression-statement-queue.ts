import {Token} from "../tokenizer/types/token.model";
import {Queue} from "../helpers/queue";

export class ExpressionStatementQueue extends Queue<Token[]> {

    constructor(tokens: Token[]) {
        super([]);
        const expressions = this.separateExpressions(tokens);
        super.reconstruct(expressions);
    }

    private separateExpressions(tokens: Token[]): Token[][] {

    }
}