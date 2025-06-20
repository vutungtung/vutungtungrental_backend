/*
  Warnings:

  - You are about to drop the column `userId` on the `vehicle` table. All the data in the column will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `vehicle` DROP FOREIGN KEY `Vehicle_userId_fkey`;

-- DropIndex
DROP INDEX `Vehicle_userId_fkey` ON `vehicle`;

-- AlterTable
ALTER TABLE `vehicle` DROP COLUMN `userId`,
    MODIFY `imageUrl` VARCHAR(191) NULL,
    MODIFY `description` VARCHAR(191) NULL,
    MODIFY `location` VARCHAR(191) NULL,
    MODIFY `name` VARCHAR(191) NULL,
    MODIFY `price` DOUBLE NULL,
    MODIFY `type` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `user`;
