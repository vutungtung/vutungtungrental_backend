-- CreateTable
CREATE TABLE `booking` (
    `bookingId` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `ownername` VARCHAR(191) NOT NULL,
    `bookingDate` DATETIME(3) NOT NULL,
    `returnDate` DATETIME(3) NOT NULL,
    `useremail` VARCHAR(191) NOT NULL,
    `vehicleId` INTEGER NOT NULL,
    `categoryId` INTEGER NOT NULL,
    `price` VARCHAR(191) NOT NULL,
    `pickuplocation` VARCHAR(191) NOT NULL,
    `droplocation` VARCHAR(191) NOT NULL,
    `paymentStatus` ENUM('pending', 'hold', 'completed') NOT NULL DEFAULT 'pending',
    `deliverystatus` ENUM('pending', 'dilivered', 'cancled') NOT NULL DEFAULT 'pending',

    PRIMARY KEY (`bookingId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `booking` ADD CONSTRAINT `booking_vehicleId_fkey` FOREIGN KEY (`vehicleId`) REFERENCES `Vehicle`(`v_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `booking` ADD CONSTRAINT `booking_useremail_fkey` FOREIGN KEY (`useremail`) REFERENCES `user`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `booking` ADD CONSTRAINT `booking_ownername_fkey` FOREIGN KEY (`ownername`) REFERENCES `admin`(`ownername`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `booking` ADD CONSTRAINT `booking_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `category`(`c_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `category` RENAME INDEX `Category_c_id_name_key` TO `category_c_id_name_key`;

-- RenameIndex
ALTER TABLE `category` RENAME INDEX `Category_name_key` TO `category_name_key`;
