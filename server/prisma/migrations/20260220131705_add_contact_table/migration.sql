-- CreateTable
CREATE TABLE `contacts` (
    `id` CHAR(36) NOT NULL,
    `fullname` VARCHAR(191) NOT NULL,
    `phone_number` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `content` LONGTEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
