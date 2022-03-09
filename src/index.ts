#!/usr/bin/env node

import yargs from "yargs";
import { Logger } from "./modules/Logger";

class Parser {
  public logger = new Logger();
  constructor(params: any) {
    this.processLog(params);
  }

  /**
   * Start the entire process
   */
  processLog(params: any) {
    this.logger.readLog(params.input, params.output);
  }
}

export default new Parser(
  yargs
    .usage("Usage: -n <name>")
    .option("input", { alias: "i", describe: "Input file relative directory", type: "string", demandOption: true })
    .option("output", { alias: "o", describe: "Output file relative directory", type: "string", demandOption: true }).argv
);
