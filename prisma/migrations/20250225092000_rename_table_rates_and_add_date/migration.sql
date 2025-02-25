/*
  Warnings:

  - You are about to drop the `History_Rates` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `History_Rates`;

-- CreateTable
CREATE TABLE `Rates` (
    `base_code` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `conversion_rates` JSON NOT NULL,

    PRIMARY KEY (`base_code`, `date`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
