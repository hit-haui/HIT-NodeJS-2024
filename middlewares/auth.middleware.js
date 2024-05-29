const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user.model');

const auth = catchAsync(async (req, res, next) => {

  const token = extracToken(req);

  if (!token) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Vui long dang nhap he thong!');
  }

  const payload = jwt.verify(token, process.env.JWT_SECRET);

  console.log(payload);

  const user =await User.findById(payload.id);

  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Vui long dang nhap he thong!');
  }

  req.user = user;

  next();
});


const extracToken = (req) => {
  let token;
  if (req.headers.authorization?.startsWith(`Bearer`)) {
    token = req.headers.authorization?.split(' ')[1];
  }

  return token;
}

module.exports = { auth};