-- AlterTable
ALTER TABLE `admin` ADD COLUMN `otpExpired` BIGINT NULL,
    ADD COLUMN `otpVerify` VARCHAR(191) NULL DEFAULT '',
    ADD COLUMN `verified` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `user` MODIFY `otpVerify` VARCHAR(191) NULL DEFAULT '';
