/*
  Warnings:

  - The `otpExpired` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `resetOtpExpired` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `otpExpired`,
    ADD COLUMN `otpExpired` DATETIME(3) NULL,
    DROP COLUMN `resetOtpExpired`,
    ADD COLUMN `resetOtpExpired` DATETIME(3) NULL;
