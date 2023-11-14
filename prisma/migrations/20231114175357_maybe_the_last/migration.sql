-- DropForeignKey
ALTER TABLE `application` DROP FOREIGN KEY `Application_offerId_fkey`;

-- DropForeignKey
ALTER TABLE `application` DROP FOREIGN KEY `Application_userId_fkey`;

-- DropForeignKey
ALTER TABLE `offer` DROP FOREIGN KEY `Offer_userId_fkey`;

-- DropForeignKey
ALTER TABLE `resume` DROP FOREIGN KEY `Resume_userId_fkey`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_roleId_fkey`;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Resume` ADD CONSTRAINT `Resume_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Offer` ADD CONSTRAINT `Offer_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Application` ADD CONSTRAINT `Application_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Application` ADD CONSTRAINT `Application_offerId_fkey` FOREIGN KEY (`offerId`) REFERENCES `Offer`(`reference`) ON DELETE CASCADE ON UPDATE CASCADE;
