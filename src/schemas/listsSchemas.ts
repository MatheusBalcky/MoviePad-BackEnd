import Joi from 'joi';

export const newList = Joi.object({
  title: Joi.string().max(45).required(),
  iconList: Joi.string().min(0)
});

export const contentData = Joi.object({
  contentId: Joi.number().required(),
  title: Joi.string().required(),
  pictureUrl: Joi.string()
    .pattern(/^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/)
    .required(),
  description: Joi.string().min(0).required(),
  releaseYear: Joi.date().required(),
  trailerUrl: Joi.string().min(0).required(),
  rating: Joi.number()
});
