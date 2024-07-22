-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "rsvpCode" TEXT NOT NULL,
    "attending" BOOLEAN NOT NULL,
    "starter" TEXT,
    "mainCourse" TEXT,
    "desert" TEXT,
    "dietaryReqs" TEXT,
    "favSong" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ExtraPerson" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "starter" TEXT NOT NULL,
    "mainCourse" TEXT NOT NULL,
    "desert" TEXT NOT NULL,
    "dietaryReqs" TEXT NOT NULL,
    "favSong" TEXT NOT NULL,
    "addedBy" TEXT NOT NULL,
    CONSTRAINT "ExtraPerson_addedBy_fkey" FOREIGN KEY ("addedBy") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
