/*
  Warnings:

  - Added the required column `contentId` to the `moviesTvshows` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `releaseYear` on the `moviesTvshows` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "moviesTvshows" ADD COLUMN     "contentId" INTEGER NOT NULL,
DROP COLUMN "releaseYear",
ADD COLUMN     "releaseYear" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "trailerUrl" DROP NOT NULL;
