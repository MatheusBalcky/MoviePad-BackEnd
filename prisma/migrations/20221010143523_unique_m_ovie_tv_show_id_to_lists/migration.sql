/*
  Warnings:

  - A unique constraint covering the columns `[listId,movieTvshowId]` on the table `listsMoviesTvshows` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "listsMoviesTvshows_listId_movieTvshowId_key" ON "listsMoviesTvshows"("listId", "movieTvshowId");
