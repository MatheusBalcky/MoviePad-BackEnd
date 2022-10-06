import prisma from '../database/database';
import * as Is from '../interfaces/interfaces';

export async function createList(listData: Is.ListData) {
  return await prisma.lists.create({ data: listData });
}

export async function getLists(userId: number) {
  return await prisma.lists.findMany({
    where: { userId },
    include: {
      _count: true
    }
  });
}

export async function getOneListAndItsContents(listId: number, userId: number) {
  return await prisma.lists.findMany({
    where: { userId: userId, id: listId },
    include: {
      listsMoviesTvshows: {
        select: { movieTvshow: true }
      }
    }
  });
}
