const catchAsync = (fn) => (res, req , next) => {
    Promise.resolve(fn(res, req, next).catch(error => next(error)));
}

module.exports = catchAsync;
