/*
  Warnings:

  - You are about to drop the column `resetUpdateOtp` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `resetUpdateOtp`,
    ADD COLUMN `UpdateOtpExpire` DATETIME(3) NULL;
