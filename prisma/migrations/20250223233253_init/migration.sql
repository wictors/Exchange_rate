/*
  Warnings:

  - You are about to drop the `Standard` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Standard`;

-- CreateTable
CREATE TABLE `History_Rates` (
    `base_code` VARCHAR(191) NOT NULL,
    `year` INTEGER NOT NULL,
    `month` INTEGER NOT NULL,
    `day` INTEGER NOT NULL,
    `conversion_rates` JSON NOT NULL,

    PRIMARY KEY (`base_code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Codes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codes` JSON NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
