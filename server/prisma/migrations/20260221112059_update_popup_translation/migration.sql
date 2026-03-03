/*
  Warnings:

  - You are about to drop the column `content` on the `popups` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `popups` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `popups` DROP COLUMN `content`,
    DROP COLUMN `title`;

-- CreateTable
CREATE TABLE `popup_translations` (
    `id` CHAR(36) NOT NULL,
    `popup_id` CHAR(36) NOT NULL,
    `language_id` CHAR(36) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `content` LONGTEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `popup_translations_language_id_idx`(`language_id`),
    UNIQUE INDEX `popup_translations_popup_id_language_id_key`(`popup_id`, `language_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `popup_translations` ADD CONSTRAINT `popup_translations_popup_id_fkey` FOREIGN KEY (`popup_id`) REFERENCES `popups`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `popup_translations` ADD CONSTRAINT `popup_translations_language_id_fkey` FOREIGN KEY (`language_id`) REFERENCES `languages`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
