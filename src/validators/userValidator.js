const Joi = require("joi");


const signupValidator = Joi.object({
  fullname: Joi.string().required(),
  email: Joi.string()
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .required()
    .messages({
      "string.pattern.base": "Email is not a valid email format/address",
    }),
  password: Joi.string()
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/
    )
    .required()
    .messages({
      "string.pattern.base":
        "You need one number, one alphanumeric character and one in caps, password be more than 6 characters long",
    }),
    confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "any.only": "Passwords do not match",
    }),
  phone: Joi.string(),
  referralCode: Joi.string(),
  role: Joi.string().valid('user', 'admin', 'superadmin').optional(),
}).strict()

module.exports = signupValidator;
