const Joi = require("joi");

const productValidator = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string().required(),
  tax: Joi.string().required(),
  taxAmount: Joi.number().optional(),


}).strict();

module.exports = productValidator;
