-- CreateTable
CREATE TABLE `Standard` (
    `base_code` VARCHAR(191) NOT NULL,
    `last_update` DATETIME(3) NOT NULL,
    `next_update` DATETIME(3) NOT NULL,
    `conversion_rates` JSON NOT NULL,

    PRIMARY KEY (`base_code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
