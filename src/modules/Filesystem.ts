import fs from 'fs';
import readline from 'readline';
import { LogInput, LogOutput } from '../models/interface';
import { Output } from '../libs/Output';
import { Helpers } from '../libs/Helpers';

export class FileSystem extends Helpers {
  /**
   * Checks if a specified file exists
   *
   * @param {String} fileName file name to check its existence
   * @param {String} fileType file type to check its existence
   * @returns void
   */
  checkFileExistence(fileName: string, fileType: 'input' | 'output') {
    if (!fs.existsSync(fileName)) {
      // File not found
      Output.print(
        `# Sorry, the ${fileType} file you entered does not exist`,
        'red'
      );
      process.exit(1);
    }
  }

  /**
   * Read all detected logs with level 'error' from specified input file
   *
   * @param {String} inputFile Input File relative directory
   */
  async read(inputFile: string): Promise<LogOutput[]> {
    // We would use Regular expression on ISO date with the 'error' keyword because if we check for error alone,
    // we might have another occurrence or 'error' in the log itself
    const readInterface = readline.createInterface({
      input: fs.createReadStream(inputFile),
      terminal: false,
    });
    const result: LogOutput[] = [];

    return new Promise((resolve, reject) => {
      // Read file line by line
      readInterface.on('line', (line: any) => {
        if (line && line.match(this.expression) != null) {
          const data: LogInput = JSON.parse(line.substr(line.indexOf('{')));

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
  write(fileName: string, data: LogOutput[]): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        const rawData = fs.readFileSync(fileName).toString();

        // This will let us write into an empty output.json
        const fileData = rawData.length > 0 ? JSON.parse(rawData) : [];
        fs.writeFileSync(
          fileName,
          JSON.stringify([...fileData, ...data], null, 1),
          'utf-8'
        );

        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  }
}
