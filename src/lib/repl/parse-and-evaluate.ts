import {tokenize} from "../tokenizer/tokenizer";
import {parse} from "../parser/parser";
import R = require("ramda");
import {execute} from "../execute/execute";

export const parseAndEvaluate = R.pipe(
    tokenize,
    parse,
    execute
);