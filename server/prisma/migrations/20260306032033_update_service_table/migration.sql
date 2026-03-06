/*
  Warnings:

  - You are about to drop the column `sku` on the `services` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `services_sku_key` ON `services`;

-- AlterTable
ALTER TABLE `services` DROP COLUMN `sku`,
    ADD COLUMN `capacity` INTEGER NOT NULL DEFAULT 2;
