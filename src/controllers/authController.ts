import { Request, Response } from 'express';
import * as authService from '../services/authServices';
import * as interfaces from '../interfaces/interfaces';
import prisma from '../database/database';

export async function signUp(req: Request, res: Response) {
  const { email, password } = req.body;
  const userData: interfaces.userData = { email, password };

  await authService.signUp(userData);

  res.status(201).send('Account created with success!');
}

export async function signIn(req: Request, res: Response) {
  const userData: interfaces.userData = req.body;

  const userAndToken = await authService.signIn(userData);

  res.status(200).send(userAndToken);
}

export async function tokenVerify(req: Request, res: Response) {
  const { userId } = res.locals.tokenData;
  const userData = await prisma.users.findUnique({ where: { id: userId } });
  const user = {
    id: userData?.id,
    email: userData?.email,
    createdAt: userData?.createdAt
  };
  res.status(200).send(user);
}
