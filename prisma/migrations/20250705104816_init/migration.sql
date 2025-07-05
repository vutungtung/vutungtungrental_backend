-- DropForeignKey
ALTER TABLE `login` DROP FOREIGN KEY `login_adminId_fkey`;

-- DropForeignKey
ALTER TABLE `login` DROP FOREIGN KEY `login_userId_fkey`;

-- DropIndex
DROP INDEX `login_adminId_fkey` ON `login`;

-- DropIndex
DROP INDEX `login_userId_fkey` ON `login`;

-- AlterTable
ALTER TABLE `login` MODIFY `userId` INTEGER NULL,
    MODIFY `adminId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `login` ADD CONSTRAINT `login_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`userId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `login` ADD CONSTRAINT `login_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `admin`(`adminId`) ON DELETE SET NULL ON UPDATE CASCADE;
