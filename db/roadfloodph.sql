-- phpMyAdmin SQL Dump
-- version 4.1.0
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 17, 2013 at 08:40 AM
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
  `unitId` varchar(10) NOT NULL,
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
  `unitWaterLevel` int(10) NOT NULL,
  `unitDateAsOf` varchar(20) NOT NULL,
  `unitTimeAsOf` varchar(20) NOT NULL,
  PRIMARY KEY (`unitLevelId`),
  KEY `unitId` (`unitId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `unitlist`
--

CREATE TABLE IF NOT EXISTS `unitlist` (
  `unitId` varchar(10) NOT NULL,
  `dateAdded` varchar(20) NOT NULL,
  `timeAdded` varchar(20) NOT NULL,
  `ownerId` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `unitlist`
--

INSERT INTO `unitlist` (`unitId`, `dateAdded`, `timeAdded`, `ownerId`) VALUES
('RF100C1218', '2013-10-30', '8:04 AM', 0),
('RF911B0309', '2013-10-30', '12:44 PM', 0);

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
  `unitId` varchar(10) NOT NULL,
  `unitSimNumber` varchar(20) NOT NULL,
  `unitViewing` varchar(20) NOT NULL,
  `unitRegion` varchar(20) NOT NULL,
  `unitName` varchar(100) NOT NULL,
  `unitStatus` varchar(20) NOT NULL,
  `ownerId` int(10) NOT NULL,
  `dateAdded` varchar(20) NOT NULL,
  `timeAdded` varchar(20) NOT NULL,
  `accessToken` varchar(100) NOT NULL,
  PRIMARY KEY (`unitId`),
  KEY `ownerId` (`ownerId`),
  KEY `unitSimNumber` (`unitSimNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `unitregistration`
--

INSERT INTO `unitregistration` (`unitId`, `unitSimNumber`, `unitViewing`, `unitRegion`, `unitName`, `unitStatus`, `ownerId`, `dateAdded`, `timeAdded`, `accessToken`) VALUES
('RF100C1218', '+639275628107', 'public', 'ncr', 'Pureza, Sta. Mesa, Manila', 'activated', 1, '2013/12/15', '21:14:11 PM', '');

-- --------------------------------------------------------

--
-- Table structure for table `unitsmsupdatelogs`
--

CREATE TABLE IF NOT EXISTS `unitsmsupdatelogs` (
  `updateLogId` int(10) NOT NULL AUTO_INCREMENT,
  `unitSimNumber` varchar(20) NOT NULL,
  `reportedFloodLevel` int(10) NOT NULL,
  `receivedDate` varchar(20) NOT NULL,
  `receivedTime` varchar(20) NOT NULL,
  PRIMARY KEY (`updateLogId`),
  KEY `unitSimNumber` (`unitSimNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
