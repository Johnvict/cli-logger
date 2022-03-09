"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Output = void 0;
const chalk = require("chalk");
class Output {
    constructor() { }
    /**
     * Print text to the terminal
     *
     * @param outputText Test to print to the terminal
     * @param color Output color for text
     */
    static print(outputText, color) {
        let printOutText;
        switch (color) {
            case "red":
                printOutText = chalk.red.bold(outputText);
                break;
            default:
                printOutText = chalk.green.bold(outputText);
                break;
        }
        console.log(`\n\n${printOutText}\n\n`);
    }
}
exports.Output = Output;
