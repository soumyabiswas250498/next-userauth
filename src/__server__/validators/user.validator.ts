import Joi from 'joi';

const registrationSchema = Joi.object().keys({
  username: Joi.string().min(3).max(250).trim().required(),
  fullname: Joi.string()
    .min(3)
    .max(250)
    .trim()
    .required()
    .pattern(/^[a-zA-Z ]+$/),
  email: Joi.string().email().trim().max(300).required(),
  password: Joi.string().trim().min(3).max(30).required(),
});

const loginSchema = Joi.object().keys({
  email: Joi.string().email().trim().max(300).required(),
  password: Joi.string().trim().min(3).max(30).required(),
});

export { registrationSchema, loginSchema };
