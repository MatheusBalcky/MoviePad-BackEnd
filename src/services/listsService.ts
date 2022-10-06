import * as Interfs from '../interfaces/interfaces'
import * as listsRepo from '../repositories/listsRepositories'

export async function insertList(listData: Interfs.ListData) {
  return await listsRepo.createList(listData);
}

export async function getLists(userId: number) {
  const promise = await listsRepo.getLists(userId);
  const result = promise.map( item =>{
    return {
      id: item.id,
      title: item.title,
      iconList: item.iconList,
      userId: item.userId,
      createdAt: item.createdAt,
      amount: item._count.listsMoviesTvshows
    };
  })
  return result
}

export async function getOneListAndItsContents(listId: number, userId: number) {
  const promise = await listsRepo.getOneListAndItsContents(listId, userId);

  return promise
}