/*
  Warnings:

  - You are about to drop the `moviesAndTvshows` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "moviesAndTvshows" DROP CONSTRAINT "moviesAndTvshows_listId_fkey";

-- DropForeignKey
ALTER TABLE "moviesAndTvshows" DROP CONSTRAINT "moviesAndTvshows_movieTvshowId_fkey";

-- DropTable
DROP TABLE "moviesAndTvshows";

-- CreateTable
CREATE TABLE "listsMoviesTvshows" (
    "id" SERIAL NOT NULL,
    "listId" INTEGER NOT NULL,
    "movieTvshowId" INTEGER NOT NULL,

    CONSTRAINT "listsMoviesTvshows_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "listsMoviesTvshows" ADD CONSTRAINT "listsMoviesTvshows_listId_fkey" FOREIGN KEY ("listId") REFERENCES "lists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "listsMoviesTvshows" ADD CONSTRAINT "listsMoviesTvshows_movieTvshowId_fkey" FOREIGN KEY ("movieTvshowId") REFERENCES "moviesTvshows"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
