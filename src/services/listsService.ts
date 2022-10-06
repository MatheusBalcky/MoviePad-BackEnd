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

  const promise = await listsRepo.getOneListAndItsContents(listId, userId);
  if (promise.length === 0) throw { type: 'not_found', message: 'No list founded' };

  return promise;
}
