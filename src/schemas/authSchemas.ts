import Joi from 'joi';

export const signUp = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  repeatPassword: Joi.ref('password')
});

export const signIn = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required()
});
