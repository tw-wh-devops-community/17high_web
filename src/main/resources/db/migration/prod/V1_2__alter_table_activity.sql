ALTER TABLE `activity` ADD COLUMN `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE `activity` ADD COLUMN `display_time` TINYINT DEFAULT 10;
ALTER TABLE `activity` ADD COLUMN `owner` VARCHAR(255) DEFAULT 'admin';