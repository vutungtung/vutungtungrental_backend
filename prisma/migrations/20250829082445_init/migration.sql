-- AlterTable
ALTER TABLE `user` MODIFY `otpExpired` BIGINT NOT NULL,
    MODIFY `resetOtpExpired` BIGINT NOT NULL;
