import * as chalk from "chalk";
import inquirer = require("inquirer");
import {parseAndEvaluate} from "./parse-and-evaluate";

const readInput = () => {
    const questions = [{name: 'command', type: 'input', message: chalk.blue('>> ')}];
    return inquirer.prompt(questions);
};

export const repl = async () => {
    try {
        const { command } = await readInput();

        if (typeof command === 'string' && command.trim()) {
            console.log(parseAndEvaluate(command));
        }
    } catch (e) {
        console.error(e);
    }

    repl();
};
