-- CreateTable
CREATE TABLE `recruitments` (
    `id` CHAR(36) NOT NULL,
    `address` TEXT NULL,
    `quantity` INTEGER NOT NULL DEFAULT 1,
    `status` ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `recruitments_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `recruitment_translations` (
    `id` CHAR(36) NOT NULL,
    `recruitment_id` CHAR(36) NOT NULL,
    `language_id` CHAR(36) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `recruitment_translations_language_id_idx`(`language_id`),
    UNIQUE INDEX `recruitment_translations_recruitment_id_language_id_key`(`recruitment_id`, `language_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `recruitment_translations` ADD CONSTRAINT `recruitment_translations_recruitment_id_fkey` FOREIGN KEY (`recruitment_id`) REFERENCES `recruitments`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `recruitment_translations` ADD CONSTRAINT `recruitment_translations_language_id_fkey` FOREIGN KEY (`language_id`) REFERENCES `languages`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
