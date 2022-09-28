-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lists" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "listsMoviesTvshows" (
    "id" SERIAL NOT NULL,
    "listId" INTEGER NOT NULL,
    "movieTvshowId" INTEGER NOT NULL,

    CONSTRAINT "listsMoviesTvshows_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "moviesTvshows" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "pictureUrl" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "releaseYear" INTEGER NOT NULL,
    "trailerUrl" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "moviesTvshows_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "lists" ADD CONSTRAINT "lists_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "listsMoviesTvshows" ADD CONSTRAINT "listsMoviesTvshows_listId_fkey" FOREIGN KEY ("listId") REFERENCES "lists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "listsMoviesTvshows" ADD CONSTRAINT "listsMoviesTvshows_movieTvshowId_fkey" FOREIGN KEY ("movieTvshowId") REFERENCES "moviesTvshows"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
