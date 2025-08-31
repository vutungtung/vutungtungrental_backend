/*
  Warnings:

  - You are about to drop the column `description` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `vehicle` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[licensePlate]` on the table `Vehicle` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[vin]` on the table `Vehicle` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `brand` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dailyRate` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `licensePlate` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `model` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seatingCapacity` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `category` DROP COLUMN `description`,
    DROP COLUMN `imageUrl`;

-- AlterTable
ALTER TABLE `vehicle` DROP COLUMN `description`,
    DROP COLUMN `imageUrl`,
    DROP COLUMN `price`,
    ADD COLUMN `brand` VARCHAR(191) NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `dailyRate` DECIMAL(10, 2) NOT NULL,
    ADD COLUMN `fuelType` ENUM('PETROL', 'DIESEL', 'ELECTRIC', 'HYBRID') NOT NULL DEFAULT 'PETROL',
    ADD COLUMN `image` VARCHAR(191) NULL,
    ADD COLUMN `image1` VARCHAR(191) NULL,
    ADD COLUMN `image2` VARCHAR(191) NULL,
    ADD COLUMN `licensePlate` VARCHAR(191) NOT NULL,
    ADD COLUMN `mileage` INTEGER NULL,
    ADD COLUMN `model` VARCHAR(191) NOT NULL,
    ADD COLUMN `seatingCapacity` INTEGER NOT NULL,
    ADD COLUMN `status` ENUM('AVAILABLE', 'RENTED', 'MAINTENANCE', 'UNAVAILABLE') NOT NULL DEFAULT 'AVAILABLE',
    ADD COLUMN `transmission` ENUM('MANUAL', 'AUTOMATIC') NOT NULL DEFAULT 'MANUAL',
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `vin` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Rental` (
    `r_id` INTEGER NOT NULL AUTO_INCREMENT,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `totalPrice` DECIMAL(10, 2) NOT NULL,
    `status` ENUM('PENDING', 'ACTIVE', 'COMPLETED', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
    `drivingLicense` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `citizenship` VARCHAR(191) NULL,
    `vehicleId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`r_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `u_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`u_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Category_name_key` ON `Category`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Vehicle_licensePlate_key` ON `Vehicle`(`licensePlate`);

-- CreateIndex
CREATE UNIQUE INDEX `Vehicle_vin_key` ON `Vehicle`(`vin`);

-- AddForeignKey
ALTER TABLE `Rental` ADD CONSTRAINT `Rental_vehicleId_fkey` FOREIGN KEY (`vehicleId`) REFERENCES `Vehicle`(`v_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rental` ADD CONSTRAINT `Rental_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`u_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
