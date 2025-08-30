/*
  Warnings:

  - You are about to drop the column `otpExpried` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `resetOtpExperied` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `otpExpried`,
    DROP COLUMN `resetOtpExperied`,
    ADD COLUMN `otpExpired` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `resetOtpExpired` INTEGER NOT NULL DEFAULT 0;
