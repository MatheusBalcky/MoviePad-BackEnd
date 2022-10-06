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
  const result = await(
    <any>prisma.$queryRaw`
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

  WHERE lists.id = ${listId} AND lists."userId" = ${userId}`
  );

  if(result.length === 0) return false;

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

  if (result[0].contentTitle === null) resultFormated["contents"] = [];

  return resultFormated;
}
