// const validate = (schema) => (req, res, next) => {
//   const options = {
//     abortEarly: false,
//   };

//   const { error } = schema.validate(req.body, options);

//   if (error) {
//     const { details } = error;
//     const messages = details.map((detail) => detail.message).join(',');

//     return res.status(httpStatus.BAD_REQUEST).json({
//       message: messages,
//       code: httpStatus.BAD_REQUEST,
//     });
//   }

//   next();
// };

// module.exports = validate;

const httpStatus = require('http-status');

const validate = (schema) => (req, res, next) => {
  for (const key in schema) {
    const value = req[key];
    const { error } = schema[key].validate(value, { abortEarly: false });

    if (error) {
      const { details } = error;
      const messages = details.map((detail) => detail.message).join(',');

      return res.status(httpStatus.BAD_REQUEST).json({
        message: messages,
        code: httpStatus.BAD_REQUEST,
      });
    }
  }

  next();
};

module.exports = validate;
