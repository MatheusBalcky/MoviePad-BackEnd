import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

export function validateSchemaMiddleware(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(422).send({ error: error.details.map( item => item.message) });
    }

    next();
  };
}
