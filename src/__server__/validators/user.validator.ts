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

const otpSchema = Joi.object().keys({
  email: Joi.string().email().trim().max(300).required(),
  otp: Joi.string().trim().min(7).max(7).required()
});

const categorySchema = Joi.string().valid('subject', 'topic', 'section', 'exam')

export { registrationSchema, loginSchema, otpSchema, categorySchema };
