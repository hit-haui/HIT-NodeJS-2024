const httpStatus = require('http-status')

const errorHandler = (error, req, res, next) => {
  let code = error.status || httpStatus.INTERNAL_SERVER_ERROR;
  let message = error.message || 'internal server!';

  if (error.message === 'File too large') {
    message = 'Kích thước file quá lớn';
    code = httpStatus.REQUEST_ENTITY_TOO_LARGE;
  }

  res.status(code).json({
    message,
    code,
  });
};

module.exports = errorHandler;
