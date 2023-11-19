/*
  Warnings:

  - You are about to drop the `resume` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[reference]` on the table `Offer` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `resume` DROP FOREIGN KEY `Resume_userId_fkey`;

-- AlterTable
ALTER TABLE `offer` MODIFY `reference` VARCHAR(191) NULL,
    MODIFY `publicationDate` DATETIME(3) NULL,
    MODIFY `isApproved` BOOLEAN NULL DEFAULT false;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `resume` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `resume`;

-- CreateIndex
CREATE UNIQUE INDEX `Offer_reference_key` ON `Offer`(`reference`);
