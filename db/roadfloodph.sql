-- phpMyAdmin SQL Dump
-- version 4.1.0
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 30, 2013 at 10:51 PM
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
(1, '10', '2013/12/29', '21:29:54'),
(2, '15', '2013/11/10', '21:31:46'),
(3, '45', '2013/12/18', '21:35:35');

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
('RF100C1218', '2013/01/25', '21:29:54', 1, 1),
('RF521B1612', '2013/11/10', '21:35:35', 1, 3),
('RF911B0309', '2013/10/30', '21:31:46', 1, 2);

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
  `unitSmsCode` varchar(10) NOT NULL,
  `unitSmsNotif` varchar(11) NOT NULL,
  PRIMARY KEY (`unitId`),
  KEY `ownerId` (`ownerId`),
  KEY `unitSimNumber` (`unitSimNumber`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `unitregistration`
--

INSERT INTO `unitregistration` (`unitId`, `unitSimNumber`, `unitViewing`, `unitRegion`, `unitName`, `unitStatus`, `frequency`, `ownerId`, `dateAdded`, `timeAdded`, `accessToken`, `unitSmsCode`, `unitSmsNotif`) VALUES
(1, '9275628107', 'public', 'ncr', 'Pureza, Sta. Mesa, Manila', 'not activated', '2.0', 1, '2013/01/25', '21:29:54', '', 'PUREZA', 'activated'),
(2, '9396694144', 'public', 'ncr', 'Don Antonio, Brgy. Holy Spirit, QC', 'not activated', '2.0', 1, '2013/10/30', '21:31:46', '', 'ANTONIO', 'activated'),
(3, '9266821823', 'public', 'ncr', 'Guadalupe, Makati', 'not activated', '2.0', 1, '2013/11/10', '21:35:35', '', 'GUADALUPE', 'activated');

-- --------------------------------------------------------

--
-- Table structure for table `unitsmstemplogs`
--

CREATE TABLE IF NOT EXISTS `unitsmstemplogs` (
  `tempLogId` int(10) NOT NULL AUTO_INCREMENT,
  `unitSimNumber` varchar(20) NOT NULL,
  `reportedFloodLevel` varchar(10) NOT NULL,
  `receivedDate` varchar(20) NOT NULL,
  `receivedTime` varchar(20) NOT NULL,
  PRIMARY KEY (`tempLogId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=61 ;

--
-- Dumping data for table `unitsmsupdatelogs`
--

INSERT INTO `unitsmsupdatelogs` (`updateLogId`, `unitSimNumber`, `reportedFloodLevel`, `receivedDate`, `receivedTime`) VALUES
(1, '9275628107', '0.5', '2013/02/23', '00:00:38'),
(2, '9275628107', '1.0', '2013/02/23', '00:05:39'),
(3, '9275628107', '1.5', '2013/02/23', '00:11:50'),
(4, '9275628107', '1.0', '2013/02/23', '00:18:26'),
(5, '9275628107', '15', '2013/02/23', '01:21:30'),
(6, '9275628107', '2.0', '2013/02/23', '05:05:10'),
(7, '9275628107', '2.5', '2013/02/23', '07:15:16'),
(8, '9275628107', '3.0', '2013/07/23', '07:20:30'),
(9, '9275628107', '3.5', '2013/07/24', '07:46:01'),
(10, '9275628107', '4.0', '2013/11/23', '00:00:01'),
(11, '9275628107', '4.5', '2013/11/23', '14:45:46'),
(12, '9275628107', '5.0', '2013/11/23', '15:15:46'),
(13, '9275628107', '15.5', '2013/11/23', '17:30:12'),
(14, '9275628107', '6.0', '2013/11/23', '19:03:21'),
(15, '9275628107', '6.5', '2013/11/23', '20:41:04'),
(16, '9275628107', '7.0', '2013/11/25', '21:24:45'),
(17, '9275628107', '7.5', '2013/11/25', '22:30:12'),
(18, '9275628107', '8.0', '2013/11/25', '23:18:12'),
(19, '9275628107', '19.5', '2013/11/26', '01:30:36'),
(20, '9275628107', '21.0', '2013/12/27', '03:01:10'),
(21, '9275628107', '9.5', '2013/12/27', '04:48:36'),
(22, '9275628107', '10', '2013/12/27', '05:30:12'),
(23, '9275628107', '10.5', '2013/12/27', '08:48:51'),
(24, '9275628107', '11', '2013/12/27', '09:10:22'),
(25, '9275628107', '21.5', '2013/12/27', '11:12:32'),
(26, '9275628107', '12', '2013/12/27', '12:31:06'),
(27, '9275628107', '12.5', '2013/12/27', '14:15:16'),
(28, '9275628107', '13', '2013/12/27', '15:52:36'),
(29, '9275628107', '13.5', '2013/12/27', '16:21:42'),
(30, '9275628107', '14', '2013/12/28', '17:01:32'),
(31, '9275628107', '14.5', '2013/12/28', '17:37:16'),
(32, '9275628107', '12', '2013/12/28', '18:00:45'),
(33, '9275628107', '10', '2013/12/28', '20:01:02'),
(34, '9275628107', '8', '2013/12/28', '20:05:01'),
(35, '9275628107', '6', '2013/12/28', '20:15:14'),
(36, '9275628107', '14', '2013/12/28', '20:25:32'),
(37, '9275628107', '2', '2013/12/28', '20:56:53'),
(38, '9275628107', '0', '2013/12/28', '01:28:22'),
(39, '9275628107', '2', '2013/12/28', '09:07:39'),
(40, '9275628107', '14', '2013/12/28', '13:49:02'),
(41, '9275628107', '2', '2013/12/28', '17:15:41'),
(42, '9275628107', '1.5', '2013/12/28', '19:42:10'),
(43, '9275628107', '15', '2013/12/28', '20:20:15'),
(44, '9275628107', '10', '2013/12/28', '21:20:15'),
(45, '9275628107', '21', '2013/12/29', '01:03:10'),
(46, '9275628107', '14', '2013/12/29', '02:03:10'),
(47, '9275628107', '18', '2013/12/29', '03:03:10'),
(48, '9275628107', '3', '2013/12/29', '04:03:10'),
(49, '9275628107', '21', '2013/12/29', '05:03:10'),
(50, '9275628107', '14', '2013/12/29', '06:03:10'),
(51, '9275628107', '10', '2013/12/29', '07:03:10'),
(52, '9275628107', '4', '2013/12/29', '08:03:10'),
(53, '9275628107', '21', '2013/12/29', '09:03:10'),
(54, '9275628107', '14', '2013/12/29', '10:03:10'),
(55, '9275628107', '30', '2013/12/29', '11:03:10'),
(56, '9275628107', '32', '2013/12/29', '12:03:10'),
(57, '9275628107', '40', '2013/12/29', '13:01:01'),
(58, '9275628107', '20', '2013/12/29', '14:01:01'),
(59, '9275628107', '10', '2013/12/29', '15:01:01'),
(60, '9396694144', '10', '2013/12/30', '21:11:10');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
