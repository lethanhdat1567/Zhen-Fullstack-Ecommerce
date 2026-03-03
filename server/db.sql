-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.44 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table zhen.admins
CREATE TABLE IF NOT EXISTS `admins` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password_hash` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `full_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'admin',
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `last_login_at` datetime(3) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `admins_username_key` (`username`),
  UNIQUE KEY `admins_email_key` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table zhen.admins: ~0 rows (approximately)

-- Dumping structure for table zhen.admin_tokens
CREATE TABLE IF NOT EXISTS `admin_tokens` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `admin_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expired_at` datetime(3) NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `admin_tokens_admin_id_idx` (`admin_id`),
  KEY `admin_tokens_type_idx` (`type`),
  CONSTRAINT `admin_tokens_admin_id_fkey` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table zhen.admin_tokens: ~0 rows (approximately)

-- Dumping structure for table zhen.contacts
CREATE TABLE IF NOT EXISTS `contacts` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fullname` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_number` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table zhen.contacts: ~0 rows (approximately)
INSERT INTO `contacts` (`id`, `fullname`, `phone_number`, `email`, `content`, `created_at`, `updated_at`) VALUES
	('1ee3d02f-d415-482d-8433-989d18c68ae8', 'Nguyen Van A', '0909123456', 'lethanhdat1567@gmail.com', 'Tôi muốn được tư vấn thêm về dịch vụ của công ty.', '2026-02-20 13:23:19.405', '2026-02-20 13:23:19.405');

-- Dumping structure for table zhen.hero_banners
CREATE TABLE IF NOT EXISTS `hero_banners` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `thumbnail` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sort_order` int NOT NULL DEFAULT '0',
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `hero_banners_sort_order_idx` (`sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table zhen.hero_banners: ~2 rows (approximately)
INSERT INTO `hero_banners` (`id`, `thumbnail`, `sort_order`, `created_at`, `updated_at`) VALUES
	('04f3cd58-e9a5-4bc6-ab14-dd491830c474', '/uploads/hero/banner2.jpg', 2, '2026-02-20 13:49:03.929', '2026-02-20 13:49:03.929'),
	('82a80c6c-cbda-4f76-b6bf-18cbabae2b38', '/uploads/hero/banner1.jpg', 1, '2026-02-20 13:49:03.927', '2026-02-20 13:49:03.927');

-- Dumping structure for table zhen.languages
CREATE TABLE IF NOT EXISTS `languages` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_default` tinyint(1) NOT NULL DEFAULT '0',
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `languages_code_key` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table zhen.languages: ~0 rows (approximately)
INSERT INTO `languages` (`id`, `code`, `name`, `is_default`, `status`, `created_at`, `updated_at`) VALUES
	('ee6ca771-0e1b-11f1-bd10-005056c00001', 'vi', 'Vietnamese', 1, 'active', '2026-02-20 12:20:55.219', '2026-02-20 12:20:55.219'),
	('ee6cb970-0e1b-11f1-bd10-005056c00001', 'en', 'English', 0, 'active', '2026-02-20 12:20:55.219', '2026-02-20 12:20:55.219'),
	('ee6cbe22-0e1b-11f1-bd10-005056c00001', 'fr', 'French', 0, 'active', '2026-02-20 12:20:55.219', '2026-02-20 12:20:55.219');

-- Dumping structure for table zhen.media_albums
CREATE TABLE IF NOT EXISTS `media_albums` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'draft',
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `media_albums_category_id_fkey` (`category_id`),
  CONSTRAINT `media_albums_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `media_categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table zhen.media_albums: ~0 rows (approximately)
INSERT INTO `media_albums` (`id`, `category_id`, `status`, `created_at`, `updated_at`) VALUES
	('27440c85-4c77-429c-9dd2-a79a40a51298', 'ce7aedf4-1395-4841-9385-888bafae65d1', 'active', '2026-02-20 10:05:06.194', '2026-02-20 10:05:06.194');

-- Dumping structure for table zhen.media_album_translations
CREATE TABLE IF NOT EXISTS `media_album_translations` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `album_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `language_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `media_album_translations_album_id_language_id_key` (`album_id`,`language_id`),
  KEY `media_album_translations_language_id_fkey` (`language_id`),
  CONSTRAINT `media_album_translations_album_id_fkey` FOREIGN KEY (`album_id`) REFERENCES `media_albums` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `media_album_translations_language_id_fkey` FOREIGN KEY (`language_id`) REFERENCES `languages` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table zhen.media_album_translations: ~0 rows (approximately)
INSERT INTO `media_album_translations` (`id`, `album_id`, `language_id`, `title`, `slug`, `description`, `created_at`, `updated_at`) VALUES
	('101a9ebd-84f7-4f5c-ae6e-7b11a5c87ee8', '27440c85-4c77-429c-9dd2-a79a40a51298', 'ee6cb970-0e1b-11f1-bd10-005056c00001', 'Website Design Service', 'website-design-service', 'We provide professional website design services with SEO optimization and high performance.', '2026-02-20 10:05:06.194', '2026-02-20 10:05:06.194'),
	('32d2c5aa-ee08-42b0-800c-92d435f847e4', '27440c85-4c77-429c-9dd2-a79a40a51298', 'ee6ca771-0e1b-11f1-bd10-005056c00001', 'Dịch vụ thiết kế website', 'dich-vu-thiet-ke-website', 'Chúng tôi cung cấp dịch vụ thiết kế website chuyên nghiệp, tối ưu SEO và hiệu suất.', '2026-02-20 10:05:06.194', '2026-02-20 10:05:06.194'),
	('b84a9d86-083b-4aeb-90db-c3ee522555e4', '27440c85-4c77-429c-9dd2-a79a40a51298', 'ee6cbe22-0e1b-11f1-bd10-005056c00001', 'Service de conception de site web', 'service-conception-site-web', 'Nous fournissons des services professionnels de conception de sites web optimisés pour le SEO.', '2026-02-20 10:05:06.194', '2026-02-20 10:05:06.194');

-- Dumping structure for table zhen.media_categories
CREATE TABLE IF NOT EXISTS `media_categories` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table zhen.media_categories: ~0 rows (approximately)
INSERT INTO `media_categories` (`id`, `status`, `created_at`, `updated_at`) VALUES
	('ce7aedf4-1395-4841-9385-888bafae65d1', 'active', '2026-02-20 10:04:47.760', '2026-02-20 10:04:47.760');

-- Dumping structure for table zhen.media_category_translations
CREATE TABLE IF NOT EXISTS `media_category_translations` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `language_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `media_category_translations_category_id_language_id_key` (`category_id`,`language_id`),
  KEY `media_category_translations_language_id_fkey` (`language_id`),
  CONSTRAINT `media_category_translations_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `media_categories` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `media_category_translations_language_id_fkey` FOREIGN KEY (`language_id`) REFERENCES `languages` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table zhen.media_category_translations: ~0 rows (approximately)
INSERT INTO `media_category_translations` (`id`, `category_id`, `language_id`, `name`, `slug`, `created_at`, `updated_at`) VALUES
	('2ddd4a20-8237-49e0-a0f3-dc92671f286e', 'ce7aedf4-1395-4841-9385-888bafae65d1', 'ee6cbe22-0e1b-11f1-bd10-005056c00001', 'Catégorie de service', 'categorie-de-service', '2026-02-20 10:04:47.760', '2026-02-20 10:04:47.760'),
	('65563ad5-c642-475b-981f-3b1855cac6c3', 'ce7aedf4-1395-4841-9385-888bafae65d1', 'ee6cb970-0e1b-11f1-bd10-005056c00001', 'Service Category', 'service-category', '2026-02-20 10:04:47.760', '2026-02-20 10:04:47.760'),
	('d0d92c09-c35d-4b6d-9c04-140d5764ca2a', 'ce7aedf4-1395-4841-9385-888bafae65d1', 'ee6ca771-0e1b-11f1-bd10-005056c00001', 'Danh mục dịch vụ', 'danh-muc-dich-vu', '2026-02-20 10:04:47.760', '2026-02-20 10:04:47.760');

-- Dumping structure for table zhen.media_items
CREATE TABLE IF NOT EXISTS `media_items` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `album_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `file_url` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sort_order` int NOT NULL DEFAULT '0',
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `media_items_album_id_fkey` (`album_id`),
  CONSTRAINT `media_items_album_id_fkey` FOREIGN KEY (`album_id`) REFERENCES `media_albums` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table zhen.media_items: ~0 rows (approximately)
INSERT INTO `media_items` (`id`, `album_id`, `type`, `file_url`, `sort_order`, `created_at`, `updated_at`) VALUES
	('240937ac-a446-4c3e-9365-4e248118cd9a', '27440c85-4c77-429c-9dd2-a79a40a51298', 'image', '/uploads/images/a1a66d9e-dc70-4e5a-9b9a-0a97d4802c22_1771581904564.jpg', 3, '2026-02-20 10:05:06.194', '2026-02-20 10:05:06.194'),
	('8c091428-9370-4380-822e-72e636c733cd', '27440c85-4c77-429c-9dd2-a79a40a51298', 'image', '/uploads/images/acb7bae4-a01d-43bd-88b8-35d544202cdd_1771581904514.jpg', 1, '2026-02-20 10:05:06.194', '2026-02-20 10:05:06.194'),
	('fffe0940-230e-4f05-a502-d3bbaddeddfd', '27440c85-4c77-429c-9dd2-a79a40a51298', 'image', '/uploads/images/96344c91-16d7-4bff-85eb-88608bc6dcb6_1771581904530.jpg', 2, '2026-02-20 10:05:06.194', '2026-02-20 10:05:06.194');

-- Dumping structure for table zhen.navs
CREATE TABLE IF NOT EXISTS `navs` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `navs_code_key` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table zhen.navs: ~0 rows (approximately)

-- Dumping structure for table zhen.popups
CREATE TABLE IF NOT EXISTS `popups` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `thumbnail` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `sort_order` int NOT NULL DEFAULT '0',
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `popups_status_idx` (`status`),
  KEY `popups_sort_order_idx` (`sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table zhen.popups: ~0 rows (approximately)
INSERT INTO `popups` (`id`, `title`, `content`, `thumbnail`, `status`, `sort_order`, `created_at`, `updated_at`) VALUES
	('33435f5b-c4b9-40c1-9078-76702cf7bd7c', 'Khuyến mãi tháng này', '<p>Giảm giá 20% cho tất cả dịch vụ.</p>', '/uploads/banner.jpg', 'active', 1, '2026-02-20 13:28:54.611', '2026-02-20 13:28:54.611');

-- Dumping structure for table zhen.posts
CREATE TABLE IF NOT EXISTS `posts` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `author_id` char(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `posts_category_id_fkey` (`category_id`),
  CONSTRAINT `posts_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `post_categories` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table zhen.posts: ~0 rows (approximately)
INSERT INTO `posts` (`id`, `category_id`, `author_id`, `status`, `created_at`, `updated_at`) VALUES
	('44d7bede-ea33-4ec3-aabd-62de4d3ec0df', '2f05b4ee-3d49-445e-9505-289c561a0d56', NULL, 'active', '2026-02-20 09:50:26.958', '2026-02-20 09:50:26.958');

-- Dumping structure for table zhen.post_categories
CREATE TABLE IF NOT EXISTS `post_categories` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table zhen.post_categories: ~0 rows (approximately)
INSERT INTO `post_categories` (`id`, `status`, `created_at`, `updated_at`) VALUES
	('2f05b4ee-3d49-445e-9505-289c561a0d56', 'active', '2026-02-20 09:38:59.542', '2026-02-20 09:38:59.542'),
	('e0799e0d-1b1b-4958-be51-ee053a80b253', 'active', '2026-02-20 09:43:21.937', '2026-02-20 09:43:25.333');

-- Dumping structure for table zhen.post_category_translations
CREATE TABLE IF NOT EXISTS `post_category_translations` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `language_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `post_category_translations_category_id_language_id_key` (`category_id`,`language_id`),
  KEY `post_category_translations_language_id_fkey` (`language_id`),
  CONSTRAINT `post_category_translations_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `post_categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `post_category_translations_language_id_fkey` FOREIGN KEY (`language_id`) REFERENCES `languages` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table zhen.post_category_translations: ~0 rows (approximately)
INSERT INTO `post_category_translations` (`id`, `category_id`, `language_id`, `name`, `slug`, `created_at`, `updated_at`) VALUES
	('229a1b93-e8b1-45c1-9bc3-4b892f84f557', '2f05b4ee-3d49-445e-9505-289c561a0d56', 'ee6ca771-0e1b-11f1-bd10-005056c00001', 'Thiết kế Website', 'thiet-ke-website', '2026-02-20 09:38:59.579', '2026-02-20 09:38:59.579'),
	('24d4f1cb-cb9d-4b6c-9274-f9feca27c0f6', '2f05b4ee-3d49-445e-9505-289c561a0d56', 'ee6cbe22-0e1b-11f1-bd10-005056c00001', 'Conception de site web', 'conception-site-web', '2026-02-20 09:38:59.588', '2026-02-20 09:38:59.588'),
	('27272e45-9aae-40ae-bd04-a36b5220d82e', '2f05b4ee-3d49-445e-9505-289c561a0d56', 'ee6cb970-0e1b-11f1-bd10-005056c00001', 'Website Design', 'website-design', '2026-02-20 09:38:59.585', '2026-02-20 09:38:59.585'),
	('3504ebe4-ad3c-4839-8372-19fba1c9ae63', 'e0799e0d-1b1b-4958-be51-ee053a80b253', 'ee6cb970-0e1b-11f1-bd10-005056c00001', 'Website Design', 'website-designn', '2026-02-20 09:43:21.946', '2026-02-20 09:43:21.946'),
	('9ed9fdf9-aa9d-4624-8810-5f54efef19f0', 'e0799e0d-1b1b-4958-be51-ee053a80b253', 'ee6cbe22-0e1b-11f1-bd10-005056c00001', 'Conception de site web', 'conception-site-webb', '2026-02-20 09:43:21.950', '2026-02-20 09:43:21.950'),
	('a412295f-f626-4ea4-b7a3-f2178c8dd9d4', 'e0799e0d-1b1b-4958-be51-ee053a80b253', 'ee6ca771-0e1b-11f1-bd10-005056c00001', 'Thiết kế Website', 'thiet-ke-websitee', '2026-02-20 09:43:21.943', '2026-02-20 09:43:21.943');

-- Dumping structure for table zhen.post_translations
CREATE TABLE IF NOT EXISTS `post_translations` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `post_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `language_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci,
  `thumbnail` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `post_translations_post_id_language_id_key` (`post_id`,`language_id`),
  KEY `post_translations_language_id_fkey` (`language_id`),
  CONSTRAINT `post_translations_language_id_fkey` FOREIGN KEY (`language_id`) REFERENCES `languages` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `post_translations_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table zhen.post_translations: ~0 rows (approximately)
INSERT INTO `post_translations` (`id`, `post_id`, `language_id`, `title`, `slug`, `description`, `content`, `thumbnail`, `created_at`, `updated_at`) VALUES
	('aad08688-7ffd-49f9-8d8b-2ea42849175f', '44d7bede-ea33-4ec3-aabd-62de4d3ec0df', 'ee6cbe22-0e1b-11f1-bd10-005056c00001', 'Créer une API REST avec Node.js et Prisma', 'creer-api-rest-nodejs-prisma', 'Un guide étape par étape pour créer une API REST avec Node.js, Express et Prisma.', '\n                <h2>Introduction</h2>\n                <p>Dans cet article, nous allons créer une API REST complète avec Node.js et Prisma.</p>\n\n                <h3>Étapes</h3>\n                <ul>\n                    <li>Initialiser le projet</li>\n                    <li>Installer Prisma</li>\n                    <li>Créer le schéma</li>\n                    <li>Développer les contrôleurs</li>\n                </ul>\n\n                <p>À la fin, vous aurez un backend prêt pour la production.</p>\n            ', '/uploads/posts/nodejs-prisma-fr.jpg', '2026-02-20 09:50:26.958', '2026-02-20 09:50:26.958'),
	('bc3f5fbd-ac9d-46ed-acd9-76aa55c2b4fd', '44d7bede-ea33-4ec3-aabd-62de4d3ec0df', 'ee6ca771-0e1b-11f1-bd10-005056c00001', 'Hướng dẫn xây dựng REST API với Node.js và Prisma', 'huong-dan-xay-dung-rest-api-nodejs-prisma', 'Bài viết hướng dẫn chi tiết cách xây dựng REST API sử dụng Node.js, Express và Prisma ORM.', '\n                <h2>Giới thiệu</h2>\n                <p>Trong bài viết này, chúng ta sẽ xây dựng một REST API hoàn chỉnh với Node.js và Prisma.</p>\n\n                <h3>Các bước thực hiện</h3>\n                <ul>\n                    <li>Khởi tạo project</li>\n                    <li>Cài đặt Prisma</li>\n                    <li>Tạo schema</li>\n                    <li>Xây dựng controller</li>\n                </ul>\n\n                <p>Sau khi hoàn thành, bạn sẽ có một backend sẵn sàng để kết nối frontend.</p>\n            ', '/uploads/posts/nodejs-prisma-vi.jpg', '2026-02-20 09:50:26.958', '2026-02-20 09:50:26.958'),
	('eb9ee640-f8ef-4aee-b3d4-936b0f34fc73', '44d7bede-ea33-4ec3-aabd-62de4d3ec0df', 'ee6cb970-0e1b-11f1-bd10-005056c00001', 'Build a REST API with Node.js and Prisma', 'build-rest-api-nodejs-prisma', 'A step-by-step guide to building a REST API using Node.js, Express, and Prisma ORM.', '\n                <h2>Introduction</h2>\n                <p>In this article, we will build a complete REST API using Node.js and Prisma.</p>\n\n                <h3>Steps</h3>\n                <ul>\n                    <li>Initialize project</li>\n                    <li>Install Prisma</li>\n                    <li>Create schema</li>\n                    <li>Build controllers</li>\n                </ul>\n\n                <p>After finishing, you\'ll have a production-ready backend.</p>\n            ', '/uploads/posts/nodejs-prisma-en.jpg', '2026-02-20 09:50:26.958', '2026-02-20 09:50:26.958');

-- Dumping structure for table zhen.products
CREATE TABLE IF NOT EXISTS `products` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` decimal(12,2) NOT NULL,
  `sale_price` decimal(12,2) DEFAULT NULL,
  `stock` int NOT NULL DEFAULT '0',
  `thumbnail` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'draft',
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `products_category_id_fkey` (`category_id`),
  CONSTRAINT `products_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `product_categories` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table zhen.products: ~0 rows (approximately)
INSERT INTO `products` (`id`, `category_id`, `price`, `sale_price`, `stock`, `thumbnail`, `status`, `created_at`, `updated_at`) VALUES
	('0411a25b-6da3-47b5-9b4d-553fef844acc', '97d8156c-0cb1-4a2e-b07f-061c0b951d4e', 1200000.00, 990000.00, 50, '/uploads/products/product-main.jpg', 'active', '2026-02-20 09:24:07.768', '2026-02-20 09:24:07.768'),
	('c6de2b28-4410-45ed-b5af-7ed3d2d940d8', '97d8156c-0cb1-4a2e-b07f-061c0b951d4e', 0.00, 0.00, 0, '/uploads/products/product-main.jpg', 'active', '2026-02-20 09:33:17.359', '2026-02-20 09:33:17.359');

-- Dumping structure for table zhen.product_categories
CREATE TABLE IF NOT EXISTS `product_categories` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table zhen.product_categories: ~0 rows (approximately)
INSERT INTO `product_categories` (`id`, `status`, `created_at`, `updated_at`) VALUES
	('97d8156c-0cb1-4a2e-b07f-061c0b951d4e', 'active', '2026-02-20 09:19:10.803', '2026-02-20 09:22:18.117');

-- Dumping structure for table zhen.product_category_translations
CREATE TABLE IF NOT EXISTS `product_category_translations` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `language_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `product_category_translations_category_id_language_id_key` (`category_id`,`language_id`),
  KEY `product_category_translations_language_id_fkey` (`language_id`),
  CONSTRAINT `product_category_translations_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `product_categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `product_category_translations_language_id_fkey` FOREIGN KEY (`language_id`) REFERENCES `languages` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table zhen.product_category_translations: ~0 rows (approximately)
INSERT INTO `product_category_translations` (`id`, `category_id`, `language_id`, `name`, `slug`, `created_at`, `updated_at`) VALUES
	('15dee763-d69e-43c1-a90f-e29e623e8103', '97d8156c-0cb1-4a2e-b07f-061c0b951d4e', 'ee6cb970-0e1b-11f1-bd10-005056c00001', 'Electronics', 'electronicss', '2026-02-20 09:19:10.812', '2026-02-20 09:21:55.576'),
	('4db9b99b-ed6f-445a-9a30-b0b470c32746', '97d8156c-0cb1-4a2e-b07f-061c0b951d4e', 'ee6cbe22-0e1b-11f1-bd10-005056c00001', 'Électronique', 'electroniquee', '2026-02-20 09:19:10.814', '2026-02-20 09:21:55.580'),
	('5e2cfbcf-19c3-473e-857b-088aa3313d91', '97d8156c-0cb1-4a2e-b07f-061c0b951d4e', 'ee6ca771-0e1b-11f1-bd10-005056c00001', 'Thiết bị điện tử', 'thiet-bi-dien-tuu', '2026-02-20 09:19:10.808', '2026-02-20 09:21:55.570');

-- Dumping structure for table zhen.product_galleries
CREATE TABLE IF NOT EXISTS `product_galleries` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sort_order` int NOT NULL DEFAULT '0',
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_galleries_product_id_fkey` (`product_id`),
  CONSTRAINT `product_galleries_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table zhen.product_galleries: ~0 rows (approximately)

-- Dumping structure for table zhen.product_translations
CREATE TABLE IF NOT EXISTS `product_translations` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `language_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `product_translations_product_id_language_id_key` (`product_id`,`language_id`),
  KEY `product_translations_language_id_fkey` (`language_id`),
  CONSTRAINT `product_translations_language_id_fkey` FOREIGN KEY (`language_id`) REFERENCES `languages` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `product_translations_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table zhen.product_translations: ~0 rows (approximately)
INSERT INTO `product_translations` (`id`, `product_id`, `language_id`, `title`, `slug`, `description`, `content`, `created_at`, `updated_at`) VALUES
	('17c4e5dd-347a-4340-9fa7-6fb53c5b65b2', '0411a25b-6da3-47b5-9b4d-553fef844acc', 'ee6ca771-0e1b-11f1-bd10-005056c00001', 'Serum dưỡng da cao cấp', 'serum-duong-da-cao-cap', 'Serum dưỡng da giúp da sáng và mịn.', '\n                    <h2>Giới thiệu</h2>\n                    <p>Serum cao cấp giúp cải thiện làn da rõ rệt.</p>\n                ', '2026-02-20 09:24:07.773', '2026-02-20 09:24:07.773'),
	('504b55a9-7144-416b-9e91-0b3618028b48', 'c6de2b28-4410-45ed-b5af-7ed3d2d940d8', 'ee6cbe22-0e1b-11f1-bd10-005056c00001', 'Sérum de soin premium', 'serum-soin-premiumm', 'Sérum de haute qualité pour une peau éclatante.', '<h2>Introduction</h2><p>Un sérum premium pour améliorer la peau.</p>', '2026-02-20 09:33:17.372', '2026-02-20 09:33:17.372'),
	('95161c91-c8fe-4fa7-8348-a9ee7fed938a', '0411a25b-6da3-47b5-9b4d-553fef844acc', 'ee6cb970-0e1b-11f1-bd10-005056c00001', 'Premium Skin Serum', 'premium-skin-serum', 'High quality serum for glowing skin.', '\n                    <h2>Introduction</h2>\n                    <p>Premium serum improves your skin texture.</p>\n                ', '2026-02-20 09:24:07.773', '2026-02-20 09:24:07.773'),
	('dc4e4050-ed41-43b9-8957-563eedc393c7', 'c6de2b28-4410-45ed-b5af-7ed3d2d940d8', 'ee6ca771-0e1b-11f1-bd10-005056c00001', 'Serum dưỡng da cao cấp', 'serum-duong-da-cao-capp', 'Serum dưỡng da giúp da sáng và mịn.', '\n                    <h2>Giới thiệu</h2>\n                    <p>Serum cao cấp giúp cải thiện làn da rõ rệt.</p>\n                ', '2026-02-20 09:33:17.372', '2026-02-20 09:33:17.372'),
	('deac8526-342a-4712-b8eb-1e3bb31829a6', '0411a25b-6da3-47b5-9b4d-553fef844acc', 'ee6cbe22-0e1b-11f1-bd10-005056c00001', 'Sérum de soin premium', 'serum-soin-premium', 'Sérum de haute qualité pour une peau éclatante.', '\n                    <h2>Introduction</h2>\n                    <p>Un sérum premium pour améliorer la peau.</p>\n                ', '2026-02-20 09:24:07.773', '2026-02-20 09:24:07.773'),
	('fce20723-302a-471f-a21b-4adb5dd5a08d', 'c6de2b28-4410-45ed-b5af-7ed3d2d940d8', 'ee6cb970-0e1b-11f1-bd10-005056c00001', 'Premium Skin Serum', 'premium-skin-serumm', 'High quality serum for glowing skin.', '<h2>Introduction</h2><p>Premium serum improves your skin texture.</p>', '2026-02-20 09:33:17.372', '2026-02-20 09:33:17.372');

-- Dumping structure for table zhen.services
CREATE TABLE IF NOT EXISTS `services` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sku` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` decimal(12,2) DEFAULT NULL,
  `thumbnail` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('active','inactive') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  `deleted_at` datetime(3) DEFAULT NULL,
  `category_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `services_sku_key` (`sku`),
  KEY `services_deleted_at_idx` (`deleted_at`),
  KEY `services_category_id_idx` (`category_id`),
  CONSTRAINT `services_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `service_categories` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table zhen.services: ~0 rows (approximately)
INSERT INTO `services` (`id`, `sku`, `price`, `thumbnail`, `status`, `created_at`, `updated_at`, `deleted_at`, `category_id`) VALUES
	('1659bd29-e655-4cfa-abd5-df6cf5db9939', 'SEO-001', 1500000.00, '', 'active', '2026-02-20 09:03:26.871', '2026-02-20 09:03:26.871', NULL, '92800a70-fbd6-4be8-a33c-ce51b20b8b1c'),
	('35fc920f-e872-4bef-9625-cdec27c087ed', 'SEO-0011', 1500000.00, '/uploads/images/3704bb6b-dba8-4e2a-970c-e54269cb69fd_1771578654559.jpg', 'active', '2026-02-20 09:10:26.055', '2026-02-20 09:10:58.352', NULL, '92800a70-fbd6-4be8-a33c-ce51b20b8b1c');

-- Dumping structure for table zhen.service_categories
CREATE TABLE IF NOT EXISTS `service_categories` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table zhen.service_categories: ~0 rows (approximately)
INSERT INTO `service_categories` (`id`, `status`, `created_at`, `updated_at`) VALUES
	('92800a70-fbd6-4be8-a33c-ce51b20b8b1c', 'active', '2026-02-20 08:52:23.044', '2026-02-20 08:52:23.044');

-- Dumping structure for table zhen.service_category_translations
CREATE TABLE IF NOT EXISTS `service_category_translations` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `language_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `service_category_translations_category_id_language_id_key` (`category_id`,`language_id`),
  KEY `service_category_translations_language_id_fkey` (`language_id`),
  CONSTRAINT `service_category_translations_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `service_categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `service_category_translations_language_id_fkey` FOREIGN KEY (`language_id`) REFERENCES `languages` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table zhen.service_category_translations: ~0 rows (approximately)
INSERT INTO `service_category_translations` (`id`, `category_id`, `language_id`, `name`, `slug`, `created_at`, `updated_at`) VALUES
	('89264653-9c08-4e6d-8797-51d2f10b4b4f', '92800a70-fbd6-4be8-a33c-ce51b20b8b1c', 'ee6ca771-0e1b-11f1-bd10-005056c00001', 'Dịch vụ thiết kế website', 'dich-vu-thiet-ke-website', '2026-02-20 08:52:23.049', '2026-02-20 08:52:23.049'),
	('96bb9a10-faf2-4cf4-8d09-a6f189f1c980', '92800a70-fbd6-4be8-a33c-ce51b20b8b1c', 'ee6cbe22-0e1b-11f1-bd10-005056c00001', 'Service de conception de site web', 'service-conception-site-web', '2026-02-20 08:52:23.060', '2026-02-20 08:52:23.060'),
	('eb811449-dcea-4b0e-8980-9799cd126c3f', '92800a70-fbd6-4be8-a33c-ce51b20b8b1c', 'ee6cb970-0e1b-11f1-bd10-005056c00001', 'Website Design Service', 'website-design-service', '2026-02-20 08:52:23.054', '2026-02-20 08:52:23.054');

-- Dumping structure for table zhen.service_galleries
CREATE TABLE IF NOT EXISTS `service_galleries` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `service_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sort_order` int NOT NULL DEFAULT '0',
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `service_galleries_service_id_fkey` (`service_id`),
  CONSTRAINT `service_galleries_service_id_fkey` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table zhen.service_galleries: ~0 rows (approximately)

-- Dumping structure for table zhen.service_translations
CREATE TABLE IF NOT EXISTS `service_translations` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `service_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `language_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `service_translations_service_id_language_id_key` (`service_id`,`language_id`),
  KEY `service_translations_language_id_fkey` (`language_id`),
  CONSTRAINT `service_translations_language_id_fkey` FOREIGN KEY (`language_id`) REFERENCES `languages` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `service_translations_service_id_fkey` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table zhen.service_translations: ~0 rows (approximately)
INSERT INTO `service_translations` (`id`, `service_id`, `language_id`, `title`, `slug`, `description`, `content`, `created_at`, `updated_at`) VALUES
	('3c53c2c0-20dd-44d1-8755-9d67c28f04e9', '35fc920f-e872-4bef-9625-cdec27c087ed', 'ee6cb970-0e1b-11f1-bd10-005056c00001', 'Comprehensive SEO Service', 'comprehensive-seo-service', 'Full SEO solution', 'English SEO content...', '2026-02-20 09:10:26.073', '2026-02-20 09:10:58.372'),
	('3f840c26-40dc-40c5-bdf3-42525e41d420', '1659bd29-e655-4cfa-abd5-df6cf5db9939', 'ee6ca771-0e1b-11f1-bd10-005056c00001', 'Dịch vụ SEO tổng thể', 'dich-vu-seo-tong-thee', 'Giải pháp SEO toàn diện', 'Nội dung SEO tiếng Việt...', '2026-02-20 09:03:26.885', '2026-02-20 09:03:26.885'),
	('656f4308-9fd5-43c6-a419-aa2627a2072d', '35fc920f-e872-4bef-9625-cdec27c087ed', 'ee6cbe22-0e1b-11f1-bd10-005056c00001', 'Service SEO complet', 'service-seo-complet', 'Solution SEO complète', 'Contenu SEO en français...', '2026-02-20 09:10:26.073', '2026-02-20 09:10:58.376'),
	('8ca00447-3d2c-485f-9acd-cc90b55496e5', '1659bd29-e655-4cfa-abd5-df6cf5db9939', 'ee6cb970-0e1b-11f1-bd10-005056c00001', 'Comprehensive SEO Service', 'comprehensive-seo-servicee', 'Full SEO solution', '<p>English SEO content...</p>', '2026-02-20 09:03:26.885', '2026-02-20 09:03:26.885'),
	('90da8018-064b-4b62-beca-9398ec3eeb36', '1659bd29-e655-4cfa-abd5-df6cf5db9939', 'ee6cbe22-0e1b-11f1-bd10-005056c00001', 'Service SEO complet', 'service-seo-complete', 'Solution SEO complète', '<p>Contenu SEO en français...</p>', '2026-02-20 09:03:26.885', '2026-02-20 09:03:26.885'),
	('bccefd35-4f56-4c11-8fd5-420fee24fbae', '35fc920f-e872-4bef-9625-cdec27c087ed', 'ee6ca771-0e1b-11f1-bd10-005056c00001', 'Dịch vụ SEO tổng thể', 'dich-vu-seo-tong-the', 'Giải pháp SEO toàn diện', '<p>Nội dung SEO tiếng Việt...</p>', '2026-02-20 09:10:26.073', '2026-02-20 09:10:58.366');

-- Dumping structure for table zhen.site_settings
CREATE TABLE IF NOT EXISTS `site_settings` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_number` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `open_time` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `logo` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `google_map_embed` longtext COLLATE utf8mb4_unicode_ci,
  `facebook_url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `instagram_url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tiktok_url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `youtube_url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_title_default` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_description_default` longtext COLLATE utf8mb4_unicode_ci,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table zhen.site_settings: ~1 rows (approximately)
INSERT INTO `site_settings` (`id`, `phone_number`, `email`, `address`, `open_time`, `logo`, `google_map_embed`, `facebook_url`, `instagram_url`, `tiktok_url`, `youtube_url`, `meta_title_default`, `meta_description_default`, `created_at`, `updated_at`) VALUES
	('bf954e1e-76e3-4c50-8ba4-9800ed7cce54', '09091234566', 'contact@example.comm', '123 Nguyễn Huệ, Quận 1, TP.HCMz', 'Thứ 2 - Thứ 7: 08:00 - 18:00', '/uploads/logo.png', '<iframe src=\'https://www.google.com/maps/embed?...\'></iframe>', 'https://facebook.com/yourpage', 'https://instagram.com/yourpage', 'https://tiktok.com/@yourpage', 'https://youtube.com/@yourpage', 'Zhen Beauty - Thẩm mỹ viện hàng đầu', 'Zhen Beauty cung cấp dịch vụ làm đẹp chất lượng cao tại TP.HCM.', '2026-02-20 13:39:11.147', '2026-02-21 01:57:56.583');

-- Dumping structure for table zhen._prisma_migrations
CREATE TABLE IF NOT EXISTS `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table zhen._prisma_migrations: ~1 rows (approximately)
INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
	('08aaeb1c-cb80-4a50-9a80-24d7bbd2b528', '3beec51c6815686b8322071661502f2f89a20f8210f6282b3b422ed7f11ea8cc', '2026-02-20 10:04:28.244', '20260220100427_restrict_media', NULL, NULL, '2026-02-20 10:04:28.045', 1),
	('09ec6bf5-40f3-4d95-8bab-a58da1d23bb6', '2f738c0561b3838fed7a85a09565b97df6de3a19f0f84b3072343baf86840470', '2026-02-20 13:40:53.037', '20260220134052_add_heros_table', NULL, NULL, '2026-02-20 13:40:53.008', 1),
	('28a9a304-a6ed-4105-8c05-ace489c575e0', '745e016e00da4204524c2738cb670e7ae866cf48e92664ade09c25d7e543c526', '2026-02-20 13:34:01.598', '20260220133401_add_site_table', NULL, NULL, '2026-02-20 13:34:01.579', 1),
	('63aed1d5-2f5d-4020-8aae-f7719d356f8f', '13156472b493127beb718422a17c5ba5f44e3c4ab0ca32e8abaf13f8391023ec', '2026-02-20 13:56:28.921', '20260220135628_add_navs_table', NULL, NULL, '2026-02-20 13:56:28.896', 1),
	('66f6ba99-4ac1-4b6b-a650-1d445a8f970d', '6df063b29b924190b6253029c8e8f57f1f28b4943066158dc7ea344b3ce14080', '2026-02-20 13:26:22.004', '20260220132621_add_modal_tablwe', NULL, NULL, '2026-02-20 13:26:21.971', 1),
	('b1a7971f-e5c7-4a3a-878e-7ab9ac0ad775', '476c3b766b5265933ef99bd842b0d0a3ec6f0d034a4f3f9775c7ec09bf2b6c0e', '2026-02-20 10:08:36.094', '20260220100835_restrict_media_category', NULL, NULL, '2026-02-20 10:08:35.789', 1),
	('ddefcdfe-21b6-4f13-a482-0b241f76d5d8', '4a17998d9a9610e05a2507d2b7a1f47f3da8c90af3fc897dd5b044342ba5d253', '2026-02-20 13:17:05.455', '20260220131705_add_contact_table', NULL, NULL, '2026-02-20 13:17:05.434', 1),
	('f9b52da6-549d-415a-a77d-0363ddea1e16', 'ac7d5f2c3bf33b326aca588b7d13ac06994ae77f5ac3cf5027738dc15efde245', '2026-02-20 05:18:47.859', '20260220051846_init', NULL, NULL, '2026-02-20 05:18:46.575', 1);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
