/*
  Warnings:

  - You are about to drop the `listsMoviesTvshows` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "listsMoviesTvshows" DROP CONSTRAINT "listsMoviesTvshows_listId_fkey";

-- DropForeignKey
ALTER TABLE "listsMoviesTvshows" DROP CONSTRAINT "listsMoviesTvshows_movieTvshowId_fkey";

-- DropTable
DROP TABLE "listsMoviesTvshows";

-- CreateTable
CREATE TABLE "moviesAndTvshows" (
    "id" SERIAL NOT NULL,
    "listId" INTEGER NOT NULL,
    "movieTvshowId" INTEGER NOT NULL,

    CONSTRAINT "moviesAndTvshows_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "moviesAndTvshows" ADD CONSTRAINT "moviesAndTvshows_listId_fkey" FOREIGN KEY ("listId") REFERENCES "lists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "moviesAndTvshows" ADD CONSTRAINT "moviesAndTvshows_movieTvshowId_fkey" FOREIGN KEY ("movieTvshowId") REFERENCES "moviesTvshows"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
