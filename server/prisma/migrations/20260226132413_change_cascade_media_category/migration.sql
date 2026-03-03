-- DropForeignKey
ALTER TABLE `media_category_translations` DROP FOREIGN KEY `media_category_translations_category_id_fkey`;

-- AddForeignKey
ALTER TABLE `media_category_translations` ADD CONSTRAINT `media_category_translations_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `media_categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
