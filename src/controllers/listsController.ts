import { Request, Response } from 'express';
import * as Is from '../interfaces/interfaces'
import * as ListsServices from '../services/listsService'

export async function createList(req: Request, res: Response) {
  const { userId } = res.locals.tokenData;
  const listData: Is.ListData = { userId, ...req.body };

  await ListsServices.insertList(listData);

  res.status(201).send(listData);
}
