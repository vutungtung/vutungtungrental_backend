/*
  Warnings:

  - The primary key for the `vehicle` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `make` on the `vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `model` on the `vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `vehicleId` on the `vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `vin` on the `vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `vehicle` table. All the data in the column will be lost.
  - Added the required column `location` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `v_id` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Made the column `imageUrl` on table `vehicle` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `vehicle` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `Vehicle_vin_key` ON `vehicle`;

-- AlterTable
ALTER TABLE `vehicle` DROP PRIMARY KEY,
    DROP COLUMN `createdAt`,
    DROP COLUMN `make`,
    DROP COLUMN `model`,
    DROP COLUMN `updatedAt`,
    DROP COLUMN `vehicleId`,
    DROP COLUMN `vin`,
    DROP COLUMN `year`,
    ADD COLUMN `location` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `price` DOUBLE NOT NULL,
    ADD COLUMN `type` VARCHAR(191) NOT NULL,
    ADD COLUMN `v_id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `imageUrl` VARCHAR(191) NOT NULL,
    MODIFY `description` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`v_id`);
