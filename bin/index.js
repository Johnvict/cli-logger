#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const Logger_1 = require("./modules/Logger");
class Parser {
    constructor(params) {
        this.logger = new Logger_1.Logger();
        this.processLog(params);
    }
    /**
     * Start the entire process
     */
    processLog(params) {
        this.logger.readLog(params.input, params.output);
    }
}
exports.default = new Parser(yargs_1.default
    .usage("Usage: -n <name>")
    .option("input", { alias: "i", describe: "Input file relative directory", type: "string", demandOption: true })
    .option("output", { alias: "o", describe: "Output file relative directory", type: "string", demandOption: true }).argv);
