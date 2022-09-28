import { Request, Response } from 'express';

interface error {
  code?: string;
  type: string;
  message: string;
}

const ERRORS: any = {
  unauthorized: 401,
  conflict: 409,
  not_found: 404,
  bad_request: 400
};

export async function errorHandler(error: error, req: Request, res: Response) {
  let statusCode: number = ERRORS[error.type];

  if (!statusCode) {
    console.log(error);
    statusCode = 500;
    return res.sendStatus(statusCode); // internal server error
  }

  return res.status(statusCode).send(error.message);
}
