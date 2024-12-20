# Host: localhost  (Version 5.5.5-10.4.32-MariaDB)
# Date: 2024-12-20 16:33:10
# Generator: MySQL-Front 6.0  (Build 2.20)


#
# Structure for table "group_wilayah"
#

DROP TABLE IF EXISTS `group_wilayah`;
CREATE TABLE `group_wilayah` (
  `id_group_wilayah` char(6) NOT NULL,
  `nama_group_wilayah` varchar(255) NOT NULL,
  `cakupan_group_wilayah` varchar(1000) NOT NULL,
  `koor_group_wilayah` varchar(255) NOT NULL,
  PRIMARY KEY (`id_group_wilayah`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

#
# Data for table "group_wilayah"
#


#
# Structure for table "jemaat"
#

DROP TABLE IF EXISTS `jemaat`;
CREATE TABLE `jemaat` (
  `id_jemaat` char(6) NOT NULL,
  `id_kk_jemaat` char(6) NOT NULL,
  `id_group_wilayah` char(6) NOT NULL,
  `nama_jemaat` varchar(255) NOT NULL,
  `foto_jemaat` int(11) NOT NULL,
  `tempat_tanggal_lahir` varchar(255) NOT NULL,
  `nomor_hp` char(15) NOT NULL,
  `alamat_domisili` varchar(1000) NOT NULL,
  `status` enum('aktif','pindah','meninggal dunia','') NOT NULL,
  PRIMARY KEY (`id_jemaat`),
  KEY `fk_id_kk_jemaat` (`id_kk_jemaat`),
  KEY `fk_id_group_wilayah` (`id_group_wilayah`),
  CONSTRAINT `fk_id_group_wilayah` FOREIGN KEY (`id_group_wilayah`) REFERENCES `group_wilayah` (`id_group_wilayah`),
  CONSTRAINT `fk_id_kk_jemaat` FOREIGN KEY (`id_kk_jemaat`) REFERENCES `kk_jemaat` (`id_kk_jemaat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

#
# Data for table "jemaat"
#


#
# Structure for table "kk_jemaat"
#

DROP TABLE IF EXISTS `kk_jemaat`;
CREATE TABLE `kk_jemaat` (
  `id_kk_jemaat` char(6) NOT NULL,
  `id_jemaat` char(6) NOT NULL,
  `nama_kepala_keluarga` varchar(255) NOT NULL,
  `alamat_kk` varchar(1000) NOT NULL,
  PRIMARY KEY (`id_kk_jemaat`),
  KEY `fk_id_jemaat` (`id_jemaat`),
  CONSTRAINT `fk_id_jemaat` FOREIGN KEY (`id_jemaat`) REFERENCES `jemaat` (`id_jemaat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

#
# Data for table "kk_jemaat"
#


#
# Structure for table "hubungan_keluarga"
#

DROP TABLE IF EXISTS `hubungan_keluarga`;
CREATE TABLE `hubungan_keluarga` (
  `id_hubungan_keluarga` char(6) NOT NULL,
  `id_kk_jemaat` char(6) NOT NULL,
  `id_jemaat` char(6) NOT NULL,
  `status_keluarga` enum('ayah','ibu','anak','kerabat','lain-lain') NOT NULL,
  PRIMARY KEY (`id_hubungan_keluarga`),
  KEY `fk_id_kk_jemaat_hubungan` (`id_kk_jemaat`),
  CONSTRAINT `fk_id_kk_jemaat_hubungan` FOREIGN KEY (`id_kk_jemaat`) REFERENCES `kk_jemaat` (`id_kk_jemaat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

#
# Data for table "hubungan_keluarga"
#


#
# Structure for table "user"
#

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id_user` char(6) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','jemaat','pendeta','') NOT NULL,
  PRIMARY KEY (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

#
# Data for table "user"
#

INSERT INTO `user` VALUES ('U01','admin1','12345','admin');
