-- AlterTable
ALTER TABLE `user` MODIFY `otpExpired` BIGINT NULL,
    MODIFY `resetOtpExpired` BIGINT NULL;
