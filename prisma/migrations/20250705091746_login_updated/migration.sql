/*
  Warnings:

  - Added the required column `adminId` to the `login` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `login` ADD COLUMN `adminId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `login` ADD CONSTRAINT `login_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `admin`(`adminId`) ON DELETE RESTRICT ON UPDATE CASCADE;
