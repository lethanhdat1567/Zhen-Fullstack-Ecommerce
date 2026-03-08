/*
  Warnings:

  - You are about to drop the column `deleted_at` on the `services` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `services_deleted_at_idx` ON `services`;

-- AlterTable
ALTER TABLE `services` DROP COLUMN `deleted_at`;
