CREATE TABLE `activity` (
`id` bigint(20) NOT NULL AUTO_INCREMENT PRIMARY KEY,
`end_time` datetime DEFAULT NULL,
`imageurl` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
`location` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
`description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
`name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
`start_time` datetime DEFAULT NULL,
`status` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
`sponsor` VARCHAR (255) COLLATE utf8mb4_unicode_ci DEFAULT NULL DEFAULT NULL,
`guest` VARCHAR (255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
`type` VARCHAR (10),
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;