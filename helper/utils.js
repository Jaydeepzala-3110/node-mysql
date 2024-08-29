

export const sendResponse = (res , msg , statusCode , result = [] , error = {} , ) => {
    res.status(statusCode).json({
        statusCode,
        msg,
        data: result,
        error
    })
}

