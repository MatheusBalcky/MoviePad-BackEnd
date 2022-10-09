import prisma from "../database/database";

export async function getOneContent(contentIdTMDB: number) {
  return prisma.moviesTvshows.findUnique({ where: { contentId: contentIdTMDB } });
}

export async function getOneContentById(contentId: number) {
  return prisma.moviesTvshows.findUnique({ where: { id: contentId } });
}

export async function createContent(contentData: any) {
  return prisma.moviesTvshows.create({ data: contentData});
}

export async function createRelationListAndContent(listId: number, contentId: number) {
  return prisma.listsMoviesTvshows.create({ data: { listId, movieTvshowId: contentId} });
}