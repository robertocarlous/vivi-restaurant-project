const Joi = require("joi");

const categoryValidator = Joi.object({
  name: Joi.string().required(),
}).strict();

module.exports = categoryValidator;
