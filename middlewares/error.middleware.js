const httpStatus = require('http-status')

const errorHandler = (error, req, res, next) => {
  const code = error.status || httpStatus.INTERNAL_SERVER_ERROR;
  const message = error.message || 'internal server!';

  res.status(code).json({
    message,
    code,
  });
};

module.exports = errorHandler;
