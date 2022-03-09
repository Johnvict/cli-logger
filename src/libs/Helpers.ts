export class Helpers {
  protected expression: RegExp = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)+( - error - )/;
  protected dateAlone: RegExp = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/;
  constructor() {}

  /**
   * To extract timestamp from text containing isoTime
   * 
   * @param entireText text extracted from log line
   * @returns number - Timestamp
   */
  timestampFromText(entireText: any): number {
    const entireLine = entireText.match(this.expression)[0];
    const dateString = entireLine.match(this.dateAlone)[0];
    return new Date(dateString).getTime();
  }
}
