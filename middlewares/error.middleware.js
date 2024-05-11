const httpStatus = require('http-status');

const errorHandler = (err, req, res, next) => {
  const code = err.status || httpStatus.INTERNAL_SERVER_ERROR;

  let message = err.message || httpStatus[code];

  res.status(code).json({ code, message });
};

module.exports = errorHandler;
