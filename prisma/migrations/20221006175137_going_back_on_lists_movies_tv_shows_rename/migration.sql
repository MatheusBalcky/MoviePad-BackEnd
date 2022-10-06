/*
  Warnings:

  - The primary key for the `listsMoviesTvshows` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `contentIdAtList` on the `listsMoviesTvshows` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "listsMoviesTvshows" DROP CONSTRAINT "listsMoviesTvshows_pkey",
DROP COLUMN "contentIdAtList",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "listsMoviesTvshows_pkey" PRIMARY KEY ("id");
