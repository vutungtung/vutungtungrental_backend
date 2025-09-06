/*
  Warnings:

  - You are about to drop the column `UpdateOtpExpire` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `UpdateOtpExpire`,
    ADD COLUMN `updateOtpExpire` DATETIME(3) NULL;
