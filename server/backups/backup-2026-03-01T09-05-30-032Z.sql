-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: zhen
-- ------------------------------------------------------
-- Server version	8.0.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('08aaeb1c-cb80-4a50-9a80-24d7bbd2b528','3beec51c6815686b8322071661502f2f89a20f8210f6282b3b422ed7f11ea8cc','2026-02-20 10:04:28.244','20260220100427_restrict_media',NULL,NULL,'2026-02-20 10:04:28.045',1),('09ec6bf5-40f3-4d95-8bab-a58da1d23bb6','2f738c0561b3838fed7a85a09565b97df6de3a19f0f84b3072343baf86840470','2026-02-20 13:40:53.037','20260220134052_add_heros_table',NULL,NULL,'2026-02-20 13:40:53.008',1),('1e4b85de-6654-4be5-b07e-bbab86528d14','83809e385693fa818888a581bc9142990a9b9c6f5c099d21ef1d62a1b7e09af8','2026-02-21 11:20:59.310','20260221112059_update_popup_translation',NULL,NULL,'2026-02-21 11:20:59.168',1),('28a9a304-a6ed-4105-8c05-ace489c575e0','745e016e00da4204524c2738cb670e7ae866cf48e92664ade09c25d7e543c526','2026-02-20 13:34:01.598','20260220133401_add_site_table',NULL,NULL,'2026-02-20 13:34:01.579',1),('4c525f0d-dbd4-4ef2-9784-d21a187c7518','3b51972b8f9407a093ba8b3db1619e74e25404a2cadcdce32826b2b9241489dc','2026-02-27 04:10:40.049','20260227041039_add_thumbnail_media',NULL,NULL,'2026-02-27 04:10:40.011',1),('63aed1d5-2f5d-4020-8aae-f7719d356f8f','13156472b493127beb718422a17c5ba5f44e3c4ab0ca32e8abaf13f8391023ec','2026-02-20 13:56:28.921','20260220135628_add_navs_table',NULL,NULL,'2026-02-20 13:56:28.896',1),('660aa616-9028-4a78-9d01-7287f96435e6','dee79ecff699af2ca25d5a9f4d1a4a75c3f5ca4ad2ecea37de324613e64ebf99','2026-02-22 02:34:04.732','20260222023404_update_longtext',NULL,NULL,'2026-02-22 02:34:04.528',1),('66f6ba99-4ac1-4b6b-a650-1d445a8f970d','6df063b29b924190b6253029c8e8f57f1f28b4943066158dc7ea344b3ce14080','2026-02-20 13:26:22.004','20260220132621_add_modal_tablwe',NULL,NULL,'2026-02-20 13:26:21.971',1),('7db491b9-b17b-4447-bba5-331964e7d91c','bd952ed140924cdac6f035d2a199c95689099af0689486125e61d2c0950ede4d','2026-02-28 03:33:21.479','20260228033321_move_thumbnail_posts',NULL,NULL,'2026-02-28 03:33:21.439',1),('b1a7971f-e5c7-4a3a-878e-7ab9ac0ad775','476c3b766b5265933ef99bd842b0d0a3ec6f0d034a4f3f9775c7ec09bf2b6c0e','2026-02-20 10:08:36.094','20260220100835_restrict_media_category',NULL,NULL,'2026-02-20 10:08:35.789',1),('ddefcdfe-21b6-4f13-a482-0b241f76d5d8','4a17998d9a9610e05a2507d2b7a1f47f3da8c90af3fc897dd5b044342ba5d253','2026-02-20 13:17:05.455','20260220131705_add_contact_table',NULL,NULL,'2026-02-20 13:17:05.434',1),('e25c3314-aa26-4eb5-8067-3c12cde6aded','68338636b312b31a52096cc11ba8e412f19f63d8bbbb839e0f503b42e6a26616','2026-02-26 13:24:13.240','20260226132413_change_cascade_media_category',NULL,NULL,'2026-02-26 13:24:13.128',1),('f9b52da6-549d-415a-a77d-0363ddea1e16','ac7d5f2c3bf33b326aca588b7d13ac06994ae77f5ac3cf5027738dc15efde245','2026-02-20 05:18:47.859','20260220051846_init',NULL,NULL,'2026-02-20 05:18:46.575',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin_tokens`
--

DROP TABLE IF EXISTS `admin_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_tokens` (
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_tokens`
--

LOCK TABLES `admin_tokens` WRITE;
/*!40000 ALTER TABLE `admin_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `admin_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES ('933ba9ad-4bd8-4c73-87eb-8094fd4164c8','admin','lethanhdat1567@gmail.com','$2b$10$Q.d7pjNtEe5BHu4HKJLbiuZ6mJj8x6ROcY.vN5PxmsS/NeYnyOiTS','Admin One','/uploads/images/310cb84e-25db-4473-aa33-080394adf8ea_1771722668443.jpg','admin','active','2026-02-28 01:50:07.755','2026-02-21 02:31:19.529','2026-02-28 01:50:07.762');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contacts`
--

DROP TABLE IF EXISTS `contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contacts` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fullname` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_number` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contacts`
--

LOCK TABLES `contacts` WRITE;
/*!40000 ALTER TABLE `contacts` DISABLE KEYS */;
INSERT INTO `contacts` VALUES ('0166fedc-abef-4c68-b5b3-f4d2b2393110','Nguyen Van A','0909123456','lethanhdat1567@gmail.com','Tôi muốn được tư vấn thêm về dịch vụ của công ty.','2026-02-21 08:41:48.952','2026-02-21 08:41:48.952'),('1ee3d02f-d415-482d-8433-989d18c68ae8','Nguyen Van A','0909123456','lethanhdat1567@gmail.com','Tôi muốn được tư vấn thêm về dịch vụ của công ty.','2026-02-20 13:23:19.405','2026-02-20 13:23:19.405'),('8b135d0f-7a87-42a7-a954-18a9758e9ee3','Lê Thành Đạt','0909364029','lethanhdat1567@gmail.com','ádsad','2026-02-27 07:37:55.553','2026-02-27 07:37:55.553');
/*!40000 ALTER TABLE `contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hero_banners`
--

DROP TABLE IF EXISTS `hero_banners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hero_banners` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `thumbnail` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sort_order` int NOT NULL DEFAULT '0',
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `hero_banners_sort_order_idx` (`sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hero_banners`
--

LOCK TABLES `hero_banners` WRITE;
/*!40000 ALTER TABLE `hero_banners` DISABLE KEYS */;
INSERT INTO `hero_banners` VALUES ('31a3e850-910d-4b2a-aa57-777b47b879ef','/uploads/images/901dfb22-204c-4bb1-9d9c-0c0809cd3c1e_1772182599392.jpg',3,'2026-02-27 09:11:21.673','2026-02-27 09:11:21.673'),('49d158cd-5995-4c32-abe9-d382c64f570c','/uploads/images/e48dce4b-4712-410d-9cbf-c8ef5cb61958_1772182599391.jpg',2,'2026-02-27 09:11:21.672','2026-02-27 09:11:21.672'),('658ddb21-50e8-4a09-92d8-7b5d91e3c616','/uploads/images/b93f611f-d00b-4b8b-b41f-2bc7d89003c5_1772182599385.jpg',1,'2026-02-27 09:11:21.668','2026-02-27 09:11:21.668'),('a6af4b78-519f-4cb2-9159-04c9b1df1583','/uploads/images/dd0417b1-b645-4b67-ae4a-e9bcebf3b046_1772182599393.jpg',5,'2026-02-27 09:11:21.675','2026-02-27 09:11:21.675'),('b588bd80-984c-4d69-a6aa-700ce059aa06','/uploads/images/7221d6dc-f8ba-4e20-8764-0623acb3e706_1772182599388.jpg',4,'2026-02-27 09:11:21.675','2026-02-27 09:11:21.675');
/*!40000 ALTER TABLE `hero_banners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `languages`
--

DROP TABLE IF EXISTS `languages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `languages` (
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `languages`
--

LOCK TABLES `languages` WRITE;
/*!40000 ALTER TABLE `languages` DISABLE KEYS */;
INSERT INTO `languages` VALUES ('ee6ca771-0e1b-11f1-bd10-005056c00001','vi','Vietnamese',1,'active','2026-02-20 12:20:55.219','2026-02-20 12:20:55.219'),('ee6cb970-0e1b-11f1-bd10-005056c00001','en','English',0,'active','2026-02-20 12:20:55.219','2026-02-20 12:20:55.219'),('ee6cbe22-0e1b-11f1-bd10-005056c00001','fr','French',0,'active','2026-02-20 12:20:55.219','2026-02-20 12:20:55.219');
/*!40000 ALTER TABLE `languages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `media_album_translations`
--

DROP TABLE IF EXISTS `media_album_translations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `media_album_translations` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `album_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `language_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `media_album_translations_album_id_language_id_key` (`album_id`,`language_id`),
  KEY `media_album_translations_language_id_fkey` (`language_id`),
  CONSTRAINT `media_album_translations_album_id_fkey` FOREIGN KEY (`album_id`) REFERENCES `media_albums` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `media_album_translations_language_id_fkey` FOREIGN KEY (`language_id`) REFERENCES `languages` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `media_album_translations`
--

LOCK TABLES `media_album_translations` WRITE;
/*!40000 ALTER TABLE `media_album_translations` DISABLE KEYS */;
INSERT INTO `media_album_translations` VALUES ('13ee2555-5e61-421d-aa94-73df315737a9','d373f202-5d3b-4894-858a-4005b72c1d3a','ee6cb970-0e1b-11f1-bd10-005056c00001','Website Design Serviceeee','website-design-serviceeeee','We provide professional website design services with SEO optimization and high performance.','2026-02-27 04:23:11.069','2026-02-27 04:23:11.069'),('211f923f-6a06-415e-95e1-545d25ecd9a4','858a31d1-c488-4e21-9cae-5a928d7e3c50','ee6cbe22-0e1b-11f1-bd10-005056c00001','Service de conception de site web','service-conception-site-webeee','Nous fournissons des services professionnels de conception de sites web optimisés pour le SEO.','2026-02-27 02:38:47.520','2026-02-27 02:38:47.520'),('4305a0dc-211d-444d-a8b2-510a4dd88876','1c9e264c-dfe1-4953-aa83-ae545e6a6cd1','ee6cbe22-0e1b-11f1-bd10-005056c00001','Service de conception de site web','service-conception-site-webe','Nous fournissons des services professionnels de conception de sites web optimisés pour le SEO.','2026-02-27 01:46:53.484','2026-02-27 01:46:53.484'),('4c2ddf6d-d23d-4e6f-b521-a03ec1e7f864','d7e2569f-feec-4e49-81a2-75fe490a974d','ee6cbe22-0e1b-11f1-bd10-005056c00001','Service de conception de site web','service-conception-site-webee','Nous fournissons des services professionnels de conception de sites web optimisés pour le SEO.','2026-03-01 01:37:42.241','2026-03-01 01:37:42.241'),('837a7f89-cd5a-4f3f-bc26-0f73720f116a','d7e2569f-feec-4e49-81a2-75fe490a974d','ee6cb970-0e1b-11f1-bd10-005056c00001','Website Design Service','website-design-serviceee','We provide professional website design services with SEO optimization and high performance.','2026-03-01 01:37:42.241','2026-03-01 01:37:42.241'),('8542e87f-6072-4ca0-bfe6-cc97938a65f2','a59d9e01-b694-44a7-a9b2-17bb3e389638','ee6ca771-0e1b-11f1-bd10-005056c00001','Dịch vụ thiết kế website','dich-vu-thiet-ke-website','Chúng tôi cung cấp dịch vụ thiết kế website chuyên nghiệp, tối ưu SEO và hiệu suất.','2026-02-26 14:12:03.757','2026-02-26 14:12:03.757'),('95a67a93-c0ba-46a0-8431-adee2a79e6fc','d373f202-5d3b-4894-858a-4005b72c1d3a','ee6cbe22-0e1b-11f1-bd10-005056c00001','Service de conception de site web','service-conception-site-webeeee','Nous fournissons des services professionnels de conception de sites web optimisés pour le SEO.','2026-02-27 04:23:11.069','2026-02-27 04:23:11.069'),('a3f5b35a-4a1c-4f08-820b-17889339650b','1c9e264c-dfe1-4953-aa83-ae545e6a6cd1','ee6ca771-0e1b-11f1-bd10-005056c00001','Dịch vụ thiết kế website','dich-vu-thiet-ke-websitee','Chúng tôi cung cấp dịch vụ thiết kế website chuyên nghiệp, tối ưu SEO và hiệu suất.','2026-02-27 01:46:53.484','2026-02-27 01:46:53.484'),('a4b14c14-7eed-4fc9-bc67-1fc49fdb2c4d','a59d9e01-b694-44a7-a9b2-17bb3e389638','ee6cbe22-0e1b-11f1-bd10-005056c00001','Service de conception de site web','service-conception-site-web','Nous fournissons des services professionnels de conception de sites web optimisés pour le SEO.','2026-02-26 14:12:03.757','2026-02-26 14:12:03.757'),('a900a652-8d82-4436-8aa6-4256e78ae6ed','858a31d1-c488-4e21-9cae-5a928d7e3c50','ee6ca771-0e1b-11f1-bd10-005056c00001','Dịch vụ thiết kế website','dich-vu-thiet-ke-websiteeee','Chúng tôi cung cấp dịch vụ thiết kế website chuyên nghiệp, tối ưu SEO và hiệu suất.','2026-02-27 02:38:47.520','2026-02-27 02:38:47.520'),('a90e081a-a038-4ac5-a372-aded826b7144','a59d9e01-b694-44a7-a9b2-17bb3e389638','ee6cb970-0e1b-11f1-bd10-005056c00001','Website Design Service','website-design-service','We provide professional website design services with SEO optimization and high performance.','2026-02-26 14:12:03.757','2026-02-26 14:12:03.757'),('bd5bc26f-61e1-4096-abe9-c055d3825e87','858a31d1-c488-4e21-9cae-5a928d7e3c50','ee6cb970-0e1b-11f1-bd10-005056c00001','Website Design Service','website-design-serviceeee','We provide professional website design services with SEO optimization and high performance.','2026-02-27 02:38:47.520','2026-02-27 02:38:47.520'),('d06eef90-ff90-4155-80d5-c1add2371232','1c9e264c-dfe1-4953-aa83-ae545e6a6cd1','ee6cb970-0e1b-11f1-bd10-005056c00001','Website Design Service','website-design-servicee','We provide professional website design services with SEO optimization and high performance.','2026-02-27 01:46:53.484','2026-02-27 01:46:53.484'),('d1c416cd-06e9-4941-be81-8b54f7d6cc57','d7e2569f-feec-4e49-81a2-75fe490a974d','ee6ca771-0e1b-11f1-bd10-005056c00001','Dịch vụ thiết kế website','dich-vu-thiet-ke-websiteee','Chúng tôi cung cấp dịch vụ thiết kế website chuyên nghiệp, tối ưu SEO và hiệu suất.','2026-03-01 01:37:42.241','2026-03-01 01:37:42.241'),('d98483c8-b0b4-44cc-a089-cf1b5dcc5d63','d373f202-5d3b-4894-858a-4005b72c1d3a','ee6ca771-0e1b-11f1-bd10-005056c00001','Dịch vụ thiết kế website','dich-vu-thiet-ke-websiteeeeee','Chúng tôi cung cấp dịch vụ thiết kế website chuyên nghiệp, tối ưu SEO và hiệu suất.','2026-02-27 04:23:11.069','2026-02-27 04:23:11.069');
/*!40000 ALTER TABLE `media_album_translations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `media_albums`
--

DROP TABLE IF EXISTS `media_albums`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `media_albums` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'draft',
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  `thumbnail` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`),
  KEY `media_albums_category_id_fkey` (`category_id`),
  CONSTRAINT `media_albums_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `media_categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `media_albums`
--

LOCK TABLES `media_albums` WRITE;
/*!40000 ALTER TABLE `media_albums` DISABLE KEYS */;
INSERT INTO `media_albums` VALUES ('1c9e264c-dfe1-4953-aa83-ae545e6a6cd1','adbd9f7f-0dfa-4143-8393-e61c0fffd6d1','active','2026-02-27 01:46:53.484','2026-02-27 01:46:53.484',NULL),('858a31d1-c488-4e21-9cae-5a928d7e3c50','adbd9f7f-0dfa-4143-8393-e61c0fffd6d1','active','2026-02-27 01:47:28.829','2026-02-27 02:38:47.520',NULL),('a59d9e01-b694-44a7-a9b2-17bb3e389638','adbd9f7f-0dfa-4143-8393-e61c0fffd6d1','active','2026-02-26 14:12:03.757','2026-02-26 14:12:03.757',NULL),('d373f202-5d3b-4894-858a-4005b72c1d3a','adbd9f7f-0dfa-4143-8393-e61c0fffd6d1','active','2026-02-27 04:16:37.426','2026-02-27 04:23:11.069','/uploads/images/bb4400f4-6cbf-4544-b0be-e754724d9cf1_1772165767874.png'),('d7e2569f-feec-4e49-81a2-75fe490a974d','adbd9f7f-0dfa-4143-8393-e61c0fffd6d1','active','2026-02-27 01:47:13.475','2026-03-01 01:37:42.241','/uploads/images/7a031599-f20d-45f1-b6df-9af870b083f8_1772329061015.png');
/*!40000 ALTER TABLE `media_albums` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `media_categories`
--

DROP TABLE IF EXISTS `media_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `media_categories` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `media_categories`
--

LOCK TABLES `media_categories` WRITE;
/*!40000 ALTER TABLE `media_categories` DISABLE KEYS */;
INSERT INTO `media_categories` VALUES ('adbd9f7f-0dfa-4143-8393-e61c0fffd6d1','active','2026-02-26 14:11:46.982','2026-02-26 14:11:46.982');
/*!40000 ALTER TABLE `media_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `media_category_translations`
--

DROP TABLE IF EXISTS `media_category_translations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `media_category_translations` (
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
  CONSTRAINT `media_category_translations_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `media_categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `media_category_translations_language_id_fkey` FOREIGN KEY (`language_id`) REFERENCES `languages` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `media_category_translations`
--

LOCK TABLES `media_category_translations` WRITE;
/*!40000 ALTER TABLE `media_category_translations` DISABLE KEYS */;
INSERT INTO `media_category_translations` VALUES ('5d0711ba-020b-48b5-b4ba-ae73b0361e3d','adbd9f7f-0dfa-4143-8393-e61c0fffd6d1','ee6ca771-0e1b-11f1-bd10-005056c00001','Danh mục dịch vụ','danh-muc-dich-vu','2026-02-26 14:11:46.982','2026-02-26 14:11:46.982'),('8bf40d68-a7f6-4ae5-8282-f129f18d9d20','adbd9f7f-0dfa-4143-8393-e61c0fffd6d1','ee6cb970-0e1b-11f1-bd10-005056c00001','Service Category','service-category','2026-02-26 14:11:46.982','2026-02-26 14:11:46.982'),('bf380be3-0b6b-4b85-a413-7a609f8c9137','adbd9f7f-0dfa-4143-8393-e61c0fffd6d1','ee6cbe22-0e1b-11f1-bd10-005056c00001','Catégorie de service','categorie-de-service','2026-02-26 14:11:46.982','2026-02-26 14:11:46.982');
/*!40000 ALTER TABLE `media_category_translations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `media_items`
--

DROP TABLE IF EXISTS `media_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `media_items` (
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `media_items`
--

LOCK TABLES `media_items` WRITE;
/*!40000 ALTER TABLE `media_items` DISABLE KEYS */;
INSERT INTO `media_items` VALUES ('2ac64016-b381-4231-a1c0-b9a238f67f48','d7e2569f-feec-4e49-81a2-75fe490a974d','image','/uploads/images/dbbfedf2-e76a-4a18-b365-180b1dfb26a4_1772156822543.png',3,'2026-03-01 01:37:42.241','2026-03-01 01:37:42.241'),('33f3f16a-5f6e-46e3-bf0d-81d0e26c05e9','858a31d1-c488-4e21-9cae-5a928d7e3c50','image','/uploads/images/a23c4fe3-5c06-4634-bfe5-552e360d482a_1772156847977.png',4,'2026-02-27 02:38:47.520','2026-02-27 02:38:47.520'),('34b95254-a86e-4432-9ac1-a57931ab5945','d373f202-5d3b-4894-858a-4005b72c1d3a','image','/uploads/images/8f623725-342c-4682-9f00-7eb0ad4bb012_1772166189975.png',6,'2026-02-27 04:23:11.069','2026-02-27 04:23:11.069'),('35b731c1-2282-4c9f-b4e5-3da3318204d6','a59d9e01-b694-44a7-a9b2-17bb3e389638','image','/uploads/images/711893c3-71bf-4763-806f-f80231c8b993_1772115122508.jpg',3,'2026-02-26 14:12:03.757','2026-02-26 14:12:03.757'),('3f089f4b-f5d6-4d07-89a5-2ce673cb9d4d','1c9e264c-dfe1-4953-aa83-ae545e6a6cd1','image','/uploads/images/5b512071-0e4f-4a98-909c-b67be844179e_1772156803558.png',1,'2026-02-27 01:46:53.484','2026-02-27 01:46:53.484'),('3fcac902-6cf5-4865-b9cb-915b6cbe8e9b','858a31d1-c488-4e21-9cae-5a928d7e3c50','image','/uploads/images/3fbfd7d8-13cb-467a-9a04-f2ed4b5b4425_1772156847970.png',2,'2026-02-27 02:38:47.520','2026-02-27 02:38:47.520'),('54d3b00b-9173-4c03-b2d9-183b42f38ecf','d7e2569f-feec-4e49-81a2-75fe490a974d','image','/uploads/images/473e7537-aca2-40f4-a917-e4f959596221_1772156822541.png',2,'2026-03-01 01:37:42.241','2026-03-01 01:37:42.241'),('76c88aba-e7bc-4916-9218-d010bfc8aee3','d373f202-5d3b-4894-858a-4005b72c1d3a','image','/uploads/images/e39cef94-2527-48f3-9d1a-da1a7e13e865_1772165782650.png',2,'2026-02-27 04:23:11.069','2026-02-27 04:23:11.069'),('78070fdf-45e5-4247-ae46-98f59707ff67','d373f202-5d3b-4894-858a-4005b72c1d3a','image','/uploads/images/bb3aadd3-01f3-4669-8abf-bec6c4bc9cb7_1772166189978.png',8,'2026-02-27 04:23:11.069','2026-02-27 04:23:11.069'),('797be75b-8069-4e7d-bbf2-698126878572','1c9e264c-dfe1-4953-aa83-ae545e6a6cd1','image','/uploads/images/1f2a8771-15a5-4b6b-a62b-b32323dbe79f_1772156803558.png',2,'2026-02-27 01:46:53.484','2026-02-27 01:46:53.484'),('86bf8f0e-28cd-4b2e-af35-0176268fe677','d373f202-5d3b-4894-858a-4005b72c1d3a','image','/uploads/images/efba3635-05ba-48dd-979e-04656a8ea3d7_1772165782649.png',1,'2026-02-27 04:23:11.069','2026-02-27 04:23:11.069'),('87b9afc8-6e77-45ca-bc72-79bffae4631c','d373f202-5d3b-4894-858a-4005b72c1d3a','image','/uploads/images/e2001a6c-3b3a-4e7c-b88d-29c6c6a5a440_1772166189977.png',7,'2026-02-27 04:23:11.069','2026-02-27 04:23:11.069'),('8a732a06-0b8a-4e6d-a2a6-795b66573610','858a31d1-c488-4e21-9cae-5a928d7e3c50','video','https://res.cloudinary.com/dsvxorol7/video/upload/v1772159910/my_app_videos/sqs8scwf16nwkhq8fmqo.mp4',5,'2026-02-27 02:38:47.520','2026-02-27 02:38:47.520'),('9836acce-2e85-467a-ab13-cf029baf35c3','a59d9e01-b694-44a7-a9b2-17bb3e389638','image','/uploads/images/740a060f-f884-4835-811a-5d888a1b365b_1772115122490.jpg',1,'2026-02-26 14:12:03.757','2026-02-26 14:12:03.757'),('ac40a466-0e1e-42e4-b1f1-3eb65fbe877e','a59d9e01-b694-44a7-a9b2-17bb3e389638','image','/uploads/images/965f0c41-0e90-45c0-b551-66d665d84817_1772115122518.jpg',5,'2026-02-26 14:12:03.757','2026-02-26 14:12:03.757'),('b234a671-df67-470c-9443-ec1f77d6e509','d373f202-5d3b-4894-858a-4005b72c1d3a','image','/uploads/images/3afdd73d-9b99-46e4-8ff7-02cae8b47d49_1772165782651.png',4,'2026-02-27 04:23:11.069','2026-02-27 04:23:11.069'),('b499291f-cf7f-45d2-8c81-eaf3e160beb4','d373f202-5d3b-4894-858a-4005b72c1d3a','image','/uploads/images/aeadc5d9-6e99-43d6-8fa0-f44436d9e6c8_1772165782651.png',3,'2026-02-27 04:23:11.069','2026-02-27 04:23:11.069'),('c1e8ae97-b877-446a-ac02-bc84993acf00','858a31d1-c488-4e21-9cae-5a928d7e3c50','image','/uploads/images/1ee5d84d-86e3-4f82-82a1-077d676a7f38_1772156847969.png',1,'2026-02-27 02:38:47.520','2026-02-27 02:38:47.520'),('c5ce122a-877d-4cf2-b4e6-0985cf00d7d1','a59d9e01-b694-44a7-a9b2-17bb3e389638','image','/uploads/images/8b59b5d1-a9c6-45dc-b09f-a5ac46df3dce_1772115122497.jpg',2,'2026-02-26 14:12:03.757','2026-02-26 14:12:03.757'),('c9f5912b-794a-4220-9520-cfb996c135df','d373f202-5d3b-4894-858a-4005b72c1d3a','image','/uploads/images/a4d7466c-67ee-4bf3-a6d7-cd703e1c9e01_1772166189974.png',5,'2026-02-27 04:23:11.069','2026-02-27 04:23:11.069'),('cc1739d9-7ae5-431a-88b9-e3ef11799667','1c9e264c-dfe1-4953-aa83-ae545e6a6cd1','image','/uploads/images/013f3b9b-f577-488d-9562-3f9021f26c42_1772156803564.png',4,'2026-02-27 01:46:53.484','2026-02-27 01:46:53.484'),('d92d3154-16fc-4bb0-bfd1-713a5f8fe46f','a59d9e01-b694-44a7-a9b2-17bb3e389638','image','/uploads/images/c1f519dd-39a2-4c1e-bc2d-21c7f04c453d_1772115122533.jpg',6,'2026-02-26 14:12:03.757','2026-02-26 14:12:03.757'),('da448257-7275-4a44-a6ff-b3dc45a170f0','a59d9e01-b694-44a7-a9b2-17bb3e389638','image','/uploads/images/b7ace94d-b2c0-4cfe-bfb2-aa0a2e4de505_1772115122513.jpg',4,'2026-02-26 14:12:03.757','2026-02-26 14:12:03.757'),('ddf22590-9356-4e65-b4d6-2c95b041e691','1c9e264c-dfe1-4953-aa83-ae545e6a6cd1','image','/uploads/images/2e349f4c-6948-4e95-8810-ecae95705252_1772156803563.png',3,'2026-02-27 01:46:53.484','2026-02-27 01:46:53.484'),('e87777a3-d58c-448f-ab0d-9c469c44a5c8','d7e2569f-feec-4e49-81a2-75fe490a974d','image','/uploads/images/c22fabe7-9ea2-47e4-9888-be856deb9c55_1772156822540.png',1,'2026-03-01 01:37:42.241','2026-03-01 01:37:42.241'),('fc290ba3-2d74-4b43-ac82-89aec83a0b64','858a31d1-c488-4e21-9cae-5a928d7e3c50','image','/uploads/images/614e1ede-df24-46e2-b2f9-7873f1668643_1772156847972.png',3,'2026-02-27 02:38:47.520','2026-02-27 02:38:47.520'),('fc3eafdf-1857-4167-add1-53c7ef20807c','d373f202-5d3b-4894-858a-4005b72c1d3a','image','/uploads/images/9d7f8b73-59e7-4e9d-af4e-c840085719ba_1772166189979.png',9,'2026-02-27 04:23:11.069','2026-02-27 04:23:11.069');
/*!40000 ALTER TABLE `media_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `navs`
--

DROP TABLE IF EXISTS `navs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `navs` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `navs_code_key` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `navs`
--

LOCK TABLES `navs` WRITE;
/*!40000 ALTER TABLE `navs` DISABLE KEYS */;
INSERT INTO `navs` VALUES ('19521cd0-c523-40f3-a629-09d64062abed','Trang chủ','home','active','2026-02-21 03:58:58.284','2026-02-27 06:56:26.734'),('4d5d35c2-14d4-4671-bb44-151fc0dce9fa','Sản phẩm','product','active','2026-02-21 03:59:11.510','2026-02-27 06:56:32.137'),('5a4f779a-5fa7-4e74-9231-b05980f1e7e5','Liên hệ','contact','active','2026-02-21 04:00:20.519','2026-02-27 07:13:04.183'),('6548662d-0cc3-424c-8557-72e44ad9c636','Media','media','active','2026-02-21 04:00:16.656','2026-02-27 07:13:03.448'),('9194df9e-693d-4b19-a9fc-a18e731e408f','Giới thiệu','introduce','active','2026-02-21 03:59:03.255','2026-02-27 07:07:34.033'),('9c94cfc8-992e-4ed0-bd77-5815ebf09776','Tuyển dụng','recruitment','active','2026-02-21 03:59:15.296','2026-02-27 06:56:40.665'),('ab958dc3-4938-475b-987e-b3ff8a31a157','Tin tức','news','active','2026-02-21 04:00:13.076','2026-02-27 07:13:03.751'),('e450ab0e-dedb-4393-8e85-cec952eee968','Dịch vụ','services','active','2026-02-21 03:59:07.901','2026-02-27 07:07:34.271');
/*!40000 ALTER TABLE `navs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `popup_translations`
--

DROP TABLE IF EXISTS `popup_translations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `popup_translations` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `popup_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `language_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `popup_translations_popup_id_language_id_key` (`popup_id`,`language_id`),
  KEY `popup_translations_language_id_idx` (`language_id`),
  CONSTRAINT `popup_translations_language_id_fkey` FOREIGN KEY (`language_id`) REFERENCES `languages` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `popup_translations_popup_id_fkey` FOREIGN KEY (`popup_id`) REFERENCES `popups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `popup_translations`
--

LOCK TABLES `popup_translations` WRITE;
/*!40000 ALTER TABLE `popup_translations` DISABLE KEYS */;
INSERT INTO `popup_translations` VALUES ('2b6353e9-f3cf-4739-884c-041f6b64f848','256b0df4-3388-4382-afac-80020e6606eb','ee6cb970-0e1b-11f1-bd10-005056c00001','English Popup','Popup content in English','2026-02-21 12:06:34.132','2026-02-26 14:47:58.873'),('8683e1ac-9f10-4fda-99dc-4c10d0d90e11','256b0df4-3388-4382-afac-80020e6606eb','ee6ca771-0e1b-11f1-bd10-005056c00001','Popup tiếng Việt','Nội dung popup tiếng Việt','2026-02-21 12:06:34.127','2026-02-26 14:47:58.864'),('e6749511-2bee-467d-912a-ce8d4ad33267','256b0df4-3388-4382-afac-80020e6606eb','ee6cbe22-0e1b-11f1-bd10-005056c00001','Popup Français','Contenu du popup en français','2026-02-21 12:06:34.135','2026-02-26 14:47:58.882');
/*!40000 ALTER TABLE `popup_translations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `popups`
--

DROP TABLE IF EXISTS `popups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `popups` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `thumbnail` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `sort_order` int NOT NULL DEFAULT '0',
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `popups_status_idx` (`status`),
  KEY `popups_sort_order_idx` (`sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `popups`
--

LOCK TABLES `popups` WRITE;
/*!40000 ALTER TABLE `popups` DISABLE KEYS */;
INSERT INTO `popups` VALUES ('256b0df4-3388-4382-afac-80020e6606eb','/uploads/images/8e04eb78-6f99-4408-aa05-a36a7acff5ca_1772117277818.png','active',0,'2026-02-21 12:06:34.121','2026-02-26 14:47:58.843'),('33435f5b-c4b9-40c1-9078-76702cf7bd7c','/uploads/banner.jpg','inactive',1,'2026-02-20 13:28:54.611','2026-02-20 13:28:54.611');
/*!40000 ALTER TABLE `popups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_categories`
--

DROP TABLE IF EXISTS `post_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post_categories` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_categories`
--

LOCK TABLES `post_categories` WRITE;
/*!40000 ALTER TABLE `post_categories` DISABLE KEYS */;
INSERT INTO `post_categories` VALUES ('2f05b4ee-3d49-445e-9505-289c561a0d56','active','2026-02-20 09:38:59.542','2026-02-20 09:38:59.542'),('e0799e0d-1b1b-4958-be51-ee053a80b253','active','2026-02-20 09:43:21.937','2026-02-20 09:43:25.333');
/*!40000 ALTER TABLE `post_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_category_translations`
--

DROP TABLE IF EXISTS `post_category_translations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post_category_translations` (
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_category_translations`
--

LOCK TABLES `post_category_translations` WRITE;
/*!40000 ALTER TABLE `post_category_translations` DISABLE KEYS */;
INSERT INTO `post_category_translations` VALUES ('229a1b93-e8b1-45c1-9bc3-4b892f84f557','2f05b4ee-3d49-445e-9505-289c561a0d56','ee6ca771-0e1b-11f1-bd10-005056c00001','Thiết kế Website','thiet-ke-website','2026-02-20 09:38:59.579','2026-02-20 09:38:59.579'),('24d4f1cb-cb9d-4b6c-9274-f9feca27c0f6','2f05b4ee-3d49-445e-9505-289c561a0d56','ee6cbe22-0e1b-11f1-bd10-005056c00001','Conception de site web','conception-site-web','2026-02-20 09:38:59.588','2026-02-20 09:38:59.588'),('27272e45-9aae-40ae-bd04-a36b5220d82e','2f05b4ee-3d49-445e-9505-289c561a0d56','ee6cb970-0e1b-11f1-bd10-005056c00001','Website Design','website-design','2026-02-20 09:38:59.585','2026-02-20 09:38:59.585'),('3504ebe4-ad3c-4839-8372-19fba1c9ae63','e0799e0d-1b1b-4958-be51-ee053a80b253','ee6cb970-0e1b-11f1-bd10-005056c00001','Website Design','website-designn','2026-02-20 09:43:21.946','2026-02-20 09:43:21.946'),('9ed9fdf9-aa9d-4624-8810-5f54efef19f0','e0799e0d-1b1b-4958-be51-ee053a80b253','ee6cbe22-0e1b-11f1-bd10-005056c00001','Conception de site web','conception-site-webb','2026-02-20 09:43:21.950','2026-02-20 09:43:21.950'),('a412295f-f626-4ea4-b7a3-f2178c8dd9d4','e0799e0d-1b1b-4958-be51-ee053a80b253','ee6ca771-0e1b-11f1-bd10-005056c00001','Thiết kế Website','thiet-ke-websitee','2026-02-20 09:43:21.943','2026-02-20 09:43:21.943');
/*!40000 ALTER TABLE `post_category_translations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_translations`
--

DROP TABLE IF EXISTS `post_translations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post_translations` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `post_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `language_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci,
  `content` longtext COLLATE utf8mb4_unicode_ci,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `post_translations_post_id_language_id_key` (`post_id`,`language_id`),
  KEY `post_translations_language_id_fkey` (`language_id`),
  CONSTRAINT `post_translations_language_id_fkey` FOREIGN KEY (`language_id`) REFERENCES `languages` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `post_translations_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_translations`
--

LOCK TABLES `post_translations` WRITE;
/*!40000 ALTER TABLE `post_translations` DISABLE KEYS */;
INSERT INTO `post_translations` VALUES ('15059ca1-e432-4be6-bbf4-40471e08a2e7','631a70e5-4ef4-46f5-a52a-e1eb8f38f0e9','ee6cbe22-0e1b-11f1-bd10-005056c00001','Créer une API REST avec Node.js et Prisma','creer-api-rest-nodejs-prismaasdasdasd','Un guide étape par étape pour créer une API REST avec Node.js, Express et Prisma.','<h2>Introduction</h2><p>Dans cet article, nous allons créer une API REST complète avec Node.js et Prisma.</p><h3>Étapes</h3><ul><li><p>Initialiser le projet</p></li><li><p>Installer Prisma</p></li><li><p>Créer le schéma</p></li><li><p>Développer les contrôleurs</p></li></ul><p>À la fin, vous aurez un backend prêt pour la production.</p>','2026-03-01 01:24:19.506','2026-03-01 01:24:19.506'),('4fc4405b-49ec-4921-88fb-9a83239ad050','8fde7adc-a046-4d9b-bbb9-32a4f338a39f','ee6cb970-0e1b-11f1-bd10-005056c00001','Build a REST API with Node.js and Prismaee','build-rest-api-nodejs-prismaee','A step-by-step guide to building a REST API using Node.js, Express, and Prisma ORM.','<h2>Introduction</h2><p>In this article, we will build a complete REST API using Node.js and Prisma.</p><h3>Steps</h3><ul><li><p>Initialize project</p></li><li><p>Install Prisma</p></li><li><p>Create schema</p></li><li><p>Build controllers</p></li></ul><p>After finishing, you\'ll have a production-ready backend.</p>','2026-02-28 07:14:59.545','2026-02-28 07:14:59.545'),('5c3ddc5a-6a84-4ec8-aff6-6bcb4b7e8672','8fde7adc-a046-4d9b-bbb9-32a4f338a39f','ee6ca771-0e1b-11f1-bd10-005056c00001','Hướng dẫn xây dựng REST API với Node.js và Prismae','huong-dan-xay-dung-rest-api-nodejs-prismaee','Bài viết hướng dẫn chi tiết cách xây dựng REST API sử dụng Node.js, Express và Prisma ORM.','<h2>Giới thiệu</h2><p>Trong bài viết này, chúng ta sẽ xây dựng một REST API hoàn chỉnh với Node.js và Prisma.</p><h3>Các bước thực hiện</h3><ul><li><p>Khởi tạo project</p></li><li><p>Cài đặt Prisma</p></li><li><p>Tạo schema</p></li><li><p>Xây dựng controller</p></li></ul><p>Sau khi hoàn thành, bạn sẽ có một backend sẵn sàng để kết nối frontend.</p>','2026-02-28 07:14:59.545','2026-02-28 07:14:59.545'),('6c2eb3f1-b362-405e-a74e-2d63ffb01e6e','7b49e2f2-c9ca-42d6-8632-41b6a38fd7f6','ee6ca771-0e1b-11f1-bd10-005056c00001','Hướng dẫn xây dựng REST API với Node.js và Prisma','huong-dan-xay-dung-rest-api-nodejs-prismaaa','Bài viết hướng dẫn chi tiết cách xây dựng REST API sử dụng Node.js, Express và Prisma ORM.','<h2>Giới thiệu</h2><p>Trong bài viết này, chúng ta sẽ xây dựng một REST API hoàn chỉnh với Node.js và Prisma.</p><h3>Các bước thực hiện</h3><ul><li><p>Khởi tạo project</p></li><li><p>Cài đặt Prisma</p></li><li><p>Tạo schema</p></li><li><p>Xây dựng controller</p></li></ul><p>Sau khi hoàn thành, bạn sẽ có một backend sẵn sàng để kết nối frontend.</p><img src=\"http://localhost:8000/uploads/images/a1c0fd73-192d-4123-b81f-236823f8ebbc_1772264981795.jpg\" alt=\"704c31853ec6c1b06ef562634bc03ad5\" title=\"704c31853ec6c1b06ef562634bc03ad5\" data-keep-ratio=\"true\" class=\"\" style=\"\"><p></p>','2026-02-28 07:15:22.973','2026-02-28 07:49:44.117'),('882f0386-0e93-4406-b44f-0d62aea8245d','2c6a5290-2373-4473-94e5-204d61af73da','ee6ca771-0e1b-11f1-bd10-005056c00001','Hướng dẫn xây dựng REST API với Node.js và Prisma','huong-dan-xay-dung-rest-api-nodejs-prismaasd','Bài viết hướng dẫn chi tiết cách xây dựng REST API sử dụng Node.js, Express và Prisma ORM.','\n                <h2>Giới thiệu</h2>\n                <p>Trong bài viết này, chúng ta sẽ xây dựng một REST API hoàn chỉnh với Node.js và Prisma.</p>\n\n                <h3>Các bước thực hiện</h3>\n                <ul>\n                    <li>Khởi tạo project</li>\n                    <li>Cài đặt Prisma</li>\n                    <li>Tạo schema</li>\n                    <li>Xây dựng controller</li>\n                </ul>\n\n                <p>Sau khi hoàn thành, bạn sẽ có một backend sẵn sàng để kết nối frontend.</p>\n            ','2026-03-01 01:23:57.222','2026-03-01 01:23:57.222'),('927c9d69-e36c-46bf-ba5b-c7cba430e88b','2c6a5290-2373-4473-94e5-204d61af73da','ee6cb970-0e1b-11f1-bd10-005056c00001','Build a REST API with Node.js and Prisma','build-rest-api-nodejs-prismaasd','A step-by-step guide to building a REST API using Node.js, Express, and Prisma ORM.','<h2>Introduction</h2><p>In this article, we will build a complete REST API using Node.js and Prisma.</p><h3>Steps</h3><ul><li><p>Initialize project</p></li><li><p>Install Prisma</p></li><li><p>Create schema</p></li><li><p>Build controllers</p></li></ul><p>After finishing, you\'ll have a production-ready backend.</p>','2026-03-01 01:23:57.222','2026-03-01 01:23:57.222'),('a328bfb8-2d97-4bb6-b628-e1e6afc043df','8fde7adc-a046-4d9b-bbb9-32a4f338a39f','ee6cbe22-0e1b-11f1-bd10-005056c00001','Créer une API REST avec Node.js et Prismaee','creer-api-rest-nodejs-prismaee','Un guide étape par étape pour créer une API REST avec Node.js, Express et Prisma.','<h2>Introduction</h2><p>Dans cet article, nous allons créer une API REST complète avec Node.js et Prisma.</p><h3>Étapes</h3><ul><li><p>Initialiser le projet</p></li><li><p>Installer Prisma</p></li><li><p>Créer le schéma</p></li><li><p>Développer les contrôleurs</p></li></ul><p>À la fin, vous aurez un backend prêt pour la production.</p>','2026-02-28 07:14:59.545','2026-02-28 07:14:59.545'),('aa19f336-1ebe-4e8b-af82-67bce08f7f1f','2c6a5290-2373-4473-94e5-204d61af73da','ee6cbe22-0e1b-11f1-bd10-005056c00001','Créer une API REST avec Node.js et Prisma','creer-api-rest-nodejs-prismaasd','Un guide étape par étape pour créer une API REST avec Node.js, Express et Prisma.','<h2>Introduction</h2><p>Dans cet article, nous allons créer une API REST complète avec Node.js et Prisma.</p><h3>Étapes</h3><ul><li><p>Initialiser le projet</p></li><li><p>Installer Prisma</p></li><li><p>Créer le schéma</p></li><li><p>Développer les contrôleurs</p></li></ul><p>À la fin, vous aurez un backend prêt pour la production.</p>','2026-03-01 01:23:57.222','2026-03-01 01:23:57.222'),('aad08688-7ffd-49f9-8d8b-2ea42849175f','44d7bede-ea33-4ec3-aabd-62de4d3ec0df','ee6cbe22-0e1b-11f1-bd10-005056c00001','Créer une API REST avec Node.js et Prisma','creer-api-rest-nodejs-prisma','Un guide étape par étape pour créer une API REST avec Node.js, Express et Prisma.','<h2>Introduction</h2><p>Dans cet article, nous allons créer une API REST complète avec Node.js et Prisma.</p><h3>Étapes</h3><ul><li><p>Initialiser le projet</p></li><li><p>Installer Prisma</p></li><li><p>Créer le schéma</p></li><li><p>Développer les contrôleurs</p></li></ul><p>À la fin, vous aurez un backend prêt pour la production.</p>','2026-02-20 09:50:26.958','2026-02-28 03:38:11.960'),('bc3f5fbd-ac9d-46ed-acd9-76aa55c2b4fd','44d7bede-ea33-4ec3-aabd-62de4d3ec0df','ee6ca771-0e1b-11f1-bd10-005056c00001','Hướng dẫn xây dựng REST API với Node.js và Prisma','huong-dan-xay-dung-rest-api-nodejs-prisma','Bài viết hướng dẫn chi tiết cách xây dựng REST API sử dụng Node.js, Express và Prisma ORM.','<h2>Giới thiệu</h2><p>Trong bài viết này, chúng ta sẽ xây dựng một REST API hoàn chỉnh với Node.js và Prisma.</p><h3>Các bước thực hiện</h3><ul><li><p>Khởi tạo project</p></li><li><p>Cài đặt Prisma</p></li><li><p>Tạo schema</p></li><li><p>Xây dựng controller</p></li></ul><p>Sau khi hoàn thành, bạn sẽ có một backend sẵn sàng để kết nối frontend.</p>','2026-02-20 09:50:26.958','2026-02-28 03:38:11.952'),('c715aef2-e47b-4d82-8f43-3b0dfe92c060','7b49e2f2-c9ca-42d6-8632-41b6a38fd7f6','ee6cbe22-0e1b-11f1-bd10-005056c00001','Créer une API REST avec Node.js et Prisma','creer-api-rest-nodejs-prismaaa','Un guide étape par étape pour créer une API REST avec Node.js, Express et Prisma.','<h2>Introduction</h2><p>Dans cet article, nous allons créer une API REST complète avec Node.js et Prisma.</p><h3>Étapes</h3><ul><li><p>Initialiser le projet</p></li><li><p>Installer Prisma</p></li><li><p>Créer le schéma</p></li><li><p>Développer les contrôleurs</p></li></ul><p>À la fin, vous aurez un backend prêt pour la production.</p>','2026-02-28 07:15:22.973','2026-02-28 07:49:44.132'),('df557e02-2df4-4c4e-af35-37c1ed108dec','631a70e5-4ef4-46f5-a52a-e1eb8f38f0e9','ee6cb970-0e1b-11f1-bd10-005056c00001','Build a REST API with Node.js and Prisma','build-rest-api-nodejs-prismaasdasdasd','A step-by-step guide to building a REST API using Node.js, Express, and Prisma ORM.','<h2>Introduction</h2><p>In this article, we will build a complete REST API using Node.js and Prisma.</p><h3>Steps</h3><ul><li><p>Initialize project</p></li><li><p>Install Prisma</p></li><li><p>Create schema</p></li><li><p>Build controllers</p></li></ul><p>After finishing, you\'ll have a production-ready backend.</p>','2026-03-01 01:24:19.506','2026-03-01 01:24:19.506'),('eb9ee640-f8ef-4aee-b3d4-936b0f34fc73','44d7bede-ea33-4ec3-aabd-62de4d3ec0df','ee6cb970-0e1b-11f1-bd10-005056c00001','Build a REST API with Node.js and Prisma','build-rest-api-nodejs-prisma','A step-by-step guide to building a REST API using Node.js, Express, and Prisma ORM.','<h2>Introduction</h2><p>In this article, we will build a complete REST API using Node.js and Prisma.</p><h3>Steps</h3><ul><li><p>Initialize project</p></li><li><p>Install Prisma</p></li><li><p>Create schema</p></li><li><p>Build controllers</p></li></ul><p>After finishing, you\'ll have a production-ready backend.</p>','2026-02-20 09:50:26.958','2026-02-28 03:38:11.957'),('f3cd4ad6-6f97-4208-93ae-8e6c4578913d','7b49e2f2-c9ca-42d6-8632-41b6a38fd7f6','ee6cb970-0e1b-11f1-bd10-005056c00001','Build a REST API with Node.js and Prisma','build-rest-api-nodejs-prismaaa','A step-by-step guide to building a REST API using Node.js, Express, and Prisma ORM.','<h2>Introduction</h2><p>In this article, we will build a complete REST API using Node.js and Prisma.</p><h3>Steps</h3><ul><li><p>Initialize project</p></li><li><p>Install Prisma</p></li><li><p>Create schema</p></li><li><p>Build controllers</p></li></ul><p>After finishing, you\'ll have a production-ready backend.</p>','2026-02-28 07:15:22.973','2026-02-28 07:49:44.128'),('f4e82619-7301-47eb-99ba-f8234c33e8d9','631a70e5-4ef4-46f5-a52a-e1eb8f38f0e9','ee6ca771-0e1b-11f1-bd10-005056c00001','Hướng dẫn xây dựng REST API với Node.js và Prisma','huong-dan-xay-dung-rest-api-nodejs-prismaasdasd','Bài viết hướng dẫn chi tiết cách xây dựng REST API sử dụng Node.js, Express và Prisma ORM.','\n                <h2>Giới thiệu</h2>\n                <p>Trong bài viết này, chúng ta sẽ xây dựng một REST API hoàn chỉnh với Node.js và Prisma.</p>\n\n                <h3>Các bước thực hiện</h3>\n                <ul>\n                    <li>Khởi tạo project</li>\n                    <li>Cài đặt Prisma</li>\n                    <li>Tạo schema</li>\n                    <li>Xây dựng controller</li>\n                </ul>\n\n                <p>Sau khi hoàn thành, bạn sẽ có một backend sẵn sàng để kết nối frontend.</p>\n            ','2026-03-01 01:24:19.506','2026-03-01 01:24:19.506');
/*!40000 ALTER TABLE `post_translations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `author_id` char(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  `thumbnail` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `posts_category_id_fkey` (`category_id`),
  CONSTRAINT `posts_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `post_categories` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES ('2c6a5290-2373-4473-94e5-204d61af73da','2f05b4ee-3d49-445e-9505-289c561a0d56',NULL,'active','2026-03-01 01:23:57.222','2026-03-01 01:23:57.222','/uploads/images/ad79bf7c-2a22-48ce-a5bd-2e163a6ac1b9_1772328228190.png'),('44d7bede-ea33-4ec3-aabd-62de4d3ec0df','2f05b4ee-3d49-445e-9505-289c561a0d56',NULL,'active','2026-02-20 09:50:26.958','2026-02-28 03:38:11.936','/uploads/images/744d5495-6a66-45a5-9a2b-a28c13169df3_1772249888710.jpg'),('631a70e5-4ef4-46f5-a52a-e1eb8f38f0e9','2f05b4ee-3d49-445e-9505-289c561a0d56',NULL,'active','2026-03-01 01:24:19.506','2026-03-01 01:24:19.506','/uploads/images/5d339755-bfbb-4923-b933-a996b04a546f_1772328243212.jpg'),('7b49e2f2-c9ca-42d6-8632-41b6a38fd7f6','2f05b4ee-3d49-445e-9505-289c561a0d56',NULL,'active','2026-02-28 07:15:22.973','2026-02-28 07:49:44.082','/uploads/images/0525ea6e-eacf-4cc2-96ac-f61be9b34c77_1772262911545.jpg'),('8fde7adc-a046-4d9b-bbb9-32a4f338a39f','2f05b4ee-3d49-445e-9505-289c561a0d56',NULL,'active','2026-02-28 07:14:59.545','2026-02-28 07:36:46.033','/uploads/images/b7e4be16-63bd-4ae7-8377-36506151fb66_1772262803113.jpg');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_categories`
--

DROP TABLE IF EXISTS `product_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_categories` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_categories`
--

LOCK TABLES `product_categories` WRITE;
/*!40000 ALTER TABLE `product_categories` DISABLE KEYS */;
INSERT INTO `product_categories` VALUES ('3a2c3b29-5344-4b0a-a212-aec6d6b3941e','active','2026-02-26 12:45:12.029','2026-02-26 12:45:12.029'),('97d8156c-0cb1-4a2e-b07f-061c0b951d4e','active','2026-02-20 09:19:10.803','2026-02-28 03:47:41.218');
/*!40000 ALTER TABLE `product_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_category_translations`
--

DROP TABLE IF EXISTS `product_category_translations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_category_translations` (
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_category_translations`
--

LOCK TABLES `product_category_translations` WRITE;
/*!40000 ALTER TABLE `product_category_translations` DISABLE KEYS */;
INSERT INTO `product_category_translations` VALUES ('15dee763-d69e-43c1-a90f-e29e623e8103','97d8156c-0cb1-4a2e-b07f-061c0b951d4e','ee6cb970-0e1b-11f1-bd10-005056c00001','Electronics','electronicss','2026-02-20 09:19:10.812','2026-02-20 09:21:55.576'),('3ebd4ce4-2b29-4589-b638-e8c1c34bfe88','3a2c3b29-5344-4b0a-a212-aec6d6b3941e','ee6cb970-0e1b-11f1-bd10-005056c00001','Phones','phonses','2026-02-26 12:45:12.047','2026-02-26 12:45:12.047'),('4db9b99b-ed6f-445a-9a30-b0b470c32746','97d8156c-0cb1-4a2e-b07f-061c0b951d4e','ee6cbe22-0e1b-11f1-bd10-005056c00001','Électronique','electroniquee','2026-02-20 09:19:10.814','2026-02-20 09:21:55.580'),('5e2cfbcf-19c3-473e-857b-088aa3313d91','97d8156c-0cb1-4a2e-b07f-061c0b951d4e','ee6ca771-0e1b-11f1-bd10-005056c00001','Thiết bị điện tử','thiet-bi-dien-tuu','2026-02-20 09:19:10.808','2026-02-20 09:21:55.570'),('e10c0447-82b0-4d20-a388-dfcf99859efb','3a2c3b29-5344-4b0a-a212-aec6d6b3941e','ee6ca771-0e1b-11f1-bd10-005056c00001','Điện thoại','dien-thoayi','2026-02-26 12:45:12.042','2026-02-26 12:45:12.042');
/*!40000 ALTER TABLE `product_category_translations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_galleries`
--

DROP TABLE IF EXISTS `product_galleries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_galleries` (
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_galleries`
--

LOCK TABLES `product_galleries` WRITE;
/*!40000 ALTER TABLE `product_galleries` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_galleries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_translations`
--

DROP TABLE IF EXISTS `product_translations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_translations` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `language_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci,
  `content` longtext COLLATE utf8mb4_unicode_ci,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `product_translations_product_id_language_id_key` (`product_id`,`language_id`),
  KEY `product_translations_language_id_fkey` (`language_id`),
  CONSTRAINT `product_translations_language_id_fkey` FOREIGN KEY (`language_id`) REFERENCES `languages` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `product_translations_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_translations`
--

LOCK TABLES `product_translations` WRITE;
/*!40000 ALTER TABLE `product_translations` DISABLE KEYS */;
INSERT INTO `product_translations` VALUES ('17c4e5dd-347a-4340-9fa7-6fb53c5b65b2','0411a25b-6da3-47b5-9b4d-553fef844acc','ee6ca771-0e1b-11f1-bd10-005056c00001','Serum dưỡng da cao cấp','serum-duong-da-cao-cap','Serum dưỡng da giúp da sáng và mịn.','\n                    <h2>Giới thiệu</h2>\n                    <p>Serum cao cấp giúp cải thiện làn da rõ rệt.</p>\n                ','2026-02-20 09:24:07.773','2026-03-01 07:19:13.726'),('504b55a9-7144-416b-9e91-0b3618028b48','c6de2b28-4410-45ed-b5af-7ed3d2d940d8','ee6cbe22-0e1b-11f1-bd10-005056c00001','Sérum de soin premium','serum-soin-premiumm','Sérum de haute qualité pour une peau éclatante.','<h2>Introduction</h2><p>Un sérum premium pour améliorer la peau.</p>','2026-02-20 09:33:17.372','2026-03-01 07:19:05.942'),('6074ecb6-5c97-4f94-97a7-5e1fbb963314','d8433c22-d98d-4602-8c9a-7b7c0c6be336','ee6cbe22-0e1b-11f1-bd10-005056c00001','Sérum de soin premium','serum-soin-premiumasdasd','Sérum de haute qualité pour une peau éclatante.','<h2>Introduction</h2><p>Un sérum premium pour améliorer la peau.</p>','2026-03-01 07:19:32.681','2026-03-01 07:19:32.681'),('95161c91-c8fe-4fa7-8348-a9ee7fed938a','0411a25b-6da3-47b5-9b4d-553fef844acc','ee6cb970-0e1b-11f1-bd10-005056c00001','Premium Skin Serum','premium-skin-serum','High quality serum for glowing skin.','\n                    <h2>Introduction</h2>\n                    <p>Premium serum improves your skin texture.</p>\n                ','2026-02-20 09:24:07.773','2026-03-01 07:19:13.730'),('baaf39ef-a801-406d-8f75-90539437e19b','d8433c22-d98d-4602-8c9a-7b7c0c6be336','ee6ca771-0e1b-11f1-bd10-005056c00001','Serum dưỡng da cao cấp','serum-duong-da-cao-capasdasd','Serum dưỡng da giúp da sáng và mịn.','\n                    <h2>Giới thiệu</h2>\n                    <p>Serum cao cấp giúp cải thiện làn da rõ rệt.</p>\n                ','2026-03-01 07:19:32.681','2026-03-01 07:19:32.681'),('bebac6e7-97a3-476a-97ae-e8e0f3c5f587','d8433c22-d98d-4602-8c9a-7b7c0c6be336','ee6cb970-0e1b-11f1-bd10-005056c00001','Premium Skin Serum','premium-skin-serumasdasd','High quality serum for glowing skin.','<h2>Introduction</h2><p>Premium serum improves your skin texture.</p>','2026-03-01 07:19:32.681','2026-03-01 07:19:32.681'),('dc4e4050-ed41-43b9-8957-563eedc393c7','c6de2b28-4410-45ed-b5af-7ed3d2d940d8','ee6ca771-0e1b-11f1-bd10-005056c00001','Serum dưỡng da cao cấp','serum-duong-da-cao-capp','Serum dưỡng da giúp da sáng và mịn.','\n                    <h2>Giới thiệu</h2>\n                    <p>Serum cao cấp giúp cải thiện làn da rõ rệt.</p>\n                ','2026-02-20 09:33:17.372','2026-03-01 07:19:05.932'),('deac8526-342a-4712-b8eb-1e3bb31829a6','0411a25b-6da3-47b5-9b4d-553fef844acc','ee6cbe22-0e1b-11f1-bd10-005056c00001','Sérum de soin premium','serum-soin-premium','Sérum de haute qualité pour une peau éclatante.','\n                    <h2>Introduction</h2>\n                    <p>Un sérum premium pour améliorer la peau.</p>\n                ','2026-02-20 09:24:07.773','2026-03-01 07:19:13.733'),('fce20723-302a-471f-a21b-4adb5dd5a08d','c6de2b28-4410-45ed-b5af-7ed3d2d940d8','ee6cb970-0e1b-11f1-bd10-005056c00001','Premium Skin Serum','premium-skin-serumm','High quality serum for glowing skin.','<h2>Introduction</h2><p>Premium serum improves your skin texture.</p>','2026-02-20 09:33:17.372','2026-03-01 07:19:05.939');
/*!40000 ALTER TABLE `product_translations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES ('0411a25b-6da3-47b5-9b4d-553fef844acc','97d8156c-0cb1-4a2e-b07f-061c0b951d4e',1200000.00,990000.00,50,'/uploads/images/c7052e73-9511-4bda-9926-1621b8e33535_1772349552266.jpg','active','2026-02-20 09:24:07.768','2026-03-01 07:19:13.718'),('c6de2b28-4410-45ed-b5af-7ed3d2d940d8','97d8156c-0cb1-4a2e-b07f-061c0b951d4e',0.00,0.00,0,'/uploads/images/7e9b87bd-cc67-4ffe-89b9-55a42cbc9143_1772349544156.png','active','2026-02-20 09:33:17.359','2026-03-01 07:19:05.880'),('d8433c22-d98d-4602-8c9a-7b7c0c6be336','97d8156c-0cb1-4a2e-b07f-061c0b951d4e',0.00,0.00,0,'/uploads/images/b3f3162c-7f13-478f-a23e-6ea3094968ec_1772349570294.jpg','active','2026-03-01 07:19:32.670','2026-03-01 07:19:32.670');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_categories`
--

DROP TABLE IF EXISTS `service_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service_categories` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_categories`
--

LOCK TABLES `service_categories` WRITE;
/*!40000 ALTER TABLE `service_categories` DISABLE KEYS */;
INSERT INTO `service_categories` VALUES ('739b0ca9-57ad-48d6-8f75-abe8956d737d','active','2026-02-22 02:44:50.161','2026-02-26 04:04:23.540'),('92800a70-fbd6-4be8-a33c-ce51b20b8b1c','active','2026-02-20 08:52:23.044','2026-02-27 07:01:14.638');
/*!40000 ALTER TABLE `service_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_category_translations`
--

DROP TABLE IF EXISTS `service_category_translations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service_category_translations` (
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_category_translations`
--

LOCK TABLES `service_category_translations` WRITE;
/*!40000 ALTER TABLE `service_category_translations` DISABLE KEYS */;
INSERT INTO `service_category_translations` VALUES ('30c30ec7-a2cc-40c8-bf02-cbb36ca577e6','739b0ca9-57ad-48d6-8f75-abe8956d737d','ee6cb970-0e1b-11f1-bd10-005056c00001','Website Design Service','website-design-servicee','2026-02-22 02:44:50.174','2026-02-26 04:04:23.568'),('59884a6d-4fe8-4cef-83ef-86bfbedbcba4','739b0ca9-57ad-48d6-8f75-abe8956d737d','ee6ca771-0e1b-11f1-bd10-005056c00001','Dịch vụ thiết kế website1','dich-vu-thiet-ke-websiteee','2026-02-22 02:44:50.170','2026-02-26 04:04:23.560'),('89264653-9c08-4e6d-8797-51d2f10b4b4f','92800a70-fbd6-4be8-a33c-ce51b20b8b1c','ee6ca771-0e1b-11f1-bd10-005056c00001','Dịch vụ thiết kế website','dich-vu-thiet-ke-website','2026-02-20 08:52:23.049','2026-02-20 08:52:23.049'),('96bb9a10-faf2-4cf4-8d09-a6f189f1c980','92800a70-fbd6-4be8-a33c-ce51b20b8b1c','ee6cbe22-0e1b-11f1-bd10-005056c00001','Service de conception de site web','service-conception-site-web','2026-02-20 08:52:23.060','2026-02-20 08:52:23.060'),('cef8f258-4477-41e1-8fbe-612520b9a519','739b0ca9-57ad-48d6-8f75-abe8956d737d','ee6cbe22-0e1b-11f1-bd10-005056c00001','Service de conception de site web','service-conception-site-webb','2026-02-22 02:44:50.178','2026-02-26 04:04:23.572'),('eb811449-dcea-4b0e-8980-9799cd126c3f','92800a70-fbd6-4be8-a33c-ce51b20b8b1c','ee6cb970-0e1b-11f1-bd10-005056c00001','Website Design Service','website-design-service','2026-02-20 08:52:23.054','2026-02-20 08:52:23.054');
/*!40000 ALTER TABLE `service_category_translations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_galleries`
--

DROP TABLE IF EXISTS `service_galleries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service_galleries` (
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_galleries`
--

LOCK TABLES `service_galleries` WRITE;
/*!40000 ALTER TABLE `service_galleries` DISABLE KEYS */;
INSERT INTO `service_galleries` VALUES ('2b5bb44b-c5d9-4d30-ac51-c12035682f46','35fc920f-e872-4bef-9625-cdec27c087ed','/uploads/images/4d77b359-0a5b-428c-9da6-ed70be18d5bf_1772260681833.jpg',3,'2026-02-28 06:47:46.807','2026-02-28 06:47:46.807'),('a4744fde-f6b1-4f87-8dce-824b96999e8b','35fc920f-e872-4bef-9625-cdec27c087ed','/uploads/images/dac54cf6-9285-4658-a9b2-ca5a95cadd15_1772260681829.jpg',1,'2026-02-28 06:47:46.807','2026-02-28 06:47:46.807'),('caae9e64-4fca-4ee8-9af2-e7cc0762c09b','35fc920f-e872-4bef-9625-cdec27c087ed','/uploads/images/6701a948-d84a-4132-ad12-16a1aef38a58_1772260681837.jpg',5,'2026-02-28 06:47:46.807','2026-02-28 06:47:46.807'),('e1ff27f1-4ffa-4162-8865-9c0c926b81d3','35fc920f-e872-4bef-9625-cdec27c087ed','/uploads/images/b59cccab-4bea-4673-bb8a-e54575bd2055_1772260681834.jpg',4,'2026-02-28 06:47:46.807','2026-02-28 06:47:46.807'),('f78484f3-6cba-4753-9ccf-41564c5666a1','35fc920f-e872-4bef-9625-cdec27c087ed','/uploads/images/e9205251-689b-4017-a137-335656f9c080_1772260681829.jpg',2,'2026-02-28 06:47:46.807','2026-02-28 06:47:46.807');
/*!40000 ALTER TABLE `service_galleries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_translations`
--

DROP TABLE IF EXISTS `service_translations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service_translations` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `service_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `language_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci,
  `content` longtext COLLATE utf8mb4_unicode_ci,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `service_translations_service_id_language_id_key` (`service_id`,`language_id`),
  KEY `service_translations_language_id_fkey` (`language_id`),
  CONSTRAINT `service_translations_language_id_fkey` FOREIGN KEY (`language_id`) REFERENCES `languages` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `service_translations_service_id_fkey` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_translations`
--

LOCK TABLES `service_translations` WRITE;
/*!40000 ALTER TABLE `service_translations` DISABLE KEYS */;
INSERT INTO `service_translations` VALUES ('3c53c2c0-20dd-44d1-8755-9d67c28f04e9','35fc920f-e872-4bef-9625-cdec27c087ed','ee6cb970-0e1b-11f1-bd10-005056c00001','Comprehensive SEO Service','comprehensive-seo-service','Full SEO solution','English SEO content...','2026-02-20 09:10:26.073','2026-02-28 06:47:46.785'),('3f840c26-40dc-40c5-bdf3-42525e41d420','1659bd29-e655-4cfa-abd5-df6cf5db9939','ee6ca771-0e1b-11f1-bd10-005056c00001','Dịch vụ SEO tổng thể','dich-vu-seo-tong-thee','Giải pháp SEO toàn diện','Nội dung SEO tiếng Việt...','2026-02-20 09:03:26.885','2026-02-20 09:03:26.885'),('656f4308-9fd5-43c6-a419-aa2627a2072d','35fc920f-e872-4bef-9625-cdec27c087ed','ee6cbe22-0e1b-11f1-bd10-005056c00001','Service SEO complet','service-seo-complet','Solution SEO complète','Contenu SEO en français...','2026-02-20 09:10:26.073','2026-02-28 06:47:46.789'),('8ca00447-3d2c-485f-9acd-cc90b55496e5','1659bd29-e655-4cfa-abd5-df6cf5db9939','ee6cb970-0e1b-11f1-bd10-005056c00001','Comprehensive SEO Service','comprehensive-seo-servicee','Full SEO solution','<p>English SEO content...</p>','2026-02-20 09:03:26.885','2026-02-20 09:03:26.885'),('90da8018-064b-4b62-beca-9398ec3eeb36','1659bd29-e655-4cfa-abd5-df6cf5db9939','ee6cbe22-0e1b-11f1-bd10-005056c00001','Service SEO complet','service-seo-complete','Solution SEO complète','<p>Contenu SEO en français...</p>','2026-02-20 09:03:26.885','2026-02-20 09:03:26.885'),('bccefd35-4f56-4c11-8fd5-420fee24fbae','35fc920f-e872-4bef-9625-cdec27c087ed','ee6ca771-0e1b-11f1-bd10-005056c00001','Dịch vụ SEO tổng thể','dich-vu-seo-tong-the','Giải pháp SEO toàn diện','<p>Nội dung SEO tiếng Việt...</p>','2026-02-20 09:10:26.073','2026-02-28 06:47:46.776');
/*!40000 ALTER TABLE `service_translations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services` (
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES ('1659bd29-e655-4cfa-abd5-df6cf5db9939','SEO-001',1500000.00,'','active','2026-02-20 09:03:26.871','2026-02-27 08:43:21.972',NULL,'92800a70-fbd6-4be8-a33c-ce51b20b8b1c'),('35fc920f-e872-4bef-9625-cdec27c087ed','SEO-0011',-1.00,'/uploads/images/9835cff5-cbce-4f85-a95d-5028aa86fd69_1772260673532.jpg','active','2026-02-20 09:10:26.055','2026-02-28 06:47:46.743',NULL,'92800a70-fbd6-4be8-a33c-ce51b20b8b1c');
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `site_settings`
--

DROP TABLE IF EXISTS `site_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `site_settings` (
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `site_settings`
--

LOCK TABLES `site_settings` WRITE;
/*!40000 ALTER TABLE `site_settings` DISABLE KEYS */;
INSERT INTO `site_settings` VALUES ('bf954e1e-76e3-4c50-8ba4-9800ed7cce54','09091234566','contact@example.comm','123 Nguyễn Huệ, Quận 1, TP.HCMz','Thứ 2 - Thứ 7: 08:00 - 18:00','/uploads/images/dc1ba555-d4b3-4ff0-ab05-a8c2d742836f_1772269920873.png','<iframe src=\'https://www.google.com/maps/embed?...\'></iframe>','https://facebook.com/yourpage','https://instagram.com/yourpage','https://tiktok.com/@yourpage','https://youtube.com/@yourpage','Zhen Beauty - Thẩm mỹ viện hàng đầu','Zhen Beauty cung cấp dịch vụ làm đẹp chất lượng cao tại TP.HCM.','2026-02-20 13:39:11.147','2026-02-28 09:12:01.799');
/*!40000 ALTER TABLE `site_settings` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-01 16:05:30
