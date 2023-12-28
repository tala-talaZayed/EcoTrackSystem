-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 28, 2023 at 09:01 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 7.4.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecotracksystem`
--

-- --------------------------------------------------------

--
-- Table structure for table `ecodata`
--

CREATE TABLE `ecodata` (
  `DataId` int(11) NOT NULL,
  `DataGroup` varchar(45) NOT NULL,
  `DataName` varchar(45) NOT NULL,
  `SensorId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ecodata`
--

INSERT INTO `ecodata` (`DataId`, `DataGroup`, `DataName`, `SensorId`) VALUES
(1000, 'Air Quality', 'Air carbon dioxide level', 8),
(1001, 'Air Quality', 'Air pressure', 4),
(1002, 'Wind Information', 'Wind Speed', 1),
(1003, 'Light  Quality', 'Light  intensity', 2),
(1004, 'Water Quality', 'Water PH', 3),
(1005, 'Temperature ', 'Temperature', 5),
(1006, 'Water Quality', 'Water Conductivity', 6),
(1007, 'Light  Quality', 'Visible Light luminosity', 7),
(1008, 'Soil Quality', 'Soil Phosphorus Levels', 9),
(1009, 'Soil Quality', 'Soil Nutrient levels ', 11),
(1010, 'Noise Levels', 'Noise level', 10),
(1011, 'Wind Information', 'wind direction', 1),
(1012, 'lool', 'iiii', 2),
(1013, 'Wind Information', 'wind direction', 1);

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `id` int(11) NOT NULL,
  `Title` varchar(100) NOT NULL,
  `Description` varchar(2000) NOT NULL,
  `Location` varchar(100) NOT NULL,
  `UserId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `reports`
--

INSERT INTO `reports` (`id`, `Title`, `Description`, `Location`, `UserId`) VALUES
(6, 'pollution', 'A larg amount of waste', 'kiuodm', 10);

-- --------------------------------------------------------

--
-- Table structure for table `sample`
--

CREATE TABLE `sample` (
  `SampleId` int(11) NOT NULL,
  `UserId` int(11) NOT NULL,
  `DataId` int(11) NOT NULL,
  `Value` int(11) NOT NULL,
  `SampleTime` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Soruce` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sample`
--

INSERT INTO `sample` (`SampleId`, `UserId`, `DataId`, `Value`, `SampleTime`, `Soruce`) VALUES
(101, 5, 1005, 25, '2023-11-20 21:25:36', 'Sensor'),
(102, 7, 1008, 500, '2023-11-20 21:25:37', 'Sensor'),
(103, 3, 1010, 70, '2023-11-20 21:25:37', 'Sensor'),
(104, 2, 1005, 20, '2023-11-20 21:25:37', 'Manual Observations'),
(105, 6, 1000, 52, '2023-11-20 21:25:37', 'Data Uploads');

-- --------------------------------------------------------

--
-- Table structure for table `sensor`
--

CREATE TABLE `sensor` (
  `SensorId` int(11) NOT NULL,
  `SensorName` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sensor`
--

INSERT INTO `sensor` (`SensorId`, `SensorName`) VALUES
(1, 'Wind Sensor'),
(2, 'Light  intensity Sensor'),
(3, 'Water PH Sensor'),
(4, 'Air pressure Sensor'),
(5, 'Temperature sensor'),
(6, 'Water Conductivity Sensor'),
(7, 'Visible Light luminosity Sensor'),
(8, 'Air carbon dioxide sensor'),
(9, 'Soil Phosphorus Levels Sensor'),
(10, 'Noise level Sensor'),
(11, 'Soil Nutrient levels  Sensor');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `UserId` int(11) NOT NULL,
  `UserName` varchar(50) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Password` varchar(50) NOT NULL,
  `mobile` varchar(15) NOT NULL,
  `Location` varchar(50) NOT NULL,
  `Socre` int(11) NOT NULL DEFAULT 0,
  `IsAdmin` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`UserId`, `UserName`, `Email`, `Password`, `mobile`, `Location`, `Socre`, `IsAdmin`) VALUES
(1, 'ayla', 'ayla@mail.com', '$2b$10$nx7gFYLB5z0R1SG0u12ZX.Pxo82woeIalnxCFuhO2sM', '5465675577523', 'Nablus-15street', 0, 0),
(2, 'ehab', 'oooo@mail.com', '$2b$10$/nXMqaqmu4fCnrQKQf4l9.rEMiEv.XbsQQUKLeuSOz9', '0598388232', 'Rammallah-ersalstreet', 1, 0),
(3, 'ehab', 'ehab@mail.com', '$2b$10$Qs5Wr5aCBcP/Q8lMcAIhyODiDvImLBSES4Ig7Y/ZM/i', '0598388232', ' j ', 1, 0),
(4, 'yara', 'yaraaa@mail.com', '$2b$10$Coi5yGHxJ0erf9SjvIHdw.v0dhy01mZytfeKWzKASxr', '0593277823', 'Hebron', 0, 0),
(5, 'yazana', 'yazan@mail.com', '$2b$10$vYDZpFdoERFJvEz//7EyWeJWXogxAQ66XScXdpUIhGy', '0593277823', 'Jeruselem', 1, 0),
(6, 'yazana', 'yaan@mail.com', '$2b$10$Oj1/xpa0eIVIyrcMvbyOhuXtBDtDSW2yPAbT.sixQ5Y', '0593277823', 'Lebanon', 1, 0),
(7, 'Mayssa', 'Maysa@mail.com', '$2b$10$lrMI53puUFuZdGP2YOUE/.o4pDr4P2jvghQ6x73hD.P', '0593277823', 'Morraco', 1, 0),
(8, 'Mayssa', 'Mays223@mail.com', '$2b$10$tqHj7lRKRX.yUgp66EHzkOmGcJP20prlts.woXcD7DX', '0593277823', 'Gaza', 0, 0),
(10, 'MayssaZay', 'Maysa123456@mail.com', '$2b$10$3dj3tdVq7kKasS9c2Bbp2OMPbKgPLLimTk/TFp6S4vw', '0593277823', 'Nablus', 0, 1),
(11342, 'zaherZay', 'zaher@mail.com', '$2b$10$zC5DnxwZ1P1Rzp7wudPT0eYVnMMxHXYgpf7iFkUW0Vz', '0593277823', 'Nablus', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `user_data`
--

CREATE TABLE `user_data` (
  `UserId` int(11) NOT NULL,
  `DataId` int(11) NOT NULL,
  `Threshold` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_data`
--

INSERT INTO `user_data` (`UserId`, `DataId`, `Threshold`) VALUES
(1, 1000, 50),
(1, 1001, 70),
(1, 1005, 90),
(2, 1005, 25),
(3, 1010, 20),
(4, 1004, 100),
(4, 1005, 27),
(5, 1004, 150),
(5, 1005, 19),
(6, 1000, 50),
(6, 1005, 26),
(7, 1008, 1000),
(7, 1009, 1050),
(8, 1004, 100),
(8, 1006, 150),
(8, 1010, 20),
(10, 1000, 60),
(11342, 1006, 100);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ecodata`
--
ALTER TABLE `ecodata`
  ADD PRIMARY KEY (`DataId`),
  ADD KEY `SensorIdinEcoData_idx` (`SensorId`);

--
-- Indexes for table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userID` (`UserId`);

--
-- Indexes for table `sample`
--
ALTER TABLE `sample`
  ADD PRIMARY KEY (`SampleId`),
  ADD KEY `UserId_idx` (`UserId`,`DataId`);

--
-- Indexes for table `sensor`
--
ALTER TABLE `sensor`
  ADD PRIMARY KEY (`SensorId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`UserId`);

--
-- Indexes for table `user_data`
--
ALTER TABLE `user_data`
  ADD PRIMARY KEY (`UserId`,`DataId`),
  ADD KEY `DataIdInUserData_idx` (`DataId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ecodata`
--
ALTER TABLE `ecodata`
  MODIFY `DataId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1014;

--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `sample`
--
ALTER TABLE `sample`
  MODIFY `SampleId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=106;

--
-- AUTO_INCREMENT for table `sensor`
--
ALTER TABLE `sensor`
  MODIFY `SensorId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ecodata`
--
ALTER TABLE `ecodata`
  ADD CONSTRAINT `SensorIdinEcoData` FOREIGN KEY (`SensorId`) REFERENCES `sensor` (`SensorId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `reports`
--
ALTER TABLE `reports`
  ADD CONSTRAINT `userID` FOREIGN KEY (`UserId`) REFERENCES `user` (`UserId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `sample`
--
ALTER TABLE `sample`
  ADD CONSTRAINT `userData` FOREIGN KEY (`UserId`,`DataId`) REFERENCES `user_data` (`UserId`, `DataId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_data`
--
ALTER TABLE `user_data`
  ADD CONSTRAINT `DataIdInUserData` FOREIGN KEY (`DataId`) REFERENCES `ecodata` (`DataId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `UserIdInUserData` FOREIGN KEY (`UserId`) REFERENCES `user` (`UserId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
