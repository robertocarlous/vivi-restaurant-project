const Joi = require("joi");

const blogValidator = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
}).strict();

module.exports = blogValidator;
