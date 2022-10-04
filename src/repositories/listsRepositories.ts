import prisma from '../database/database';
import * as Is from '../interfaces/interfaces';

export async function createList(listData: Is.ListData) {
  return await prisma.lists.create({data: listData});
}
