import { Request, Response } from 'express';
import * as Interfs from '../interfaces/interfaces'
import * as ListsServices from '../services/listsService'

export async function createList(req: Request, res: Response) {
  const { userId } = res.locals.tokenData;
  const listData: Interfs.ListData = { userId, ...req.body };

  await ListsServices.insertList(listData);

  res.status(201).send(listData);
}

export async function getListsFromUser(req: Request, res: Response) {
  const { userId } = res.locals.tokenData;

  const lists = await ListsServices.getLists(userId);

  res.status(200).send(lists);
}

export async function getOneListAndContentsById(req: Request, res: Response) {
  const { listId } = req.params;
  const { userId } = res.locals.tokenData;

  const list = await ListsServices.getOneListAndItsContents(Number(listId), userId);

  res.status(200).send(list);
}

export async function deleteListById(req: Request, res: Response) {
  const { id: listId } = req.params;
  const { userId } = res.locals.tokenData;

  const deleteResult = await ListsServices.deleteListById(Number(listId), userId);

  res.status(200).send(deleteResult);
}