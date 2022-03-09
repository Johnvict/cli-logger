"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const Output_1 = require("../libs/Output");
const Filesystem_1 = require("./Filesystem");
class Logger {
    constructor() {
        this.fileSystem = new Filesystem_1.FileSystem();
    }
    /**
     * Reads from specified log file, filtering logs with the level error
     *
     * @param {String} inputFile Input File relative directory
     * @param {String} outputFile Output File relative directory
     */
    async readLog(inputFile, outputFile) {
        this.fileSystem.checkFileExistence(inputFile, "input");
        this.fileSystem.checkFileExistence(outputFile, "output");
        const result = await this.fileSystem.read(inputFile);
        if (result.length > 0) {
            this.fileSystem.write(outputFile, result).then((_) => Output_1.Output.print("Log processed Completely!"));
        }
        else {
            Output_1.Output.print("Log processed Completely, but no match found");
        }
    }
}
exports.Logger = Logger;
