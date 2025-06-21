/*
  Warnings:

  - Made the column `description` on table `category` required. This step will fail if there are existing NULL values in that column.
  - Made the column `imageUrl` on table `category` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `vehicle` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `vehicle` required. This step will fail if there are existing NULL values in that column.
  - Made the column `imageUrl` on table `vehicle` required. This step will fail if there are existing NULL values in that column.
  - Made the column `price` on table `vehicle` required. This step will fail if there are existing NULL values in that column.
  - Made the column `categoryId` on table `vehicle` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `vehicle` DROP FOREIGN KEY `Vehicle_categoryId_fkey`;

-- DropIndex
DROP INDEX `Vehicle_categoryId_fkey` ON `vehicle`;

-- AlterTable
ALTER TABLE `category` MODIFY `description` VARCHAR(191) NOT NULL,
    MODIFY `imageUrl` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `vehicle` MODIFY `name` VARCHAR(191) NOT NULL,
    MODIFY `description` VARCHAR(191) NOT NULL,
    MODIFY `imageUrl` VARCHAR(191) NOT NULL,
    MODIFY `price` DOUBLE NOT NULL,
    MODIFY `categoryId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Vehicle` ADD CONSTRAINT `Vehicle_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`c_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
