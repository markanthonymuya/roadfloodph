-- phpMyAdmin SQL Dump
-- version 4.1.0
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jan 06, 2014 at 09:26 AM
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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`adminId`, `adminName`, `adminEmail`, `adminContact`, `adminPassword`, `dateAdded`, `timeAdded`) VALUES
(1, 'Mark Anthony Muya', 'markmuya@outlook.com', '9275628107', '95e7f080d93915662d9a2f486417e2ae', '2014/01/05', '07:57:01'),
(2, 'Johnver Bautista', 'johnverbautista00@hotmail.com', '9126959610', 'c67bda85a582c83d66bcc135e4920292', '2014/01/05', '12:51:42'),
(3, 'Katrina Hazel Malagday', 'katyabu@gmail.com', '9276658721', 'd41d8cd98f00b204e9800998ecf8427e', '2014/01/05', '13:24:30'),
(4, 'Kim Carla Lleno', 'kimlleno@yahoo.com', '9498829188', 'd41d8cd98f00b204e9800998ecf8427e', '2014/01/05', '13:29:12');

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
(1, 'm61UThl6s0PimODh7HcGHxzcjC3TF9H1uo0qA77sI_k', '9275628107', 1, '0.00', 'active', '2013-10-30', '9:34 AM');

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
(1, '6', '2014/01/04', '07:43:25'),
(2, '15', '2014/01/02', '15:34:42');

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
('RF521B1612', '', '', 0, 0),
('RF911B0309', '2014/01/02', '15:34:42', 1, 2);

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
-- Table structure for table `unitpowermonitoring`
--

CREATE TABLE IF NOT EXISTS `unitpowermonitoring` (
  `unitId` int(10) NOT NULL AUTO_INCREMENT,
  `unitPowerLevel` varchar(10) NOT NULL,
  `unitDateAsOf` varchar(20) NOT NULL,
  `unitTimeAsOf` varchar(20) NOT NULL,
  PRIMARY KEY (`unitId`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `unitpowermonitoring`
--

INSERT INTO `unitpowermonitoring` (`unitId`, `unitPowerLevel`, `unitDateAsOf`, `unitTimeAsOf`) VALUES
(1, '95', '2014/01/02', '03:23:01'),
(2, '100', '2014/01/02', '15:34:42');

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `unitregistration`
--

INSERT INTO `unitregistration` (`unitId`, `unitSimNumber`, `unitViewing`, `unitRegion`, `unitName`, `unitStatus`, `frequency`, `ownerId`, `dateAdded`, `timeAdded`, `accessToken`, `unitSmsCode`, `unitSmsNotif`) VALUES
(1, '9154677374', 'public', 'ncr', 'Pureza, Sta. Mesa, Manila', 'ACTIVATED', '2.0', 1, '2014/01/02', '15:30:20', 'bt6ctvXl1NF3-YLHa6TlBztIqHAYtDU_2Yv-UrWnXg4', 'PUREZA', 'activated'),
(2, '9166058053', 'public', 'ncr', 'Don Antonio, Holy Spirit, QC', 'unknown', '2.0', 1, '2014/01/02', '15:34:42', '', 'ANTONIO', 'activated');

-- --------------------------------------------------------

--
-- Table structure for table `unitsmspowerupdatelogs`
--

CREATE TABLE IF NOT EXISTS `unitsmspowerupdatelogs` (
  `updateLogId` int(10) NOT NULL AUTO_INCREMENT,
  `unitSimNumber` varchar(20) NOT NULL,
  `reportedPowerLevel` varchar(10) NOT NULL,
  `receivedDate` varchar(20) NOT NULL,
  `receivedTime` varchar(20) NOT NULL,
  PRIMARY KEY (`updateLogId`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `unitsmspowerupdatelogs`
--

INSERT INTO `unitsmspowerupdatelogs` (`updateLogId`, `unitSimNumber`, `reportedPowerLevel`, `receivedDate`, `receivedTime`) VALUES
(1, '9154677374', '100', '2014/01/04', '06:37:11'),
(2, '9154677374', '95', '2014/01/04', '06:44:30'),
(3, '9154677374', '90', '2014/01/04', '06:48:30'),
(4, '9154677374', '90', '2014/01/04', '06:44:30'),
(5, '9154677374', '90', '2014/01/04', '06:55:10');

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `unitsmstemplogs`
--

INSERT INTO `unitsmstemplogs` (`tempLogId`, `unitSimNumber`, `smsRequest`, `receivedDate`, `receivedTime`) VALUES
(1, '9154677374', 'FLUPDATE 9', '2014/01/04', '07:19:39'),
(2, '9154677374', 'FLUPDATE 6', '2014/01/04', '07:26:38'),
(3, '9154677374', 'PWUPDATE 6', '2014/01/04', '07:28:10'),
(4, '9154677374', 'FLUPDATE 6', '2014/01/04', '07:31:16'),
(5, '9154677374', 'FLUPDATE 9', '2014/01/04', '07:38:32'),
(6, '9154677374', 'FLUPDATE 6', '2014/01/04', '07:42:50');

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=66 ;

--
-- Dumping data for table `unitsmsupdatelogs`
--

INSERT INTO `unitsmsupdatelogs` (`updateLogId`, `unitSimNumber`, `reportedFloodLevel`, `receivedDate`, `receivedTime`) VALUES
(1, '9154677374', '0.5', '2013/02/23', '00:00:38'),
(2, '9154677374', '1.0', '2013/02/23', '00:05:39'),
(3, '9154677374', '1.5', '2013/02/23', '00:11:50'),
(4, '9154677374', '1.0', '2013/02/23', '00:18:26'),
(5, '9154677374', '15', '2013/02/23', '01:21:30'),
(6, '9154677374', '2.0', '2013/02/23', '05:05:10'),
(7, '9154677374', '2.5', '2013/02/23', '07:15:16'),
(8, '9154677374', '3.0', '2013/07/23', '07:20:30'),
(9, '9154677374', '3.5', '2013/07/24', '07:46:01'),
(10, '9154677374', '4.0', '2013/11/23', '00:00:01'),
(11, '9154677374', '4.5', '2013/11/23', '14:45:46'),
(12, '9154677374', '5.0', '2013/11/23', '15:15:46'),
(13, '9154677374', '15.5', '2013/11/23', '17:30:12'),
(14, '9154677374', '6.0', '2013/11/23', '19:03:21'),
(15, '9154677374', '6.5', '2013/11/23', '20:41:04'),
(16, '9154677374', '7.0', '2013/11/25', '21:24:45'),
(17, '9154677374', '7.5', '2013/11/25', '22:30:12'),
(18, '9154677374', '8.0', '2013/11/25', '23:18:12'),
(19, '9154677374', '19.5', '2013/11/26', '01:30:36'),
(20, '9154677374', '21.0', '2013/12/27', '03:01:10'),
(21, '9154677374', '9.5', '2013/12/27', '04:48:36'),
(22, '9154677374', '10', '2013/12/27', '05:30:12'),
(23, '9154677374', '10.5', '2013/12/27', '08:48:51'),
(24, '9154677374', '11', '2013/12/27', '09:10:22'),
(25, '9154677374', '21.5', '2013/12/27', '11:12:32'),
(26, '9154677374', '12', '2013/12/27', '12:31:06'),
(27, '9154677374', '12.5', '2013/12/27', '14:15:16'),
(28, '9154677374', '13', '2013/12/27', '15:52:36'),
(29, '9154677374', '13.5', '2013/12/27', '16:21:42'),
(30, '9154677374', '14', '2013/12/28', '17:01:32'),
(31, '9154677374', '14.5', '2013/12/28', '17:37:16'),
(32, '9154677374', '12', '2013/12/28', '18:00:45'),
(33, '9154677374', '10', '2013/12/28', '20:01:02'),
(34, '9154677374', '8', '2013/12/28', '20:05:01'),
(35, '9154677374', '6', '2013/12/28', '20:15:14'),
(36, '9154677374', '14', '2013/12/28', '20:25:32'),
(37, '9154677374', '2', '2013/12/28', '20:56:53'),
(38, '9154677374', '0', '2013/12/28', '01:28:22'),
(39, '9154677374', '2', '2013/12/28', '09:07:39'),
(40, '9154677374', '14', '2013/12/28', '13:49:02'),
(41, '9154677374', '2', '2013/12/28', '17:15:41'),
(42, '9154677374', '1.5', '2013/12/28', '19:42:10'),
(43, '9154677374', '15', '2013/12/28', '20:20:15'),
(44, '9154677374', '10', '2013/12/28', '21:20:15'),
(45, '9154677374', '21', '2013/12/29', '01:03:10'),
(46, '9154677374', '14', '2013/12/29', '02:03:10'),
(47, '9154677374', '18', '2013/12/29', '03:03:10'),
(48, '9154677374', '3', '2013/12/29', '04:03:10'),
(49, '9154677374', '21', '2013/12/29', '05:03:10'),
(50, '9154677374', '14', '2013/12/29', '06:03:10'),
(51, '9154677374', '10', '2013/12/29', '07:03:10'),
(52, '9154677374', '4', '2013/12/29', '08:03:10'),
(53, '9154677374', '21', '2013/12/29', '09:03:10'),
(54, '9154677374', '14', '2013/12/29', '10:03:10'),
(55, '9154677374', '30', '2013/12/29', '11:03:10'),
(56, '9154677374', '32', '2013/12/29', '12:03:10'),
(57, '9154677374', '40', '2013/12/29', '13:01:01'),
(58, '9154677374', '20', '2013/12/29', '14:01:01'),
(59, '9154677374', '10', '2013/12/29', '15:01:01'),
(60, '9396694144', '10', '2013/12/30', '21:11:10'),
(61, '9154677374', '5', '2014/01/01', '13:06:46'),
(62, '9154677374', '9', '2014/01/04', '07:22:52'),
(63, '9154677374', '6', '2014/01/04', '07:31:44'),
(64, '9154677374', '9', '2014/01/04', '07:38:45'),
(65, '9154677374', '6', '2014/01/04', '07:43:25');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
