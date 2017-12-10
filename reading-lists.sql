
SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

CREATE DATABASE `reading_lists`;
USE reading_lists;

--Tabela `categorie`

CREATE TABLE IF NOT EXISTS `categorie`
(
`id` INTEGER NOT NULL AUTO_INCREMENT,
`denumire` varchar(50) DEFAULT NULL,
`descriere` varchar(100) DEFAULT NULL,
`createdAt` timestamp,
`updatedAt` timestamp,
PRIMARY KEY(`id`),
KEY `id` (`id`)
)
AUTO_INCREMENT=1;

--Tabela `carte`

CREATE TABLE IF NOT EXISTS `carte`
(
`id` INTEGER NOT NULL auto_increment,
`id_categorie` INTEGER DEFAULT NULL,
`titlu_carte` VARCHAR(35) DEFAULT NULL,
`autor` VARCHAR(30) DEFAULT NULL,
`descriere_carte` VARCHAR(100) DEFAULT NULL,
`imagine_carte` VARCHAR(200) DEFAULT NULL,
`createdAt` timestamp,
`updatedAt` timestamp,
PRIMARY KEY(`id`),
FOREIGN KEY(`id_categorie`) REFERENCES categorie(`id`)
)
