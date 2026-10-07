import db, { pool, withCreatedAt } from '../database/database';
import * as Is from '../interfaces/interfaces';

export async function createList(listData: Is.ListData) {
  return withCreatedAt(await db.orm.public.lists.create(listData));
}

export async function getList(listId: number) {
  const list = await db.orm.public.lists.where({ id: listId }).first();
  return list ? withCreatedAt(list) : null;
}

export async function deleteListAndItsContents(listId: number) {
  const count = await db.orm.public.listsMoviesTvshows.where({ listId }).deleteAndCount();
  const list = await db.orm.public.lists.where({ id: listId }).delete();
  return [list ? withCreatedAt(list) : null, { count }];
}

export async function getLists(userId: number) {
  const lists = await db.orm.public.lists
    .where({ userId })
    .include('listsMoviesTvshows', (contents) => contents.count())
    .all();
  return lists.map(({ listsMoviesTvshows, ...list }) => ({
    ...withCreatedAt(list),
    _count: { listsMoviesTvshows }
  }));
}

export async function getOneListAndItsContents(listId: number, userId: number) {
  const { rows: result } = await pool.query(`
  SELECT
    lists.id as "listId",
    lists."userId",
    lists.title as "listTitle",
    lists."iconList",
    lists."createdAt",
    "listsMoviesTvshows".id as "contentIdAtList",
    "moviesTvshows".id as "contentIdAtContents",
    "moviesTvshows".title as "contentTitle",
    "moviesTvshows"."pictureUrl" as "contentImgUrl",
    "moviesTvshows".description as "contentDescription",
    "moviesTvshows".rating as "contentRating",
    "moviesTvshows"."releaseYear" as "contentReleaseDate",
    "moviesTvshows"."contentId" as "contentIdApi"
  FROM lists
  LEFT JOIN "listsMoviesTvshows" ON "listsMoviesTvshows"."listId" = lists.id
  LEFT JOIN "moviesTvshows" ON "listsMoviesTvshows"."movieTvshowId" = "moviesTvshows".id

  WHERE lists.id = $1 AND lists."userId" = $2`, [listId, userId]);

  if (result.length === 0) return false;

  const resultFormated = {
    listId: result[0].listId,
    userId: result[0].userId,
    listTitle: result[0].listTitle,
    iconList: result[0].iconList,
    createdAt: result[0].createdAt,
    contents: result.map((item: any) => {
      delete item.listId;
      delete item.userId;
      delete item.listTitle;
      delete item.iconList;
      delete item.createdAt;
      return { ...item };
    })
  };

  if (result[0].contentTitle === null) resultFormated['contents'] = [];

  return resultFormated;
}
