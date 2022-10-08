import prisma from "../database/database";

export async function getOneContent(contentId: number) {
  return prisma.moviesTvshows.findUnique({ where: { contentId } });
}

export async function createContent(contentData: any) {
  return prisma.moviesTvshows.create({ data: contentData});
}

export async function createRelationListAndContent(listId: number, contentId: number) {
  return prisma.listsMoviesTvshows.create({ data: { listId, movieTvshowId: contentId} });
}