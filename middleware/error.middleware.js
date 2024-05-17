const httpStatus = require("http-status");

const errorhandler = (error, req, res, next) => {
    const code = error.status || httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || 'Internal Server Error';

    res.status(code).json({
        message,
        code,
    });
};

module.exports = errorhandler;
