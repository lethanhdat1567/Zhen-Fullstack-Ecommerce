-- AlterTable
ALTER TABLE `bookings` ADD COLUMN `payment_method` ENUM('vnpay', 'cod') NOT NULL DEFAULT 'vnpay';
