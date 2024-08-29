import {sendResponse} from "./utils.js";

export class ApplicationError extends Error {
    constructor(msg, statusCode , error) {
        super(msg);
        this.statusCode = statusCode;
        this.error = error;
        this.status = `${statusCode}`.startsWith('4') ? "FAIL" : "ERROR";
        // this is flag which indicates this is operational error
        // it can be handled predictable error
        this.operational = true;

        // captureStackTrace returns a string that represents the
        // location of that particular error in the call.
        Error.captureStackTrace(this , this.constructor)
    }
}

export function handleError(err , req , res) {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === "development") {
        sendResponse(res ,err.msg , err.statusCode , [] , err)
    }

    else if (err.operational) {
        sendResponse(res , err.msg , err.statusCode , [] , err)
    }

    else {
        sendResponse(res , err.msg , err.statusCode , [] , err)
    }
}