-- phpMyAdmin SQL Dump
-- version 4.1.0
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Feb 07, 2014 at 05:51 AM
-- Server version: 5.5.34
-- PHP Version: 5.5.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `roadfloodph`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE IF NOT EXISTS `admin` (
  `adminId` int(10) NOT NULL AUTO_INCREMENT,
  `adminName` varchar(100) NOT NULL,
  `adminEmail` varchar(100) NOT NULL,
  `adminContact` varchar(20) NOT NULL,
  `adminPassword` varchar(100) NOT NULL,
  `dateAdded` varchar(20) NOT NULL,
  `timeAdded` varchar(20) NOT NULL,
  PRIMARY KEY (`adminId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`adminId`, `adminName`, `adminEmail`, `adminContact`, `adminPassword`, `dateAdded`, `timeAdded`) VALUES
(1, 'Mark Anthony Muya', 'markmuya@outlook.com', '9275628107', '95e7f080d93915662d9a2f486417e2ae', '2014/01/05', '07:57:01'),
(2, 'Johnver Bautista', 'johnverbautista00@hotmail.com', '9126959610', 'c67bda85a582c83d66bcc135e4920292', '2014/01/05', '12:51:42'),
(3, 'Katrina Hazel Malagday', 'katyabu@gmail.com', '9276658721', 'd41d8cd98f00b204e9800998ecf8427e', '2014/01/05', '13:24:30'),
(4, 'Kim Carla Lleno', 'kimlleno@yahoo.com', '9498829188', 'd41d8cd98f00b204e9800998ecf8427e', '2014/01/05', '13:29:12'),
(5, 'Naila Renz Obnial', 'nailaobnial@yahoo.com', '9185738472', '9d9a5e87133777a6395ddcaa53598eae', '2014/01/06', '16:21:40');

-- --------------------------------------------------------

--
-- Table structure for table `incomingmessages`
--

CREATE TABLE IF NOT EXISTS `incomingmessages` (
  `incomingMessagesId` int(10) NOT NULL AUTO_INCREMENT,
  `incomingContact` varchar(20) NOT NULL,
  `incomingMessage` varchar(150) NOT NULL,
  `receivedDate` varchar(20) NOT NULL,
  `receivedTime` varchar(20) NOT NULL,
  `serverResponse` varchar(20) NOT NULL,
  PRIMARY KEY (`incomingMessagesId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `subscriber`
--

CREATE TABLE IF NOT EXISTS `subscriber` (
  `subscriberId` int(10) NOT NULL AUTO_INCREMENT,
  `subscriberAT` varchar(100) NOT NULL,
  `subscriberContact` varchar(20) NOT NULL,
  `subscriberTotalSubscriptions` int(5) NOT NULL,
  `subscriberCredit` decimal(20,2) NOT NULL,
  `subscriberStatus` varchar(20) NOT NULL,
  `dateAdded` varchar(20) NOT NULL,
  `timeAdded` varchar(20) NOT NULL,
  PRIMARY KEY (`subscriberId`),
  KEY `subscriberContact` (`subscriberContact`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `subscriber`
--

INSERT INTO `subscriber` (`subscriberId`, `subscriberAT`, `subscriberContact`, `subscriberTotalSubscriptions`, `subscriberCredit`, `subscriberStatus`, `dateAdded`, `timeAdded`) VALUES
(1, 'GDfoaj_kurzkRv-aX4gznqNsQiaEf6xltDogm62hQ8A', '9275628107', 1, '0.00', 'active', '2013-10-30', '9:34 AM');

-- --------------------------------------------------------

--
-- Table structure for table `subscription`
--

CREATE TABLE IF NOT EXISTS `subscription` (
  `subscriptionId` int(10) NOT NULL AUTO_INCREMENT,
  `subscriberContact` varchar(20) NOT NULL,
  `unitId` int(10) NOT NULL,
  `subscriptionStatus` varchar(20) NOT NULL,
  `subscriptionDate` varchar(20) NOT NULL,
  `subscriptionTime` varchar(20) NOT NULL,
  PRIMARY KEY (`subscriptionId`),
  KEY `subscriberContact` (`subscriberContact`),
  KEY `unitId` (`unitId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `subscription`
--

INSERT INTO `subscription` (`subscriptionId`, `subscriberContact`, `unitId`, `subscriptionStatus`, `subscriptionDate`, `subscriptionTime`) VALUES
(1, '9275628107', 1, 'ACTIVE', '2014/02/07', '12:55:06');

-- --------------------------------------------------------

--
-- Table structure for table `transactionlogs`
--

CREATE TABLE IF NOT EXISTS `transactionlogs` (
  `transactionLogId` int(10) NOT NULL AUTO_INCREMENT,
  `subscriberContact` varchar(20) NOT NULL,
  `subscriberMessage` varchar(150) NOT NULL,
  `chargeToSubscriber` int(10) NOT NULL,
  `transactionDate` varchar(20) NOT NULL,
  `transactionTime` varchar(20) NOT NULL,
  PRIMARY KEY (`transactionLogId`),
  KEY `subscriberContact` (`subscriberContact`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `unitleveldetection`
--

CREATE TABLE IF NOT EXISTS `unitleveldetection` (
  `unitId` int(10) NOT NULL,
  `unitWaterLevel` varchar(10) NOT NULL,
  `unitDateAsOf` varchar(20) NOT NULL,
  `unitTimeAsOf` varchar(20) NOT NULL,
  PRIMARY KEY (`unitId`),
  KEY `unitId` (`unitId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `unitleveldetection`
--

INSERT INTO `unitleveldetection` (`unitId`, `unitWaterLevel`, `unitDateAsOf`, `unitTimeAsOf`) VALUES
(1, '18', '2014/02/07', '13:49:20'),
(2, '45', '2014/01/02', '15:34:42'),
(3, '0', '2014/01/07', '04:08:33'),
(4, '0', '2014/01/17', '05:25:01');

-- --------------------------------------------------------

--
-- Table structure for table `unitlist`
--

CREATE TABLE IF NOT EXISTS `unitlist` (
  `unitCode` varchar(10) NOT NULL,
  `dateAdded` varchar(20) NOT NULL,
  `timeAdded` varchar(20) NOT NULL,
  `ownerId` int(10) NOT NULL,
  `unitId` int(10) NOT NULL,
  PRIMARY KEY (`unitCode`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `unitlist`
--

INSERT INTO `unitlist` (`unitCode`, `dateAdded`, `timeAdded`, `ownerId`, `unitId`) VALUES
('RF100C1218', '2014/01/02', '15:30:20', 1, 1),
('RF521B1612', '2014/01/07', '04:08:33', 1, 3),
('RF911B0011', '', '', 0, 0),
('RF911B0309', '2014/01/02', '15:34:42', 1, 2),
('RF921F5021', '', '', 0, 0),
('RF931G0112', '2014/01/17', '05:25:01', 2, 4);

-- --------------------------------------------------------

--
-- Table structure for table `unitowner`
--

CREATE TABLE IF NOT EXISTS `unitowner` (
  `ownerId` int(10) NOT NULL AUTO_INCREMENT,
  `ownerName` varchar(100) NOT NULL,
  `ownerEmail` varchar(100) NOT NULL,
  `ownerContact` varchar(20) NOT NULL,
  `ownerAT` varchar(100) NOT NULL,
  `ownerPassword` varchar(100) NOT NULL,
  `dateAdded` varchar(20) NOT NULL,
  `timeAdded` varchar(20) NOT NULL,
  PRIMARY KEY (`ownerId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `unitowner`
--

INSERT INTO `unitowner` (`ownerId`, `ownerName`, `ownerEmail`, `ownerContact`, `ownerAT`, `ownerPassword`, `dateAdded`, `timeAdded`) VALUES
(1, 'Jethro De Guzman', 'jethdeguzman@outlook.com', '9239983928', '', '9b1ca84af9bebb35967e52c205afc7c9', '2014/01/06', '16:24:01'),
(2, 'Mark Joseph Penaranda', 'markjap@gmail.com', '9278849827', '', '95e7f080d93915662d9a2f486417e2ae', '2014/01/06', '16:27:00');

-- --------------------------------------------------------

--
-- Table structure for table `unitregistration`
--

CREATE TABLE IF NOT EXISTS `unitregistration` (
  `unitId` int(10) NOT NULL AUTO_INCREMENT,
  `unitSimNumber` varchar(20) NOT NULL,
  `unitViewing` varchar(20) NOT NULL,
  `unitRegion` varchar(20) NOT NULL,
  `unitName` varchar(100) NOT NULL,
  `unitStatus` varchar(20) NOT NULL,
  `frequency` varchar(5) NOT NULL,
  `ownerId` int(10) NOT NULL,
  `dateAdded` varchar(20) NOT NULL,
  `timeAdded` varchar(20) NOT NULL,
  `accessToken` varchar(100) NOT NULL,
  `unitSmsCode` varchar(10) NOT NULL,
  `unitSmsNotif` varchar(11) NOT NULL,
  PRIMARY KEY (`unitId`),
  KEY `ownerId` (`ownerId`),
  KEY `unitSimNumber` (`unitSimNumber`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `unitregistration`
--

INSERT INTO `unitregistration` (`unitId`, `unitSimNumber`, `unitViewing`, `unitRegion`, `unitName`, `unitStatus`, `frequency`, `ownerId`, `dateAdded`, `timeAdded`, `accessToken`, `unitSmsCode`, `unitSmsNotif`) VALUES
(1, '9154677374', 'public', 'ncr', 'Pureza, Sta. Mesa, Manila', 'ACTIVATED', '2.0', 1, '2014/01/02', '15:30:20', 'FMwCvIe_DSoBvRHPdQ25sp8N7X7j8koavVixY280DWc', 'PUREZA', 'activated'),
(2, '9266209871', 'public', 'ncr', 'Don Antonio, Holy Spirit, QC', 'ACTIVATED', '2.0', 1, '2014/01/02', '15:34:42', 'Cvfr6my-faXg4DavymvEz569deES9WCBUCOESgMqVgg', 'ANTONIO', 'activated'),
(3, '9179829849', 'private', 'ncr', 'Green Heights, Nangka, Marikina', 'UNKNOWN', '2.0', 1, '2014/01/07', '04:08:33', '', 'NANGKA', 'activated'),
(4, '9275562718', 'public', 'ncr', 'EDSA-North Ave., QC', 'UNKNOWN', '2.0', 2, '2014/01/17', '05:25:01', '', 'NORTHAVE', 'activated');

-- --------------------------------------------------------

--
-- Table structure for table `unitsmstemplogs`
--

CREATE TABLE IF NOT EXISTS `unitsmstemplogs` (
  `tempLogId` int(10) NOT NULL AUTO_INCREMENT,
  `unitSimNumber` varchar(20) NOT NULL,
  `smsRequest` varchar(30) NOT NULL,
  `receivedDate` varchar(20) NOT NULL,
  `receivedTime` varchar(20) NOT NULL,
  PRIMARY KEY (`tempLogId`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=43 ;

--
-- Dumping data for table `unitsmstemplogs`
--

INSERT INTO `unitsmstemplogs` (`tempLogId`, `unitSimNumber`, `smsRequest`, `receivedDate`, `receivedTime`) VALUES
(1, '9154677374', 'FLUPDATE 9', '2014/01/04', '07:19:39'),
(2, '9154677374', 'FLUPDATE 6', '2014/01/04', '07:26:38'),
(3, '9154677374', 'PWUPDATE 6', '2014/01/04', '07:28:10'),
(4, '9154677374', 'FLUPDATE 6', '2014/01/04', '07:31:16'),
(5, '9154677374', 'FLUPDATE 9', '2014/01/04', '07:38:32'),
(6, '9154677374', 'FLUPDATE 6', '2014/01/04', '07:42:50'),
(7, '9154677374', 'FLUPDATE 0', '2014/02/07', '12:55:53'),
(8, '9154677374', 'FLUPDATE 1', '2014/02/07', '12:59:05'),
(9, '9154677374', 'FLUPDATE 2', '2014/02/07', '13:00:18'),
(10, '9154677374', 'FLUPDATE 1', '2014/02/07', '13:00:52'),
(11, '9154677374', 'FLUPDATE 2', '2014/02/07', '13:01:27'),
(12, '9154677374', 'FLUPDATE 3', '2014/02/07', '13:02:01'),
(13, '9154677374', 'FLUPDATE 4', '2014/02/07', '13:04:46'),
(14, '9154677374', 'FLUPDATE 3', '2014/02/07', '13:06:08'),
(15, '9154677374', 'FLUPDATE 4', '2014/02/07', '13:06:42'),
(16, '9154677374', 'FLUPDATE 3', '2014/02/07', '13:07:54'),
(17, '9154677374', 'FLUPDATE 4', '2014/02/07', '13:08:48'),
(18, '9154677374', 'FLUPDATE 5', '2014/02/07', '13:09:10'),
(19, '9154677374', 'FLUPDATE 6', '2014/02/07', '13:10:05'),
(20, '9154677374', 'FLUPDATE 5', '2014/02/07', '13:10:48'),
(21, '9154677374', 'FLUPDATE 7', '2014/02/07', '13:12:35'),
(22, '9154677374', 'FLUPDATE 8', '2014/02/07', '13:12:58'),
(23, '9154677374', 'FLUPDATE 9', '2014/02/07', '13:14:35'),
(24, '9154677374', 'FLUPDATE 10', '2014/02/07', '13:16:04'),
(25, '9154677374', 'FLUPDATE 11', '2014/02/07', '13:22:47'),
(26, '9154677374', 'FLUPDATE 13', '2014/02/07', '13:23:31'),
(27, '9154677374', 'FLUPDATE 14', '2014/02/07', '13:23:42'),
(28, '9154677374', 'FLUPDATE 15', '2014/02/07', '13:24:06'),
(29, '9154677374', 'FLUPDATE 16', '2014/02/07', '13:24:49'),
(30, '9154677374', 'FLUPDATE 15', '2014/02/07', '13:27:54'),
(31, '9154677374', 'FLUPDATE 17', '2014/02/07', '13:39:06'),
(32, '9154677374', 'FLUPDATE 16', '2014/02/07', '13:39:16'),
(33, '9154677374', 'FLUPDATE 17', '2014/02/07', '13:40:29'),
(34, '9154677374', 'FLUPDATE 18', '2014/02/07', '13:43:25'),
(35, '9154677374', 'FLUPDATE 19', '2014/02/07', '13:43:41'),
(36, '9154677374', 'FLUPDATE 18', '2014/02/07', '13:44:45'),
(37, '9154677374', 'FLUPDATE 19', '2014/02/07', '13:45:12'),
(38, '9154677374', 'FLUPDATE 18', '2014/02/07', '13:45:57'),
(39, '9154677374', 'FLUPDATE 19', '2014/02/07', '13:46:40'),
(40, '9154677374', 'FLUPDATE 18', '2014/02/07', '13:47:12'),
(41, '9154677374', 'FLUPDATE 19', '2014/02/07', '13:47:57'),
(42, '9154677374', 'FLUPDATE 18', '2014/02/07', '13:49:10');

-- --------------------------------------------------------

--
-- Table structure for table `unitsmsupdatelogs`
--

CREATE TABLE IF NOT EXISTS `unitsmsupdatelogs` (
  `updateLogId` int(10) NOT NULL AUTO_INCREMENT,
  `unitSimNumber` varchar(20) NOT NULL,
  `reportedFloodLevel` varchar(10) NOT NULL,
  `receivedDate` varchar(20) NOT NULL,
  `receivedTime` varchar(20) NOT NULL,
  PRIMARY KEY (`updateLogId`),
  KEY `unitSimNumber` (`unitSimNumber`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=104 ;

--
-- Dumping data for table `unitsmsupdatelogs`
--

INSERT INTO `unitsmsupdatelogs` (`updateLogId`, `unitSimNumber`, `reportedFloodLevel`, `receivedDate`, `receivedTime`) VALUES
(1, '9154677374', '0', '2013/02/23', '00:00:38'),
(2, '9154677374', '1', '2013/02/23', '00:05:39'),
(3, '9154677374', '1', '2013/02/23', '01:11:50'),
(4, '9154677374', '2', '2013/02/23', '01:18:26'),
(5, '9154677374', '2', '2013/02/23', '01:21:30'),
(6, '9154677374', '2', '2013/02/23', '05:05:10'),
(7, '9154677374', '1', '2013/02/23', '07:15:16'),
(8, '9154677374', '1', '2013/02/23', '07:20:30'),
(9, '9154677374', '0', '2013/02/23', '07:46:01'),
(10, '9154677374', '0', '2013/02/23', '08:00:01'),
(11, '9154677374', '1', '2013/06/23', '14:45:46'),
(12, '9154677374', '2', '2013/06/23', '15:15:46'),
(13, '9154677374', '3', '2013/06/23', '17:30:12'),
(14, '9154677374', '4', '2013/06/23', '19:03:21'),
(15, '9154677374', '5', '2013/06/23', '20:41:04'),
(16, '9154677374', '6', '2013/06/23', '21:24:45'),
(17, '9154677374', '7', '2013/06/23', '22:30:12'),
(18, '9154677374', '8', '2013/06/23', '23:18:12'),
(19, '9154677374', '7', '2013/06/24', '01:30:36'),
(20, '9154677374', '8', '2013/06/24', '03:01:10'),
(21, '9154677374', '7', '2013/06/24', '04:48:36'),
(22, '9154677374', '6', '2013/06/24', '05:30:12'),
(23, '9154677374', '5', '2013/06/24', '08:48:51'),
(24, '9154677374', '4', '2013/06/24', '09:10:22'),
(25, '9154677374', '3', '2013/06/24', '11:12:32'),
(26, '9154677374', '4', '2013/06/24', '12:31:06'),
(27, '9154677374', '3', '2013/06/24', '14:15:16'),
(28, '9154677374', '2', '2013/06/24', '15:52:36'),
(29, '9154677374', '1', '2013/06/24', '16:21:42'),
(30, '9154677374', '0', '2013/06/24', '17:01:32'),
(31, '9154677374', '2', '2013/07/18', '17:37:16'),
(32, '9154677374', '4', '2013/07/18', '18:00:45'),
(33, '9154677374', '6', '2013/07/18', '20:01:02'),
(34, '9154677374', '8', '2013/07/18', '20:05:01'),
(35, '9154677374', '10', '2013/07/18', '20:15:14'),
(36, '9154677374', '12', '2013/07/18', '20:25:32'),
(37, '9154677374', '14', '2013/07/18', '20:56:53'),
(38, '9154677374', '16', '2013/07/19', '01:28:22'),
(39, '9154677374', '18', '2013/07/19', '09:07:39'),
(40, '9154677374', '20', '2013/07/19', '13:49:02'),
(41, '9154677374', '22', '2013/07/19', '17:15:41'),
(42, '9154677374', '20', '2013/07/19', '19:42:10'),
(43, '9154677374', '18', '2013/07/19', '20:20:15'),
(44, '9154677374', '16', '2013/07/19', '21:20:15'),
(45, '9154677374', '14', '2013/07/20', '01:03:10'),
(46, '9154677374', '12', '2013/07/20', '02:03:10'),
(47, '9154677374', '14', '2013/07/20', '03:03:10'),
(48, '9154677374', '16', '2013/07/20', '04:03:10'),
(49, '9154677374', '14', '2013/07/20', '05:03:10'),
(50, '9154677374', '12', '2013/07/20', '06:03:10'),
(51, '9154677374', '10', '2013/07/20', '07:03:10'),
(52, '9154677374', '8', '2013/07/20', '08:03:10'),
(53, '9154677374', '6', '2013/07/20', '09:03:10'),
(54, '9154677374', '4', '2013/07/20', '10:03:10'),
(55, '9154677374', '2', '2013/07/20', '11:03:10'),
(56, '9154677374', '0', '2013/07/20', '12:03:10'),
(57, '9154677374', '2', '2013/07/20', '13:01:01'),
(58, '9154677374', '0', '2013/07/20', '14:01:01'),
(59, '9154677374', '5', '2013/09/23', '01:01:01'),
(60, '9154677374', '10', '2013/09/23', '05:11:10'),
(61, '9154677374', '15', '2013/09/23', '09:06:46'),
(62, '9154677374', '20', '2013/09/23', '13:22:52'),
(63, '9154677374', '25', '2013/09/23', '17:31:44'),
(64, '9154677374', '30', '2013/09/23', '21:38:45'),
(65, '9154677374', '35', '2013/09/24', '01:43:25'),
(66, '9154677374', '30', '2013/09/24', '04:15:03'),
(67, '9154677374', '25', '2013/09/24', '05:35:03'),
(68, '9154677374', '20', '2013/09/24', '05:55:03'),
(69, '9154677374', '15', '2013/09/24', '06:17:03'),
(70, '9154677374', '10', '2013/09/24', '06:40:16'),
(71, '9154677374', '5', '2013/09/24', '06:55:22'),
(72, '9154677374', '0', '2013/09/24', '07:15:22'),
(73, '9154677374', '0', '2014/02/07', '12:56:08'),
(74, '9154677374', '1', '2014/02/07', '12:59:17'),
(75, '9154677374', '2', '2014/02/07', '13:00:33'),
(76, '9154677374', '1', '2014/02/07', '13:01:02'),
(77, '9154677374', '2', '2014/02/07', '13:01:37'),
(78, '9154677374', '3', '2014/02/07', '13:02:11'),
(79, '9154677374', '4', '2014/02/07', '13:05:37'),
(80, '9154677374', '3', '2014/02/07', '13:06:19'),
(81, '9154677374', '4', '2014/02/07', '13:06:54'),
(82, '9154677374', '3', '2014/02/07', '13:08:10'),
(83, '9154677374', '4', '2014/02/07', '13:08:58'),
(84, '9154677374', '5', '2014/02/07', '13:09:24'),
(85, '9154677374', '6', '2014/02/07', '13:10:16'),
(86, '9154677374', '7', '2014/02/07', '13:12:51'),
(87, '9154677374', '8', '2014/02/07', '13:13:08'),
(88, '9154677374', '10', '2014/02/07', '13:16:16'),
(89, '9154677374', '11', '2014/02/07', '13:22:57'),
(90, '9154677374', '14', '2014/02/07', '13:23:53'),
(91, '9154677374', '15', '2014/02/07', '13:24:16'),
(92, '9154677374', '16', '2014/02/07', '13:25:29'),
(93, '9154677374', '15', '2014/02/07', '13:29:22'),
(94, '9154677374', '16', '2014/02/07', '13:39:26'),
(95, '9154677374', '17', '2014/02/07', '13:40:39'),
(96, '9154677374', '19', '2014/02/07', '13:43:57'),
(97, '9154677374', '18', '2014/02/07', '13:45:00'),
(98, '9154677374', '19', '2014/02/07', '13:45:23'),
(99, '9154677374', '18', '2014/02/07', '13:46:08'),
(100, '9154677374', '19', '2014/02/07', '13:46:52'),
(101, '9154677374', '18', '2014/02/07', '13:47:28'),
(102, '9154677374', '19', '2014/02/07', '13:48:57'),
(103, '9154677374', '18', '2014/02/07', '13:49:20');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
