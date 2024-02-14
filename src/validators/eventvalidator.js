const Joi = require("joi");


const CreateEvent = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string()
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .required()
    .messages({
      "string.pattern.base": "Email is not a valid email format/address",
    }),
bookingType: Joi.string().required(),
noOfGuest: Joi.string().required(),
mobile: Joi.string().required(),
}).strict();


module.exports = CreateEvent