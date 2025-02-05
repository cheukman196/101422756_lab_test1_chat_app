const errorHandlerMiddleware = (err, req, res, next) => {
    // log error (debug only)
    // console.error(err.stack);

    const errorObject = {
        status: err.status || 500,
        message: 'Oops, there seems to be an error',
        err: err.message
    }
    res.status(err.status || 500).send(errorObject);
}

module.exports = errorHandlerMiddleware;
