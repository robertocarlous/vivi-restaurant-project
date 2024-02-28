const Joi = require("joi");

const productValidator = Joi.object({
  name: Joi.string().required(),
  price: Joi.string().required(),
  description: Joi.string().required(),
  tax: Joi.string().required(),


}).strict();

module.exports = productValidator;
