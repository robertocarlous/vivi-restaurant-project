const Joi = require("joi");

const cartValidator = Joi.object({
  productName: Joi.string().required(),
  quantity: Joi.number().required(),


}).strict();

module.exports = cartValidator;
