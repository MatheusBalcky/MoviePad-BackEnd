import Joi from 'joi';

export const signUpSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    repeatPassword: Joi.ref('password')
});

export const signInSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
});