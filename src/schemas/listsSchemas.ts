import Joi from 'joi';

export const newList = Joi.object({
  title: Joi.string().max(45).required(),
  iconList: Joi.string()
});