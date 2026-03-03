/*
  Warnings:

  - You are about to drop the column `thumbnail` on the `post_translations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `post_translations` DROP COLUMN `thumbnail`;

-- AlterTable
ALTER TABLE `posts` ADD COLUMN `thumbnail` VARCHAR(191) NULL;
