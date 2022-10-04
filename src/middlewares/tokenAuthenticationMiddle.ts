import dotenv from 'dotenv';
dotenv.config();
import { NextFunction, Request, Response } from 'express';
import * as jwt from '../utils/jwtUtils';

export async function tokenAuthenticationMiddle(req: Request, res: Response, next: NextFunction) {
  const error = { type: 'unauthorized', message: 'Unauthorized token!' };
  const authorization = req.headers['authorization'];
  if (!authorization) throw error;

  const token = authorization.replace('Bearer ', '');
  if (!token) throw error;

  const result = jwt.verifyToken(token);
  if (!result) throw error;
  
  res.locals.tokenData = result;
  next();
}
