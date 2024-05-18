const httpStatus = require("http-status");

const validate = (schema) => (req , res , next) => {
    for (let key in schema) {
        const data = req[key];
        const {error} = schema[key].validate(data , {abortEarly: false});

        if(error) {
            const errorDetails = error.details.map((erorr) => erorr.message).join(', ');
            
            return res.status(httpStatus.BAD_REQUEST).json({
                code : httpStatus.BAD_REQUEST,
                message : errorDetails,
            })
        }
        next();
    }
};

module.exports = validate;
