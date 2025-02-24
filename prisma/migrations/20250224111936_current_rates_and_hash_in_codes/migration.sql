/*
  Warnings:

  - A unique constraint covering the columns `[hash]` on the table `Codes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `hash` to the `Codes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Codes` ADD COLUMN `hash` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Current_Rates` (
    `base_code` VARCHAR(191) NOT NULL,
    `next_update` BIGINT NOT NULL,
    `conversion_rates` JSON NOT NULL,

    PRIMARY KEY (`base_code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Codes_hash_key` ON `Codes`(`hash`);
