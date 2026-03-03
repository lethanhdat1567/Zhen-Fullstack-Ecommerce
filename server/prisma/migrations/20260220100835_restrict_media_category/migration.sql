-- DropForeignKey
ALTER TABLE `media_albums` DROP FOREIGN KEY `media_albums_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `media_category_translations` DROP FOREIGN KEY `media_category_translations_category_id_fkey`;

-- DropIndex
DROP INDEX `media_albums_category_id_fkey` ON `media_albums`;

-- AddForeignKey
ALTER TABLE `media_category_translations` ADD CONSTRAINT `media_category_translations_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `media_categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `media_albums` ADD CONSTRAINT `media_albums_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `media_categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
