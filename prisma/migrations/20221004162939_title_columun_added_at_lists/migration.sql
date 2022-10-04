/*
  Warnings:

  - Added the required column `title` to the `lists` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "lists" ADD COLUMN     "title" TEXT NOT NULL;
