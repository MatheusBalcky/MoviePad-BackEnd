/*
  Warnings:

  - A unique constraint covering the columns `[contentId]` on the table `moviesTvshows` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "moviesTvshows_contentId_key" ON "moviesTvshows"("contentId");
