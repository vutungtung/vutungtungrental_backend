/*
  Warnings:

  - A unique constraint covering the columns `[refreshToken]` on the table `login` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `login_refreshToken_key` ON `login`(`refreshToken`);
