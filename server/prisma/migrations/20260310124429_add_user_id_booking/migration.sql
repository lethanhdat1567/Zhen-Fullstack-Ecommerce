-- AlterTable
ALTER TABLE `bookings` ADD COLUMN `user_id` CHAR(36) NULL;

-- AddForeignKey
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
