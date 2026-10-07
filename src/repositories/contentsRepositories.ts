import db from '../database/database';

export async function getOneContent(contentIdTMDB: number) {
  return db.orm.public.moviesTvshows.where({ contentId: contentIdTMDB }).first();
}

export async function getOneContentFromAListById(listId: number, contentId: number) {
  return db.orm.public.listsMoviesTvshows
    .where({ movieTvshowId: contentId, listId })
    .include('movieTvshow')
    .first();
}

export async function createContent(contentData: any) {
  return db.orm.public.moviesTvshows.create(contentData);
}

export async function createRelationListAndContent(listId: number, contentId: number) {
  return db.orm.public.listsMoviesTvshows.create({ listId, movieTvshowId: contentId });
}

export async function deleteOneContentFromAList(listId: number, contentId: number) {
  const count = await db.orm.public.listsMoviesTvshows
    .where({ movieTvshowId: contentId, listId })
    .deleteAndCount();
  return { count };
}
