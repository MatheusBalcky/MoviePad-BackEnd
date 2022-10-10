import prisma from "../database/database";

export async function getOneContent(contentIdTMDB: number) {
  return prisma.moviesTvshows.findUnique({ where: { contentId: contentIdTMDB } });
}

export async function getOneContentFromAListById(listId: number, contentId: number) {
  const result: any = await prisma.listsMoviesTvshows.findMany({
    where: {
      AND: [{ movieTvshowId: contentId }, { listId: listId }] 
    },
    include: {
      movieTvshow: true
    }
  });
  return result[0]
}

export async function createContent(contentData: any) {
  return prisma.moviesTvshows.create({ data: contentData});
}

export async function createRelationListAndContent(listId: number, contentId: number) {
  return prisma.listsMoviesTvshows.create({ data: { listId, movieTvshowId: contentId} });
}

export async function deleteOneContentFromAList(listId: number, contentId: number) {
  return await prisma.listsMoviesTvshows.deleteMany({
    where: {
      AND: [{ movieTvshowId: contentId }, { listId: listId }]
    }
  });
}