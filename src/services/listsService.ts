import * as Interfs from '../interfaces/interfaces';
import * as listsRepo from '../repositories/listsRepositories';
import * as contentsRepo from '../repositories/contentsRepositories';

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

  const list = await checkListExistence(listId)

  if (list.userId !== userId) throw { type: 'unauthorized', message: 'This list is not yours!' };

  return await listsRepo.deleteListAndItsContents(listId);
}

export async function addNewContent(listId: number, contentData: any) {
  let contentIdToRelate = 0;

  await checkListExistence(listId);

  const content = await contentsRepo.getOneContent(contentData.contentId);

  if (!content) {
    const contentCreated = await contentsRepo.createContent(contentData);
    contentIdToRelate = contentCreated.id;
  } else {
    contentIdToRelate = content.id;
  }
  try {
    await contentsRepo.createRelationListAndContent(listId, Number(contentIdToRelate));
  } catch (error: any) {
    if(error.code == 'P2002'){
      throw { type: 'conflict', message: 'This content already exists on your list!'}
    };
  }
}

export async function getOneContentDataFromAList(listId: number, contentId: number){
  if (isNaN(contentId)) throw { type: 'not_found', message: 'No list founded' };
  
  const content = await contentsRepo.getOneContentFromAListById(listId, contentId);
  if(!content) throw { type: 'not_found', message: 'No list founded' };
  
  return content.movieTvshow
}

export async function deleteOneContentDataFromAList(listId: number, contentId: number, userId: number) {
  if (isNaN(contentId)) throw { type: 'not_found', message: 'No list founded' };

  const list = await checkListExistence(listId);
  if(list.userId !== userId) throw { type: 'unauthorized', message: 'This list is not yours!' };

  return await contentsRepo.deleteOneContentFromAList(listId, contentId);
}


async function checkListExistence(listId: number) {
  const list = await listsRepo.getList(listId);
  if (!list) throw { type: 'not_found', message: 'List not found!' };
  return list
}
