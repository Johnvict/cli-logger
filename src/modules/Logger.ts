import { LogOutput } from "../models/interface";
import { Output } from "../libs/Output";
import { FileSystem } from "./Filesystem";

export class Logger {
  private fileSystem: FileSystem;
  constructor() {
      this.fileSystem = new FileSystem();
  }
  /**
   * Reads from specified log file, filtering logs with the level error
   *
   * @param {String} inputFile Input File relative directory
   * @param {String} outputFile Output File relative directory
   */
  async readLog(inputFile: string, outputFile: string) {
    this.fileSystem.checkFileExistence(inputFile, "input");
    this.fileSystem.checkFileExistence(outputFile, "output");

    const result: LogOutput[] = await this.fileSystem.read(inputFile);

    if (result.length > 0) {
      this.fileSystem.write(outputFile, result).then((_) => Output.print("Log processed Completely!"));
    } else {
      Output.print("Log processed Completely, but no match found");
    }
  }
}

