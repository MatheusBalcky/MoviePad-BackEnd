import * as Is from '../interfaces/interfaces'
import * as listsRepo from '../repositories/listsRepositories'

export async function insertList(listData: Is.ListData) {
  return await listsRepo.createList(listData);
}