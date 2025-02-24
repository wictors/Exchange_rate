/*
  Warnings:

  - The primary key for the `History_Rates` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `History_Rates` DROP PRIMARY KEY,
    ADD PRIMARY KEY (`base_code`, `year`, `month`, `day`);
