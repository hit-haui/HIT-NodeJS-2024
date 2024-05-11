const httpStatus = require('http-status');

class ApiError extends Error {
  constructor(message, status = httpStatus.BAD_REQUEST) {
    super(message);
    this.status = status;
  }
}

module.exports = ApiError;
