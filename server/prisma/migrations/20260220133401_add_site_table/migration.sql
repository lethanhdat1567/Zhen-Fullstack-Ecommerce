-- CreateTable
CREATE TABLE `site_settings` (
    `id` CHAR(36) NOT NULL,
    `phone_number` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `open_time` VARCHAR(191) NULL,
    `logo` VARCHAR(191) NULL,
    `google_map_embed` LONGTEXT NULL,
    `facebook_url` VARCHAR(191) NULL,
    `instagram_url` VARCHAR(191) NULL,
    `tiktok_url` VARCHAR(191) NULL,
    `youtube_url` VARCHAR(191) NULL,
    `meta_title_default` VARCHAR(191) NULL,
    `meta_description_default` LONGTEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
