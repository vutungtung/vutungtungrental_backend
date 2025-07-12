/*
  Warnings:

  - Added the required column `paymentMethod` to the `booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `booking` ADD COLUMN `paymentMethod` ENUM('eSewa', 'khalti', 'fonePay', 'cashOnDelivery') NOT NULL;
