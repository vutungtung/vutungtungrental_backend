-- CreateTable
CREATE TABLE `booking` (
    `bookingId` INTEGER NOT NULL AUTO_INCREMENT,
    `bookingDate` DATETIME(3) NOT NULL,
    `returnDate` DATETIME(3) NOT NULL,
    `useremail` VARCHAR(191) NOT NULL,
    `vehicleId` INTEGER NOT NULL,
    `categoryId` INTEGER NOT NULL,
    `price` VARCHAR(191) NOT NULL,
    `pickuplocation` VARCHAR(191) NOT NULL,
    `droplocation` VARCHAR(191) NOT NULL,
    `licenseNo` VARCHAR(191) NOT NULL,
    `licenseImg` VARCHAR(191) NULL,
    `paymentMethod` ENUM('eSewa', 'khalti', 'fonePay', 'cashOnDelivery') NOT NULL DEFAULT 'cashOnDelivery',
    `paymentStatus` ENUM('pending', 'hold', 'completed') NOT NULL DEFAULT 'pending',
    `deliverystatus` ENUM('pending', 'dilivered', 'cancled') NOT NULL DEFAULT 'pending',

    PRIMARY KEY (`bookingId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `booking` ADD CONSTRAINT `booking_useremail_fkey` FOREIGN KEY (`useremail`) REFERENCES `user`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `booking` ADD CONSTRAINT `booking_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`c_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `booking` ADD CONSTRAINT `booking_vehicleId_fkey` FOREIGN KEY (`vehicleId`) REFERENCES `Vehicle`(`v_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
