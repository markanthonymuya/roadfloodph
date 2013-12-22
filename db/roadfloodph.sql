-- phpMyAdmin SQL Dump
-- version 4.1.0
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 22, 2013 at 10:00 AM
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
  `adminPassword` varchar(20) NOT NULL,
  `dateAdded` varchar(20) NOT NULL,
  `timeAdded` varchar(20) NOT NULL,
  PRIMARY KEY (`adminId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

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
(1, 'PPjDVj97zKSdke9sHXdrxzQu84Y1sqNyY9U8MeMWBZA', '9275628107', 1, '0.00', 'active', '2013-10-30', '9:34 AM');

-- --------------------------------------------------------

--
-- Table structure for table `subscription`
--

CREATE TABLE IF NOT EXISTS `subscription` (
  `subscriptionId` int(10) NOT NULL AUTO_INCREMENT,
  `subscriberContact` varchar(20) NOT NULL,
  `unitId` int(10) NOT NULL,
  `subscriptionType` varchar(20) NOT NULL,
  `subscriptionStatus` varchar(20) NOT NULL,
  `subscriptionDate` varchar(20) NOT NULL,
  `subscriptionTime` varchar(20) NOT NULL,
  PRIMARY KEY (`subscriptionId`),
  KEY `subscriberContact` (`subscriberContact`),
  KEY `unitId` (`unitId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

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
  `unitLevelId` varchar(10) NOT NULL,
  `unitId` int(10) NOT NULL,
  `unitWaterLevel` varchar(10) NOT NULL,
  `unitDateAsOf` varchar(20) NOT NULL,
  `unitTimeAsOf` varchar(20) NOT NULL,
  PRIMARY KEY (`unitLevelId`),
  KEY `unitId` (`unitId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `unitleveldetection`
--

INSERT INTO `unitleveldetection` (`unitLevelId`, `unitId`, `unitWaterLevel`, `unitDateAsOf`, `unitTimeAsOf`) VALUES
('', 1, '7', '2013/12/17', '12:55:19');

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
('RF100C1218', '2013/12/10', '13:04:35', 1, 1),
('RF521B1612', '', '', 0, 0),
('RF911B0309', '', '', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `unitowner`
--

CREATE TABLE IF NOT EXISTS `unitowner` (
  `ownerId` int(10) NOT NULL AUTO_INCREMENT,
  `ownerName` varchar(100) NOT NULL,
  `ownerEmail` varchar(100) NOT NULL,
  `ownerContact` varchar(20) NOT NULL,
  `ownerPasswor` varchar(20) NOT NULL,
  `dateAdded` varchar(20) NOT NULL,
  `timeAdded` varchar(20) NOT NULL,
  PRIMARY KEY (`ownerId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

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
  PRIMARY KEY (`unitId`),
  KEY `ownerId` (`ownerId`),
  KEY `unitSimNumber` (`unitSimNumber`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=920302 ;

--
-- Dumping data for table `unitregistration`
--

INSERT INTO `unitregistration` (`unitId`, `unitSimNumber`, `unitViewing`, `unitRegion`, `unitName`, `unitStatus`, `frequency`, `ownerId`, `dateAdded`, `timeAdded`, `accessToken`) VALUES
(1, '+639275628107', 'public', 'ncr', 'Pureza, Sta. Mesa, Manila', 'activated', '0.5', 1, '2013/12/15', '21:14:11', '2930jskjdh1'),
(920301, '91828391983', 'public', 'ncr', 'Hipodromo, Sta. Mesa, Manila', 'activated', '1', 1, '2013/12/21', '18:09:05', '');

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=43 ;

--
-- Dumping data for table `unitsmsupdatelogs`
--

INSERT INTO `unitsmsupdatelogs` (`updateLogId`, `unitSimNumber`, `reportedFloodLevel`, `receivedDate`, `receivedTime`) VALUES
(1, '9275628107', '0.5', '2013/01/15', '22:50:38'),
(2, '9275628107', '1.0', '2013/01/16', '02:05:39'),
(3, '9275628107', '1.5', '2013/01/16', '08:31:50'),
(4, '9275628107', '1.0', '2013/01/16', '19:28:26'),
(5, '9275628107', '1.5', '2013/01/17', '01:21:30'),
(6, '9275628107', '2.0', '2013/01/17', '05:05:10'),
(7, '9275628107', '2.5', '2013/01/17', '07:25:16'),
(8, '9275628107', '3.0', '2013/01/17', '09:20:30'),
(9, '9275628107', '3.5', '2013/01/17', '11:46:01'),
(10, '9275628107', '4.0', '2013/01/17', '12:55:19'),
(11, '9275628107', '4.5', '2013/01/17', '13:45:46'),
(12, '9275628107', '5.0', '2013/01/17', '04:15:46'),
(13, '9275628107', '5.5', '2013/01/17', '05:30:12'),
(14, '9275628107', '6.0', '2013/01/17', '06:03:21'),
(15, '9275628107', '6.5', '2013/01/17', '06:41:04'),
(16, '9275628107', '7.0', '2013/01/17', '07:24:45'),
(17, '9275628107', '7.5', '2013/01/17', '14:30:12'),
(18, '9275628107', '8.0', '2013/01/17', '15:18:12'),
(19, '9275628107', '8.5', '2013/01/18', '01:30:36'),
(20, '9275628107', '9.0', '2013/01/18', '03:01:10'),
(21, '9275628107', '9.5', '2013/01/18', '04:48:36'),
(22, '9275628107', '10', '2013/01/18', '05:30:12'),
(23, '9275628107', '10.5', '2013/01/18', '08:48:51'),
(24, '9275628107', '11', '2013/01/18', '09:10:22'),
(25, '9275628107', '11.5', '2013/01/18', '11:12:32'),
(26, '9275628107', '12', '2013/01/18', '12:31:06'),
(27, '9275628107', '12.5', '2013/01/18', '14:15:16'),
(28, '9275628107', '13', '2013/01/18', '15:52:36'),
(29, '9275628107', '13.5', '2013/01/18', '16:21:42'),
(30, '9275628107', '14', '2013/01/18', '17:01:32'),
(31, '9275628107', '14.5', '2013/01/18', '17:37:16'),
(32, '9275628107', '12', '2013/01/18', '18:00:45'),
(33, '9275628107', '10', '2013/01/18', '19:35:02'),
(34, '9275628107', '8', '2013/01/18', '20:05:01'),
(35, '9275628107', '6', '2013/01/18', '20:45:14'),
(36, '9275628107', '4', '2013/01/18', '21:25:32'),
(37, '9275628107', '2', '2013/01/18', '21:56:53'),
(38, '9275628107', '0', '2013/01/19', '01:28:22'),
(39, '9275628107', '2', '2013/02/02', '09:07:39'),
(40, '9275628107', '4', '2013/02/02', '13:49:02'),
(41, '9275628107', '2', '2013/02/02', '17:15:41'),
(42, '9275628107', '0', '2013/02/02', '19:42:10');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
