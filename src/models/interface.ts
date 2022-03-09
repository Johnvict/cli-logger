export interface LogOutput {
    "timestamp": number;
    "loglevel": string;
    "transactionId": string;
    "err": string;
}

export interface LogInput {
    transactionId: string;
    details: string;
    err: string;
}
