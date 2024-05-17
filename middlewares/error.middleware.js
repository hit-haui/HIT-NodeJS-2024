const httpStatus = require('http-status');

const errorHandler = (error , req , res , next) => {
    const code = error.status || httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || 'Đã xảy ra lỗi vui lòng thử lại';
    console.log('handleError');
    res.status(code).json({
      message,
      code,
    });
};

module.exports = errorHandler;
