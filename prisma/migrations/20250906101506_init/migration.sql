-- AlterTable
ALTER TABLE `user` ADD COLUMN `resetUpdateOtp` DATETIME(3) NULL,
    ADD COLUMN `updateOtp` VARCHAR(191) NULL;
