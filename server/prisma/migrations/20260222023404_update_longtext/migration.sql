-- AlterTable
ALTER TABLE `media_album_translations` MODIFY `description` LONGTEXT NULL;

-- AlterTable
ALTER TABLE `post_translations` MODIFY `description` LONGTEXT NULL;

-- AlterTable
ALTER TABLE `product_translations` MODIFY `description` LONGTEXT NULL,
    MODIFY `content` LONGTEXT NULL;

-- AlterTable
ALTER TABLE `service_translations` MODIFY `description` LONGTEXT NULL,
    MODIFY `content` LONGTEXT NULL;
