-- AlterTable
ALTER TABLE `booking` MODIFY `paymentMethod` ENUM('eSewa', 'khalti', 'fonePay', 'cashOnDelivery') NOT NULL DEFAULT 'cashOnDelivery';
