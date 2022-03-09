const chalk = require("chalk");

export class Output {
  constructor() {}

  /**
   * Print text to the terminal
   *
   * @param outputText Test to print to the terminal
   * @param color Output color for text
   */
  static print(outputText: string, color?: "red") {
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
