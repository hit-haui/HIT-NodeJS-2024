const httpStatus = require("http-status");

const errorhandler = (error, req, res, next) => {
    const code = error.code || httpStatus.INTERNAL_SERVER_ERROR;
    const mesage = error.mesage || 'Internal Server Error';

    res.status(code).json({
        mesage,
        code,
    });
};

module.exports = errorhandler;