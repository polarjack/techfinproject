-- MySQL dump 10.13  Distrib 5.7.20, for Linux (x86_64)
--
-- Host: localhost    Database: techfin
-- ------------------------------------------------------
-- Server version	5.7.20-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `techfin`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `techfin` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `techfin`;

--
-- Table structure for table `book`
--

DROP TABLE IF EXISTS `book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `book` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contract_address` varchar(100) DEFAULT NULL,
  `start_date` varchar(100) DEFAULT NULL,
  `end_date` varchar(100) DEFAULT NULL,
  `user_address` varchar(100) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `status` char(1) DEFAULT '1',
  `creation_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `item_id` int(11) DEFAULT NULL,
  `transaction` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book`
--

LOCK TABLES `book` WRITE;
/*!40000 ALTER TABLE `book` DISABLE KEYS */;
INSERT INTO `book` VALUES (1,'0xaec506f54bdb63299a56f54955f16a05a944136a','Jan 7, 2018','Jan 31, 2018','0xee47120e0af5e54b18c91d37ee1788c5f66e82b0',8,'0','2018-01-02 04:34:51',3,'0x0b8fbb29de5f1ef195d00bf8c39b95e7bacab0ef243a438aad00da3af7d7703c'),(2,'0xaec506f54bdb63299a56f54955f16a05a944136a','Jan 7, 2018','Jan 14, 2018','0xee47120e0af5e54b18c91d37ee1788c5f66e82b0',8,'0','2018-01-02 04:56:41',3,'0x0be35538b64b552b0b26b95696854c8c2e64e16c95e87660aa21811ac21cd6b7'),(3,'0x70d504bd8265d8f13e8b96c1e0e5480132734a9b','Jan 14, 2018','Jan 30, 2018','0xee47120e0af5e54b18c91d37ee1788c5f66e82b0',8,'0','2018-01-07 21:06:51',5,'0x335fad9f58ea96d579735e0de6f1608c58853668e9d044d420fe8b212fdbec8d'),(4,'0x70d504bd8265d8f13e8b96c1e0e5480132734a9b','Jan 14, 2018','Jan 22, 2018','0xee47120e0af5e54b18c91d37ee1788c5f66e82b0',8,'0','2018-01-07 21:09:14',5,'0x29fa8bf3021d62baefd78daa67a1c13658cc0596b2198a3c3ef1cb371fe184fc'),(5,'0x70d504bd8265d8f13e8b96c1e0e5480132734a9b','Jan 15, 2018','Jan 24, 2018','0xee47120e0af5e54b18c91d37ee1788c5f66e82b0',8,'0','2018-01-07 21:32:28',5,'0x9e7dfff0dbda760f120bdaba0e55b920aabc4af0cf74f6f96ada965fee57f506'),(6,'0x578d2fbce134fffee1ab2b15da3836284e1e8898','Jan 23, 2018','Jan 25, 2018','0xfb80b8c0ab00d9e834cae9277b9608c71ed7b219',7,'0','2018-01-08 04:26:29',6,'0x22f1d8e00c18791ecfbe0e4a0be44137c62049e7fed933ffbb8e2b6b3f163450');
/*!40000 ALTER TABLE `book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `location` varchar(255) DEFAULT NULL,
  `contract_address` varchar(255) DEFAULT NULL,
  `price_perday` int(11) DEFAULT NULL,
  `status` char(1) DEFAULT '1',
  `creation_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `owner` int(11) DEFAULT NULL,
  `item_name` varchar(255) DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `gas_used` bigint(20) DEFAULT NULL,
  `block_number` bigint(20) DEFAULT NULL,
  `image` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES (2,'台北市大安區新生路4段56號','0xf60b2d15b56ccb6beb647f8b03e220352833a5c1',500,'0','2017-12-29 14:43:00',8,'大安區美宅','2017-12-19 00:00:00','2018-01-03 00:00:00',974478,107311,'12999777883_ef5f4ab9fd_m.jpg'),(3,'台北市信義區基隆路36號7樓','0xaec506f54bdb63299a56f54955f16a05a944136a',1000,'0','2017-12-29 16:36:46',8,'信義區美宅','2017-12-19 00:00:00','2018-03-03 00:00:00',974478,109587,'13994690607_058bd889ef_m.jpg '),(4,'台北市文山區指南路二段45號','0xcebeb83fb3c896d4236958cf0b310822d33159db',300,'0','2017-12-29 16:51:31',8,'文山區美宅','2017-10-04 00:00:00','2018-03-31 00:00:00',974478,109882,'4593978575_200c8fa0fc_m.jpg'),(5,'台北市中山區忠孝東路五段10號','0x70d504bd8265d8f13e8b96c1e0e5480132734a9b',400,'1','2018-01-07 20:54:46',8,'中山區別墅','2018-01-09 00:00:00','2018-01-31 00:00:00',670466,373947,'1.jpg'),(6,'台北市松山區','0x578d2fbce134fffee1ab2b15da3836284e1e8898',700,'1','2018-01-07 20:57:50',8,'松山區美宅','2018-01-08 00:00:00','2018-01-31 00:00:00',670466,374008,'2.jpg'),(7,'台北市永和區','0x2c14ee2831e2d8788118fe4667dacdd58e857669',400,'1','2018-01-07 21:01:52',8,'永和區大廈','2018-01-05 00:00:00','2018-01-31 00:00:00',670466,374089,'3.jpg'),(8,'taipei xin kiloung rd section 3 no 6 floor 11th','0xcd268db7dcc07a8e2bcc05622aa23a88462fee44',600,'1','2018-01-08 04:23:04',7,'Xin Yi elevator department','2018-01-02 00:00:00','2018-01-27 00:00:00',670466,382913,'4.jpg'),(9,'台北市海景','0xe1b9bbfa29950e7e2367af438dd65349fc7ac229',400,'1','2018-01-08 21:25:01',12,'淡水海景','2018-01-14 00:00:00','2018-01-21 00:00:00',670466,403352,'5.jpg'),(10,'豪宅','0xf22e13a9767d5b5d472e8e6cab28bc879d319f77',500,'1','2018-01-08 22:43:40',15,'豪宅','2018-01-14 00:00:00','2018-01-31 00:00:00',670466,404924,'6.jpg');
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `account` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `status` char(1) DEFAULT '1',
  `creation_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `address` varchar(255) DEFAULT NULL,
  `privatekey` varchar(255) DEFAULT NULL,
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'fuck','123456','fuck@gmail.com','1','2017-12-03 23:43:11',NULL,NULL),(2,'asshole','123456','asshole@gmail.com','1','2017-12-03 23:43:48',NULL,NULL),(3,'asshole','todotodo','test@gmail.com','1','2017-12-15 10:47:38','0xcaae2d3ef2c95956411DdB9bB6E9b5a78722c8da','0xee96e1e759f9b0c021385a1da42d5b594752241d57f1e537290de304d9498901'),(4,'east','todotodo','east@gmail.com','1','2017-12-15 10:48:26','0xEbEEa176736Fc86e8Caa3d55B95a2C83C0A83B16','0x008ed218829ac9f4014ec83cb8145558108947132203b8abbb549ba83db8cea1'),(5,'west','testing','west@gmail.com','1','2017-12-15 10:49:19','0x9876B8288697bcEa3AB8BB8770D8aAE1751CD7F9','0xb89f81de7aa4a317355d731cd86eb59829132b1f9a067f69e19790012e3268d7'),(6,'north','123456','north@gmail.com','1','2017-12-27 21:26:28','0xb5B7b94A33F61a7898553C907609954b67a93cf9','0xf82d94990ed2011a15438ad65aed13aeecba10687e6b91a89ce011d02e861d7d'),(7,'highschool','123456','test@gmail.com','1','2017-12-28 12:38:16','0xfb80b8c0ab00d9e834cae9277b9608c71ed7b219','0x54fe189ec2f7102e81a8881a75a4797ba4d231b1db038686ec14628d94a79108'),(8,'fuckinggod','123456','fuck@gmail.com','1','2017-12-28 16:46:19','0xee47120e0af5e54b18c91d37ee1788c5f66e82b0','0xfbc1d0975eac12509c6f4241b4e87a239bb296f7942f2762613339966aad6178'),(9,'xuan','xuan','xuan@gmail.com','1','2017-12-28 19:47:42','0xaa0cb0a41035a373a52f286d3fd5f252ce71567a','0x343cd147b2905e33520b6a4d62943930b298c9930b27a2eaedeace20d0ac699d'),(10,'tt','tt','tt@gmail','1','2017-12-29 17:04:39','0x61999d9cdc9d934714fbb584ff395ac939939d3b','0x43fdc1c26a8036d69f3e45b8c465907e5b5e7b195561757b79e2c91c63719920'),(11,'testing','jack850912','testing@gmail.com','1','2017-12-29 21:27:54','0xb20c2c778db6be975d435bca852b78b59dd47e28','0xe35c1cb7a57ec7c5957386768dad03b6d545ad2a5051cc79f6f0e5b00192b2a9'),(12,'Mary','qwer','mary@gmail.com','1','2018-01-08 20:08:54','0x57b422e4c938cdec022288db581f0444bdf992ec','0x662d60b6db4802a5a25c72833fbbd1eebd078ecc27b6eac8d403b6c307ebc9b3'),(14,'bob','123456','bob@gmail.com','1','2018-01-08 21:46:37','0x7bb2b8512feffb423ae62618042c9ca50f4467f9','0xf4e5822878bdd56af2ebf7cdd07a1eb613543cee145bd5954c48f6651d93fb42'),(15,'sara','123456','sara@gmail.com','1','2018-01-08 22:42:41','0x6adeaf03de6ebd81fbdc961295488e9bae82e26d','0xb51f6a06590bf4353147396552f1785cf25d79df7d38c01a3c1c2c04e2a7e271');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-01-09 11:27:42
