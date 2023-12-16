-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 11, 2023 at 05:48 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `animeott`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `UID` int(11) NOT NULL,
  `Username` text NOT NULL,
  `Password` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`UID`, `Username`, `Password`) VALUES
(1, 'max', 123);

-- --------------------------------------------------------

--
-- Table structure for table `anime`
--

CREATE TABLE `anime` (
  `AID` int(11) NOT NULL,
  `Trailer_Link` text NOT NULL,
  `Clip` text NOT NULL,
  `Poster_Image` text NOT NULL,
  `Cover_Image` text NOT NULL,
  `Title` text NOT NULL,
  `Description` text NOT NULL,
  `Lang` text NOT NULL,
  `Episodes` int(11) NOT NULL,
  `Seasons` int(11) NOT NULL,
  `Genre` text NOT NULL,
  `Episode_Length` int(11) NOT NULL,
  `Release_Date` text NOT NULL,
  `IMDB_Rating` float NOT NULL,
  `Status` text NOT NULL,
  `Tags` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `anime`
--

INSERT INTO `anime` (`AID`, `Trailer_Link`, `Clip`, `Poster_Image`, `Cover_Image`, `Title`, `Description`, `Lang`, `Episodes`, `Seasons`, `Genre`, `Episode_Length`, `Release_Date`, `IMDB_Rating`, `Status`, `Tags`) VALUES
(28, '1693465290902.AOT.mp4', '1693465291014.Editor[4].mp4', '1693465290894.jujustuu.jpg', '1693465290897.jjk.jpg', 'Jujutsu Kaisen', 'A boy swallows a cursed talisman - the finger of a demon - and becomes cursed himself. He enters a shaman\'s school to be able to locate the demon\'s other body parts and thus exorcise himself.', 'Dubbed', 12, 1, 'Shounen', 23, '2021-02-12', 8, 'On Going', 'JJk shounen jujutsu kaisen'),
(29, '1693465455071.AOT.mp4', '1693465455165.AOT.mp4', '1693465455063.aot.jpg', '1693465455063.653529.jpg', 'Attack on titan', 'After his hometown is destroyed and his mother is killed, young Eren Jaeger vows to cleanse the earth of the giant humanoid Titans that have brought humanity to the brink of extinction.', 'subbed', 12, 2, 'Shounen', 23, '2017-05-01', 8, 'On Going', 'AOT attack on titan shounen'),
(30, '1693465637377.Editor[4].mp4', '1693465637463.Editor[2].mp4', '1693465637357.Black cover.jpg', '1693465637358.black clover.png', 'Black Clover', 'Asta and Yuno were abandoned together at the same church and have been inseparable since. As children, they promised that they would compete against each other to see who would become the next Emperor Magus', 'Dubbed', 12, 1, 'Shoujo', 23, '2016-02-02', 7, 'Completed', 'Black Clover shounen'),
(31, '1693469079943.Editor[3].mp4', '1693469079979.Editor[7].mp4', '1693469079934.DS_poster.jpg', '1693469079934.DS2.png', 'Demon slayer', 'A family is attacked by demons and only two members survive - Tanjiro and his sister Nezuko, who is turning into a demon slowly. Tanjiro sets out to become a demon slayer to avenge his family and cure his sister.', 'Dubbed', 12, 1, 'Seinen', 23, '2017-04-12', 9, 'Completed', 'DS demon slayer'),
(32, '1693469172788.Editor[6].mp4', '1693469172802.Editor[5].mp4', '1693469172764.narutoshippuden.jpg', '1693469172766.790528.jpg', 'Naruto', 'Naruto Uzumaki, a mischievous adolescent ninja, struggles as he searches for recognition and dreams of becoming the Hokage, the village\'s leader and strongest ninja.', 'Dubbed', 12, 1, 'Shounen', 23, '2018-03-21', 9, 'Completed', 'naruto '),
(33, '1693476049134.AOT.mp4', '1693476049223.Editor[5].mp4', '1693476049129.hunter.jpg', '1693476049130.haikyuu.jpg', 'Hunter x hunter', 'Hunter x Hunter anime is about a boy called Gon going on journey to find his dad.', 'Dubbed', 12, 1, 'Shounen', 23, '2018-02-01', 7, 'Completed', 'abc'),
(35, '1694484356654.One Piece Luffy EyecatcherãWano Kuni Ver.ã.mp4', '1694484356663.Editor[4].mp4', '1694484356648.deathnote.jpg', '1694484356653.death-note.jpg', 'Death note', 'An intelligent high school student goes on a secret crusade to eliminate criminals from the world after discovering a notebook capable of killing anyone whose name is written into it.', 'Dubbed', 12, 1, 'Isekai', 23, '2012-05-24', 8, 'Completed', 'Death note Isekai '),
(36, '1694484799056.Editor[13].mp4', '1694484799126.Editor[13].mp4', '1694484799052.haikyuu.jpg', '1694484799054.haikyuu.jpg', 'Haikyuu', 'Determined to be like the volleyball championship\'s star player nicknamed \"the small giant\", Shoyo joins his school\'s volleyball club.', 'Dubbed', 12, 2, 'Slice of life', 23, '2017-03-12', 8, 'On Going', 'Haikyuu slice of life'),
(37, '1694499078206.anime.mp4', '1694499078230.naruto.mp4', '1694499078190.71AvjRzTf4L.jpg', '1694499078192.933445.jpg', 'abc', 'abbcasjcjas', 'subbed', 12, 1, 'Shounen', 20, '2022-12-01', 5, 'On Going', 'Shounen'),
(38, '1699360823881.anime.mp4', '1699360823917.AOT.mp4', '1699360823877.aot.jpg', '1699360823878.haikyuu.jpg', 'fqwgawty', 'ywgfyuawf', 'Dubbed', 2, 2, 'Shounen', 2, '2023-11-02', 2312, 'On Going', 'wwfaw');

-- --------------------------------------------------------

--
-- Table structure for table `auth`
--

CREATE TABLE `auth` (
  `UID` int(11) NOT NULL,
  `Profile_Img` text NOT NULL,
  `Username` text NOT NULL,
  `Email` text NOT NULL,
  `Mobile` int(11) NOT NULL,
  `Password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `auth`
--

INSERT INTO `auth` (`UID`, `Profile_Img`, `Username`, `Email`, `Mobile`, `Password`) VALUES
(2, 'none', 'jack', 'jack@gmail.com', 0, '123'),
(6, 'none', 'max', 'mx1@gmail.com', 0, '123'),
(10, '1693460200346.851512.png', 'max', 'max@gmail.com', 0, '123'),
(13, 'none', 'pavan', 'pavanprabhakar1303@gmail.com', 1234567890, 'Secret99*');

-- --------------------------------------------------------

--
-- Table structure for table `billing`
--

CREATE TABLE `billing` (
  `BID` int(11) NOT NULL,
  `UID` int(11) NOT NULL,
  `Plan` text NOT NULL,
  `Payment_date` text NOT NULL,
  `Price` int(11) NOT NULL,
  `Expiry_date` text NOT NULL,
  `Users` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `billing`
--

INSERT INTO `billing` (`BID`, `UID`, `Plan`, `Payment_date`, `Price`, `Expiry_date`, `Users`) VALUES
(73, 2, 'Basic Plan', '2023-8-16', 200, '2023-8-28', 0),
(89, 13, 'Basic Plan', '2023-9-12', 200, '2023-12-12', 0);

-- --------------------------------------------------------

--
-- Table structure for table `chats`
--

CREATE TABLE `chats` (
  `CID` int(11) NOT NULL,
  `UID` int(11) NOT NULL,
  `Chat` text NOT NULL,
  `Date` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `chats`
--

INSERT INTO `chats` (`CID`, `UID`, `Chat`, `Date`) VALUES
(1, 2, 'hello', '2023-08-22T12:57:11.850Z'),
(4, 2, 'yo', '2023-08-22T13:31:57.182Z'),
(6, 2, 'hello', '2023-08-22T13:32:14.461Z'),
(9, 2, 'hunter x hunter', '2023-08-22T13:35:46.222Z'),
(10, 2, 'suggest some anime', '2023-08-22T13:37:47.983Z'),
(15, 2, 'hello', '2023-08-23T13:02:50.808Z'),
(18, 2, 'yoyoyoy', '2023-08-23T13:10:33.461Z'),
(19, 2, 'hello', '2023-08-23T13:11:49.121Z'),
(22, 2, 'hello', '2023-08-31T05:23:31.430Z'),
(23, 10, 'hey', '2023-08-31T05:23:47.572Z'),
(24, 10, 'hi!', '2023-08-31T05:24:28.561Z'),
(25, 2, 'hello!', '2023-08-31T05:24:34.034Z'),
(26, 10, 'abc', '2023-08-31T05:37:04.677Z'),
(27, 2, 'hello!!!!', '2023-08-31T07:51:00.973Z'),
(29, 2, 'wygdaygd', '2023-08-31T09:58:31.297Z'),
(30, 13, 'ghwdafdtyafwf', '2023-08-31T09:58:44.091Z'),
(35, 13, 'hi', '2023-09-12T04:12:35.460Z');

-- --------------------------------------------------------

--
-- Table structure for table `continuewatching`
--

CREATE TABLE `continuewatching` (
  `CID` int(11) NOT NULL,
  `AID` int(11) NOT NULL,
  `UID` int(11) NOT NULL,
  `EID` int(11) NOT NULL,
  `SNo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `continuewatching`
--

INSERT INTO `continuewatching` (`CID`, `AID`, `UID`, `EID`, `SNo`) VALUES
(20, 28, 13, 57, 1),
(21, 33, 13, 57, 1),
(22, 29, 13, 57, 1),
(27, 30, 13, 57, 1);

-- --------------------------------------------------------

--
-- Table structure for table `episodes`
--

CREATE TABLE `episodes` (
  `EID` int(11) NOT NULL,
  `AID` int(11) NOT NULL,
  `CoverImage` text NOT NULL,
  `VideoLink1080` text NOT NULL,
  `VideoLink720` text NOT NULL,
  `VideoLink480` text NOT NULL,
  `EpisodeName` text NOT NULL,
  `EpisodeNumber` int(11) NOT NULL,
  `SeasonNumber` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `episodes`
--

INSERT INTO `episodes` (`EID`, `AID`, `CoverImage`, `VideoLink1080`, `VideoLink720`, `VideoLink480`, `EpisodeName`, `EpisodeNumber`, `SeasonNumber`) VALUES
(53, 28, '1693465718586.740447.jpg', '1693465716140.jujitsu EP.1.720p.mp4', '1693465717032.jujitsu EP.1.720p.mp4', '1693465717833.jujitsu EP.1.720p.mp4', 'JJK 1', 1, 1),
(54, 28, '1693465779777.AOt.png', '1693465777464.jujitsu EP.2.720p.mp4', '1693465778262.jujitsu EP.2.720p.mp4', '1693465779008.jujitsu EP.2.720p.mp4', 'JJK 2', 2, 1),
(55, 30, '1693465935308.790528.jpg', '1693465934432.black clover episode 1.mp4', '1693465934755.black clover episode 1.mp4', '1693465935038.black clover episode 1.mp4', 'Black clover 1', 1, 1),
(56, 30, '1693465967122.AOt.png', '1693465966217.black clover episode 2.mp4', '1693465966548.black clover episode 2.mp4', '1693465966838.black clover episode 2.mp4', 'Black CLover 2', 2, 1),
(57, 29, '1693466025607.516246.jpg', '1693466023247.EP.1.720p (1).mp4', '1693466024140.EP.1.720p (1).mp4', '1693466024892.EP.1.720p (1).mp4', 'Dr stone 1', 1, 1),
(58, 29, '1693466061004.653529.jpg', '1693466058334.EP.2.720p.mp4', '1693466059265.EP.2.720p.mp4', '1693466060176.EP.2.720p.mp4', 'Dr stone 2', 2, 1),
(59, 29, '1693466102749.971586.jpg', '1693466100007.EP.3.720p.mp4', '1693466100981.EP.3.720p.mp4', '1693466101774.EP.3.720p.mp4', 'Dr stone 2.1', 1, 2),
(60, 31, '1693469243132.790528.jpg', '1693469240457.EP.1.720p.mp4', '1693469241501.EP.1.720p.mp4', '1693469242343.EP.1.720p.mp4', 'DS 1', 1, 1),
(61, 31, '1693469297624.wallpaperflare.com_wallpaper(9).jpg', '1693469295768.EP.2.720p.mp4', '1693469296464.EP.2.720p.mp4', '1693469297051.EP.2.720p.mp4', 'DS 2', 2, 1),
(62, 32, '1693469362412.790528.jpg', '1693469361466.1.mp4', '1693469361784.1.mp4', '1693469362110.1.mp4', 'Naruto 1', 1, 1),
(63, 32, '1693469401292.644171.jpg', '1693469400378.2.mp4', '1693469400716.2.mp4', '1693469401014.2.mp4', 'naruto 2', 2, 1),
(64, 33, '1693476111264.728021.jpg', '1693476108393.EP.1.720p (1).mp4', '1693476109477.EP.1.720p (1).mp4', '1693476110402.EP.1.720p (1).mp4', 'aabc 1', 1, 1),
(66, 36, '1694496701891.851512.png', '1694496699463.1693476110402.EP.1.720p (1).mp4', '1694496700370.1693476110402.EP.1.720p (1).mp4', '1694496701145.1693476110402.EP.1.720p (1).mp4', 'Haikyuu 1', 1, 1),
(67, 35, '1694496784088.death-note.jpg', '1694496781728.1693466024892.EP.1.720p (1).mp4', '1694496782571.1693466024892.EP.1.720p (1).mp4', '1694496783306.1693466024892.EP.1.720p (1).mp4', 'Death note 1', 1, 1),
(68, 37, '1694499212339.607711.jpg', '1694499208821.1693476108393.EP.1.720p (1).mp4', '1694499210208.1693476108393.EP.1.720p (1).mp4', '1694499211302.1693476108393.EP.1.720p (1).mp4', 'abc', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `ep_progress`
--

CREATE TABLE `ep_progress` (
  `EP_ID` int(11) NOT NULL,
  `EID` int(11) NOT NULL,
  `UID` int(11) NOT NULL,
  `AID` int(11) NOT NULL,
  `Progress` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ep_progress`
--

INSERT INTO `ep_progress` (`EP_ID`, `EID`, `UID`, `AID`, `Progress`) VALUES
(22, 53, 13, 28, 195),
(23, 54, 13, 28, 5),
(24, 64, 13, 33, 12),
(25, 57, 13, 29, 203),
(26, 59, 13, 29, 203),
(38, 55, 13, 30, 112),
(47, 58, 13, 29, 136);

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `NID` int(11) NOT NULL,
  `Title` text NOT NULL,
  `Description` text NOT NULL,
  `Image` text NOT NULL,
  `Genre` text NOT NULL,
  `Timestamp` text NOT NULL,
  `Tags` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`NID`, `Title`, `Description`, `Image`, `Genre`, `Timestamp`, `Tags`) VALUES
(8, 'naruto', 'Delta, Boro, and Koji Kashin Make Their First Appearance in NARUTO X BORUTO Ultimate Ninja STORM CONNECTIONS! Plus Kara\'s Combination Secret Technique Revealed! And Finally...Release Date Set for 11/17/2023!', '1691304358045.narutoBG.jpg', 'Shounen', '6/8/2023, 12:14:17 pm', 'dwafaf'),
(13, 'Haikyuu', 'Haikyuu!! is ending with two movies and a grand farewell party. The release date is yet to be revealed, but fans can expect updates at the Haikyu!! Festa 2023.', '1694442527371.haikyuu.jpg', 'Shoujo', '17/8/2023, 7:16:41 pm', 'hdwa'),
(19, 'Attack on titan', 'We now also know that Attack on Titan\'s Final Season The Final Chapters Special 2 will release in autumn 2023, according to a tweet from the show\'s official account. The tweet, and accompanying trailer, confirmed the final episode would release on Crunchyroll.', '1692328257796.607711.jpg', 'Shounen', '18/8/2023, 8:40:57 am', 'fwafwafa'),
(20, 'Naruto shippuden', 'Celebrating its 20th anniversary, the Naruto anime is set to thrill fans with four new episodes. The special episodes are part of the celebration and are scheduled to premiere on Sunday, September 3, 2023.', '1693635274329.790528.jpg', 'Shounen', '2/9/2023, 11:44:34 am', 'naruto'),
(21, 'About naruto', 'some news content....', '1693896470360.790528.jpg', 'Shounen', '5/9/2023, 12:17:50 pm', 'naruto'),
(23, 'fwafwa', 'fawfawf', '1698336501322.516246.jpg', 'Shounen', '26/10/2023, 9:38:21 pm', 'wfafwaf');

-- --------------------------------------------------------

--
-- Table structure for table `watchlist`
--

CREATE TABLE `watchlist` (
  `WID` int(11) NOT NULL,
  `UID` int(11) NOT NULL,
  `AID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `watchlist`
--

INSERT INTO `watchlist` (`WID`, `UID`, `AID`) VALUES
(20, 13, 28);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`UID`);

--
-- Indexes for table `anime`
--
ALTER TABLE `anime`
  ADD PRIMARY KEY (`AID`);

--
-- Indexes for table `auth`
--
ALTER TABLE `auth`
  ADD PRIMARY KEY (`UID`);

--
-- Indexes for table `billing`
--
ALTER TABLE `billing`
  ADD PRIMARY KEY (`BID`),
  ADD KEY `UID` (`UID`);

--
-- Indexes for table `chats`
--
ALTER TABLE `chats`
  ADD PRIMARY KEY (`CID`),
  ADD KEY `UID` (`UID`);

--
-- Indexes for table `continuewatching`
--
ALTER TABLE `continuewatching`
  ADD PRIMARY KEY (`CID`),
  ADD KEY `AID` (`AID`),
  ADD KEY `UID` (`UID`),
  ADD KEY `EID` (`EID`);

--
-- Indexes for table `episodes`
--
ALTER TABLE `episodes`
  ADD PRIMARY KEY (`EID`),
  ADD KEY `AID` (`AID`);

--
-- Indexes for table `ep_progress`
--
ALTER TABLE `ep_progress`
  ADD PRIMARY KEY (`EP_ID`),
  ADD KEY `AID` (`AID`),
  ADD KEY `EID` (`EID`),
  ADD KEY `UID` (`UID`);

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`NID`);

--
-- Indexes for table `watchlist`
--
ALTER TABLE `watchlist`
  ADD PRIMARY KEY (`WID`),
  ADD KEY `UID` (`UID`),
  ADD KEY `AID` (`AID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `UID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `anime`
--
ALTER TABLE `anime`
  MODIFY `AID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `auth`
--
ALTER TABLE `auth`
  MODIFY `UID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `billing`
--
ALTER TABLE `billing`
  MODIFY `BID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=92;

--
-- AUTO_INCREMENT for table `chats`
--
ALTER TABLE `chats`
  MODIFY `CID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `continuewatching`
--
ALTER TABLE `continuewatching`
  MODIFY `CID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `episodes`
--
ALTER TABLE `episodes`
  MODIFY `EID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT for table `ep_progress`
--
ALTER TABLE `ep_progress`
  MODIFY `EP_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `news`
--
ALTER TABLE `news`
  MODIFY `NID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `watchlist`
--
ALTER TABLE `watchlist`
  MODIFY `WID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `billing`
--
ALTER TABLE `billing`
  ADD CONSTRAINT `billing_ibfk_1` FOREIGN KEY (`UID`) REFERENCES `auth` (`UID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `chats`
--
ALTER TABLE `chats`
  ADD CONSTRAINT `chats_ibfk_1` FOREIGN KEY (`UID`) REFERENCES `auth` (`UID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `continuewatching`
--
ALTER TABLE `continuewatching`
  ADD CONSTRAINT `continuewatching_ibfk_1` FOREIGN KEY (`AID`) REFERENCES `anime` (`AID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `continuewatching_ibfk_2` FOREIGN KEY (`UID`) REFERENCES `auth` (`UID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `continuewatching_ibfk_3` FOREIGN KEY (`EID`) REFERENCES `episodes` (`EID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `episodes`
--
ALTER TABLE `episodes`
  ADD CONSTRAINT `episodes_ibfk_1` FOREIGN KEY (`AID`) REFERENCES `anime` (`AID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `ep_progress`
--
ALTER TABLE `ep_progress`
  ADD CONSTRAINT `ep_progress_ibfk_1` FOREIGN KEY (`AID`) REFERENCES `anime` (`AID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ep_progress_ibfk_2` FOREIGN KEY (`EID`) REFERENCES `episodes` (`EID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ep_progress_ibfk_3` FOREIGN KEY (`UID`) REFERENCES `auth` (`UID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `watchlist`
--
ALTER TABLE `watchlist`
  ADD CONSTRAINT `watchlist_ibfk_1` FOREIGN KEY (`UID`) REFERENCES `auth` (`UID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `watchlist_ibfk_2` FOREIGN KEY (`AID`) REFERENCES `anime` (`AID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
