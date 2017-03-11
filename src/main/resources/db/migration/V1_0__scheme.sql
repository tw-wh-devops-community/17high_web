CREATE TABLE `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `avatarurl` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dob` datetime DEFAULT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gender` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `activity` (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`end_time` datetime DEFAULT NULL,
`imageurl` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
`location` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
`long_description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
`name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
`short_description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
`start_time` datetime DEFAULT NULL,
`status` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
`sponsor_id` bigint(20) DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `FKp6vcgsir3tvfn75jcmbqs9a6d` (`sponsor_id`),
CONSTRAINT `FKp6vcgsir3tvfn75jcmbqs9a6d` FOREIGN KEY (`sponsor_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE `activity_participants` (
  `joined_activities_id` bigint(20) NOT NULL,
  `participants_id` bigint(20) NOT NULL,
  KEY `FKmfvh5bdkiy467tw2k2wllnkjt` (`participants_id`),
  KEY `FK7wdd4aexgnkkaxnv68oi5o2ha` (`joined_activities_id`),
  CONSTRAINT `FK7wdd4aexgnkkaxnv68oi5o2ha` FOREIGN KEY (`joined_activities_id`) REFERENCES `activity` (`id`),
  CONSTRAINT `FKmfvh5bdkiy467tw2k2wllnkjt` FOREIGN KEY (`participants_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;