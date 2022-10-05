import * as Interfs from '../interfaces/interfaces'
import * as listsRepo from '../repositories/listsRepositories'

export async function insertList(listData: Interfs.ListData) {
  return await listsRepo.createList(listData);
}

export async function getLists(userId: number) {
  return await listsRepo.getLists(userId);
}