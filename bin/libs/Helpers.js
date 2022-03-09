"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Helpers = void 0;
class Helpers {
    constructor() {
        this.expression = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)+( - error - )/;
        this.dateAlone = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/;
    }
    /**
     * To extract timestamp from text containing isoTime
     *
     * @param entireText text extracted from log line
     * @returns number - Timestamp
     */
    timestampFromText(entireText) {
        const entireLine = entireText.match(this.expression)[0];
        const dateString = entireLine.match(this.dateAlone)[0];
        return new Date(dateString).getTime();
    }
}
exports.Helpers = Helpers;
