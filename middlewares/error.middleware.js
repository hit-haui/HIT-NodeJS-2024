const httpStatus = require('http-status');
const errorHandler = (error, req, res, next) => {
    console.log(error);
    const code = error.status || httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || 'Internal Server Error';

    res.status(code).json({
        message,
        code
    })
}

module.exports = errorHandler;
