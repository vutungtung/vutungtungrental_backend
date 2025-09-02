/*
  Warnings:

  - You are about to alter the column `price` on the `booking` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE `booking` MODIFY `price` DECIMAL(10, 2) NOT NULL;
