"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSystem = void 0;
const fs_1 = __importDefault(require("fs"));
const readline_1 = __importDefault(require("readline"));
const Output_1 = require("../libs/Output");
const Helpers_1 = require("../libs/Helpers");
class FileSystem extends Helpers_1.Helpers {
    /**
     * Checks if a specified file exists
     *
     * @param {String} fileName file name to check its existence
     * @param {String} fileType file type to check its existence
     * @returns void
     */
    checkFileExistence(fileName, fileType) {
        if (!fs_1.default.existsSync(fileName)) {
            // File not found
            Output_1.Output.print(`# Sorry, the ${fileType} file you entered does not exist`, 'red');
            process.exit(1);
        }
    }
    /**
     * Read all detected logs with level 'error' from specified input file
     *
     * @param {String} inputFile Input File relative directory
     */
    async read(inputFile) {
        // We would use Regular expression on ISO date with the 'error' keyword because if we check for error alone,
        // we might have another occurrence or 'error' in the log itself
        const readInterface = readline_1.default.createInterface({
            input: fs_1.default.createReadStream(inputFile),
            terminal: false,
        });
        const result = [];
        return new Promise((resolve, reject) => {
            // Read file line by line
            readInterface.on('line', (line) => {
                if (line && line.match(this.expression) != null) {
                    const data = JSON.parse(line.substr(line.indexOf('{')));
                    result.push({
                        timestamp: this.timestampFromText(line),
                        loglevel: 'error',
                        transactionId: data.transactionId,
                        err: data.err,
                    });
                }
            });
            // Write Log into Output file if we did get some results
            readInterface.on('close', () => {
                resolve(result);
            });
        });
    }
    /**
     * Prints all detected logs with level 'error' into specified output file
     *
     * @param {String} fileName Target File name, on which we need to print the found logs
     * @param {Array} data Array of objects containing all found logs
     */
    write(fileName, data) {
        return new Promise((resolve, reject) => {
            try {
                const rawData = fs_1.default.readFileSync(fileName).toString();
                // This will let us write into an empty output.json
                const fileData = rawData.length > 0 ? JSON.parse(rawData) : [];
                fs_1.default.writeFileSync(fileName, JSON.stringify([...fileData, ...data], null, 1), 'utf-8');
                resolve(true);
            }
            catch (error) {
                reject(error);
            }
        });
    }
}
exports.FileSystem = FileSystem;
