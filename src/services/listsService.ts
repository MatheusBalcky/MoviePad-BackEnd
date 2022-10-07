import * as Interfs from '../interfaces/interfaces';
import * as listsRepo from '../repositories/listsRepositories';

export async function insertList(listData: Interfs.ListData) {
  return await listsRepo.createList(listData);
}

export async function getLists(userId: number) {
  const promise = await listsRepo.getLists(userId);
  const result = promise.map((item) => {
    return {
      id: item.id,
      title: item.title,
      iconList: item.iconList,
      userId: item.userId,
      createdAt: item.createdAt,
      amount: item._count.listsMoviesTvshows
    };
  });
  return result;
}

export async function getOneListAndItsContents(listId: number, userId: number) {
  if (isNaN(listId)) throw { type: 'bad_request', message: 'Invalid list id' };

  const list = await listsRepo.getOneListAndItsContents(listId, userId);
  if (!list) throw { type: 'not_found', message: 'No list founded' };

  return list;
}

export async function deleteListById(listId: number, userId: number) {
  if (isNaN(listId)) throw { type: 'bad_request', message: 'Invalid list id' };

  const list = await listsRepo.getList(listId);

  if (!list) throw { type: 'not_found', message: 'List not found!' };
  if (list.userId !== userId) throw { type: 'unauthorized', message: 'This list is not yours!' };

  return await listsRepo.deleteListAndItsContents(listId);
}
