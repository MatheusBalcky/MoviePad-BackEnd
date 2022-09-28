import { Request, Response } from 'express';
import * as authService from '../services/authServices';
import * as interfaces from '../interfaces/interfaces';

export async function signUp(req: Request, res: Response) {
  const { email, password } = req.body;
  const userData: interfaces.userData = { email, password };

  await authService.signUp(userData);

  res.status(201).send('Account created with success!');
}

export async function signIn(req: Request, res: Response) {
  const userData: interfaces.userData = req.body;

  const token = await authService.signIn(userData);

  res.status(200).send({ token });
}
