-- MySQL dump 10.13  Distrib 8.0.16, for Win64 (x86_64)
--
-- Host: 118.31.20.44    Database: cslcn
-- ------------------------------------------------------
-- Server version	5.7.28-0ubuntu0.18.04.4

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `__efmigrationshistory`
--

DROP TABLE IF EXISTS `__efmigrationshistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `__efmigrationshistory` (
  `MigrationId` varchar(95) COLLATE utf8mb4_bin NOT NULL,
  `ProductVersion` varchar(32) COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`MigrationId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `__efmigrationshistory`
--

LOCK TABLES `__efmigrationshistory` WRITE;
/*!40000 ALTER TABLE `__efmigrationshistory` DISABLE KEYS */;
INSERT INTO `__efmigrationshistory` VALUES ('20190518084553_InitialCreate','2.2.4-servicing-10062'),('20190520135716_CreateUserAndMenuTable','2.2.4-servicing-10062'),('20190523130427_AddMenusIconPath','2.2.4-servicing-10062'),('20190523131254_UpdateMenusIconType','2.2.4-servicing-10062'),('20190526072254_AppendWikiPassageAuthorRoutePath','2.2.4-servicing-10062'),('20190709134508_UpdateUserIsAdmin','2.2.4-servicing-10062'),('20190709144413_UpdateUserPwd50MaxLength','2.2.4-servicing-10062'),('20191009133133_CreateDonatorRank','2.2.6-servicing-10079'),('20191009133319_CreateDonatorRank1','2.2.6-servicing-10079'),('20191009133627_CreateDonatorRank2','2.2.6-servicing-10079'),('20191010134155_AppendDonatorRankOrderId','2.2.6-servicing-10079'),('20191010134535_DonatorRankOrderId','2.2.6-servicing-10079'),('20191010140844_AppendUserAvatarUrl','2.2.6-servicing-10079');
/*!40000 ALTER TABLE `__efmigrationshistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donatorranks`
--

DROP TABLE IF EXISTS `donatorranks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `donatorranks` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `CreateDate` datetime(6) NOT NULL,
  `LastModifyDate` datetime(6) NOT NULL,
  `UserId` int(11) NOT NULL,
  `DonateTotalCount` decimal(65,30) NOT NULL,
  `PersonalTitle` longtext COLLATE utf8mb4_bin,
  `DescriptionWord` longtext COLLATE utf8mb4_bin,
  `PaymentCompany` int(11) NOT NULL,
  `PaymentUserNameSecretly` varchar(64) COLLATE utf8mb4_bin NOT NULL,
  `PaymentAccountSecretly` varchar(64) COLLATE utf8mb4_bin NOT NULL,
  `OrderId` varchar(128) COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donatorranks`
--

LOCK TABLES `donatorranks` WRITE;
/*!40000 ALTER TABLE `donatorranks` DISABLE KEYS */;
INSERT INTO `donatorranks` VALUES (1,'2019-10-09 00:00:00.000000','2019-10-09 00:00:00.000000',2,9.000000000000000000000000000000,'三轮车','奖励你一块原味鸡!',0,'*汉','188****1234@qq.com','123456');
/*!40000 ALTER TABLE `donatorranks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menus`
--

DROP TABLE IF EXISTS `menus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `menus` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `CreateDate` datetime(6) NOT NULL,
  `LastModifyDate` datetime(6) NOT NULL,
  `MenuType` int(11) NOT NULL,
  `Name` longtext COLLATE utf8mb4_bin NOT NULL,
  `ParentId` int(11) NOT NULL,
  `IconType` longtext COLLATE utf8mb4_bin,
  `Path` longtext COLLATE utf8mb4_bin,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menus`
--

LOCK TABLES `menus` WRITE;
/*!40000 ALTER TABLE `menus` DISABLE KEYS */;
INSERT INTO `menus` VALUES (1,'2019-05-26 16:20:01.372928','2019-05-26 16:20:01.372997',0,'主页',0,'home','homepage'),(2,'2019-05-26 16:20:01.885799','2019-05-26 16:20:01.885799',0,'快速起步',0,'thunderbolt',NULL),(3,'2019-05-26 16:20:01.915668','2019-05-26 16:20:01.915669',0,'常用MOD',0,'tool',NULL),(4,'2019-05-26 16:20:01.918554','2019-05-26 16:20:01.918554',0,'最新消息',0,'notification',NULL),(5,'2019-05-26 16:20:01.922749','2019-05-26 16:20:01.922749',0,'请开发者吃饭',0,'alipay','donator-rank'),(6,'2019-05-26 16:20:01.926796','2019-05-26 16:20:01.926796',1,'初学者指南',2,NULL,'wiki-passage/beginners-guide'),(7,'2019-05-26 16:20:01.930059','2019-05-26 16:20:01.930060',1,'功能列表',2,NULL,'wiki-passage/features'),(8,'2019-05-26 16:20:01.932731','2019-05-26 16:20:01.932732',1,'里程碑列表',2,NULL,'wiki-passage/milestones'),(9,'2019-05-26 16:20:01.936260','2019-05-26 16:20:01.936260',1,'连连乐',3,NULL,NULL),(10,'2019-05-26 16:20:01.939665','2019-05-26 16:20:01.939665',1,'挪挪乐',3,NULL,NULL),(11,'2019-05-26 16:20:01.943310','2019-05-26 16:20:01.943310',1,'Forest Brush v.1.2.5',3,NULL,NULL),(12,'2019-05-26 16:20:01.946520','2019-05-26 16:20:01.946521',1,'校园 DLC',4,NULL,NULL),(13,'2019-05-26 16:20:01.950275','2019-05-26 16:20:01.950275',1,'开发者日志（十八）',4,NULL,NULL);
/*!40000 ALTER TABLE `menus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userinfoes`
--

DROP TABLE IF EXISTS `userinfoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `userinfoes` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `CreateDate` datetime(6) NOT NULL,
  `LastModifyDate` datetime(6) NOT NULL,
  `UserName` varchar(16) COLLATE utf8mb4_bin NOT NULL,
  `Password` varchar(64) COLLATE utf8mb4_bin NOT NULL,
  `NickName` varchar(24) COLLATE utf8mb4_bin NOT NULL,
  `IsAdmin` bit(1) NOT NULL DEFAULT b'0',
  `AvatarUrl` longtext COLLATE utf8mb4_bin,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userinfoes`
--

LOCK TABLES `userinfoes` WRITE;
/*!40000 ALTER TABLE `userinfoes` DISABLE KEYS */;
INSERT INTO `userinfoes` VALUES (1,'2019-07-09 21:51:00.000000','2019-07-09 21:51:00.000000','aa940724','foK01ga52aMdjniNJ+GncQ==','Elevent夜',_binary '','/assets/user-avatar/CBDFEED4-ED0B-4182-9358-63408BA8D15A.JPG'),(2,'2019-12-26 22:50:00.000000','2019-12-26 22:50:00.000000','gsgysm','jUhA0OyZkdP0NCUR2hfkHA==','给时光以生命',_binary '','/assets/user-avatar/gsgysm.jpg');
/*!40000 ALTER TABLE `userinfoes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wikipassages`
--

DROP TABLE IF EXISTS `wikipassages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `wikipassages` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `CreateDate` datetime(6) NOT NULL,
  `LastModifyDate` datetime(6) NOT NULL,
  `Title` longtext COLLATE utf8mb4_bin NOT NULL,
  `Content` longtext COLLATE utf8mb4_bin NOT NULL,
  `Author` longtext COLLATE utf8mb4_bin NOT NULL,
  `RoutePath` longtext COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wikipassages`
--

LOCK TABLES `wikipassages` WRITE;
/*!40000 ALTER TABLE `wikipassages` DISABLE KEYS */;
INSERT INTO `wikipassages` VALUES (1,'2019-05-26 16:24:00.000000','2019-12-26 09:55:44.458427','初学者指南','此页面旨在作为一些文档阅读者的最初提示列表，这些提示可能对于城市的新玩家来说受益可能并不完全明显，但无数有过一定游玩经验的玩家表示，在阅读过这些提示后，已有的游戏体验变的更加愉快了。\n\n## 道路 & 铁路\n\n1. 在你的城市各个主要城区间使用不被中途截断的高速公路进行连接是非常必要的；同时为了能够保证道路达到最大车流承载量，你还需要适当的在不同的位置与城市区域间使用不同等级的道路。\n1. 有时，为了缓解高速出口的大面积重型货运车辆的拥堵状况，你可以尝试在高速公路出口旁设立“临街道路”或“本地快速通道”。\n1. 路口，越少越好。同时尽量尝试避免在不必要的路口使用红绿灯，因为如果使用不当，有时它们反而会让路口变的更加拥堵，扰乱原本顺畅的车流。\n1. 环岛不应该设置的过小（环岛越小，弯道弧度越大，这意味着车辆在行驶时的转角越大，从而导致速度变慢，这使得环岛可承受的最大车流量下降，最终拥堵）。\n1. 尽可能使用单行道，特别是在工业区，因为此地通常是堵车的重灾区。然而，请留意服务建筑的有效覆盖范围和放置位置，因为即使是服务车辆，在游戏中，也无法逆行抵达目标建筑。所以这最终将导致市政服务的效率低下，服务车辆可能无法及时抵达目标建筑。\n1. 记得不要让新诞生的城区阻断你已有的高速公路，由此只是途径此地的车辆可轻易的在各个目的地之间穿梭，而无需驶入中途的某个城区。\n1. 距离过近的路口会导致拥堵。因为刁民严格遵循“前方路口已满，则在路口外停车等待”的交通规则，当路口过近时，“前方路口”会变的非常短小，此时一辆车驶入，则该路口视为“已满”。\n1. 尝试将货运卡车从刁民的日常通勤车流中剥离开。如果两种车流混合在一条道路上，那么无论设计多么优秀的交通系统，都很有可能会因此瘫痪。为一个区域使用“禁止货运车辆通行”的政策能够对此提供有效的帮助。\n1. 在工业区使用货运火车站能够非常有效的缓解拥堵情况。记住，一个货运火车站需要一个非常优秀的道路系统设计，因而每当一列火车到达货运站时，大批量的货车即可将他们的货物通过铁路发送。（单行道在这里是一个不错的选择）\n1. 火车也会堵，就像汽车那样。为了避免堵火车的情况，你可以尝试在铁路进入城市以前就将它分为两条专线：一条专用于货运火车通行，而另一条专用于客运火车通行。同时，在铁路交汇处，可以尝试修建“铁路立交”，这样当多列火车同时抵达路口时，便可以畅通无阻的驶向各自的目的地。\n1. 更多的路口、道路与高架设计，你可以参看虎牙汉界在Bilibli发布的视频[城市天际线教程《从新手到老鸟系列》（一）初学者指南：数十座专业高架设计简图及实景图速览](https://www.bilibili.com/video/av24013627/?p=11)。如果你还想得到更多：带上你的纸和笔，出门转悠转悠吧。最佳的道路设计与交通系统，其实早已运用于你的实际生活当中。同时如果你在出行时途径高速公路出入口和交通枢纽，也不妨留心观察。通常，它们能为你的创造提供更多灵感。\n\n> 临街道路与本地快速通道设计参考下图所示：\n\n>![](./assets/beginners-guide/220px-Frontage_road.svg.png)\n![](./assets/beginners-guide/220px-AS_Frontage.svg.png)\n![](./assets/beginners-guide/220px-Frontage_Road_Interchange.png)\n![](./assets/beginners-guide/220px-Service-lane-Tumkur-Road-Dasanapura.jpg)\n![](./assets/beginners-guide/220px-ALT_US_71.jpg)\n\n## 公共交通\n\n公共交通的主要目的是通过为你的刁民提供新的出行方案来减少车流量，这对于建立一个高效运行的城市至关重要。\n\n1. 尽快开始使用公共交通工具，并尽量保持公共交通路线简单。\n1. 公交车非常便宜，能有效降低车流量，但是太多的公交车会导致拥堵。\n1. 地铁是最有效的交通系统，但价格也是相当昂贵的。与地铁系统相辅相成的良好混合总线是最有效的整体交通解决方案。\n1. 目前，旅客列车对于城市内的交通效果较差，但对于将游客带到城市非常有用。它们在广泛分散的大型城市中变得更加有效。并且，使用专用客运铁路来防止货运列车拥堵是一个好主意。\n1. 增加指定类型公共交通的预算将增加该类型每条线路上使用的车辆数量。\n1. 更长的线路和更多的停靠点将产生更多的车辆。\n1. 公共交通站点是一种服务，可用于增加幸福感和建筑等级。\n1. 公共交通线路在其路线经过所有类型的区域划分时最有效（办公区除外，因为它们的交通负担不大）。\n1. 通勤交通通常在商业区中，工业交通通常在工业区中，在向商业区运输货物时会出现在工业区和商业区中。\n1. 商业区内公共交通需求最大; 商业专精更是如此。\n\n\n## 市政服务\n\n1. 请注意，市政服务有范围限制，因此在你的城市大小超过服务范围时需要多个相同的市政服务。相关信息视图会显示出绿色道路来表示哪些区域在该类型市政服务的范围内。\n1. 市政服务不仅有服务范围，而且它们依靠道路到达他们需要到达的地方。严重的交通拥堵或糟糕的道路布局会严重降低服务效率或者导致服务无效。\n1. 某些服务性建筑，如垃圾填埋场和墓地，必须完全空置后才能搬迁或拆除。通过其他同类型服务性建筑的车辆将垃圾填埋场和墓地中的垃圾和尸体运输到其他同类型服务性建筑中。\n1. 不要在受污染的地面上建造水塔或在污水出口的下游建造自来水厂。\n1. 公园和市政服务增加了土地价值，增加了特定土地的吸引力，同时刺激了这些地区的发展（建筑升级）。\n1. 最佳的水管覆盖范围是两条平行管道之间花费440科朗（22u），这会让平行水管之间的重叠区域达到最小值，同时确保水管覆盖范围内都得到供水和污水处理。\n1. 高压电塔不需要接触到到建筑物，只需要建造在电力范围中看到的蓝色轮廓里即可通电。\n\n## 发展规划\n\n1. 利用区域和城市政策。详细内容在开发日记8：区域与政策\n1. 尝试将污染严重的建筑/工业与住宅区分开。\n1. 农业和林业的大多建筑没有土地污染，即使该地区没有相应的自然资源，也可以利用它们（它们会进口需要的资源。）你可以在工业区和商业区之间使用它们作为缓冲区。虽然它们有较大的噪音污染（所有的工业都有），但商业区比住宅区更能忍受噪音污染。\n1. 人行道和自行车道：不要因为它们处于“装饰”分类中就认为它们仅仅用于装饰。它们在减少车流量方面非常管用。每有一个刁民步行或者骑自行车上下班，将少一辆在路上的车辆，减轻道路拥堵。可以将它们视为免费的公共交通。你还可以通过抬升道路的方式抬升人行道和自行车道。它们允许的倾斜角度比最小的道路更高。\n1. 建筑物方向提示：通过将鼠标指针移向你希望建筑物面向的道路，建筑会自动吸附道路并且建筑出入口将会垂直于道路。因此，如果你有一个大道路和小道路的角落，并且你想让建筑面向大道路，你可以先将鼠标移动到你想要的位置然后稍微移动鼠标朝向更大的道路和建筑将自动朝向这个方向。\n1. 装饰树木或隔音屏障的道路可以减少噪音污染。\n1. 办公区可作为商业和住宅区之间的屏障，以减少住宅区的噪音污染。\n1. 分区在交通中起着重要作用。为了隔离通勤和工业交通，将商业区放在住宅区和工业区中间。而办公室可以划分到任何地方，因为他们只提供工作只有早晚的通勤车流，可以减轻交通系统的负担。\n\n## 其他提示\n\n1. **不要**在一开始就过快的扩展你的城市，因为这样会导致你的预算比预期更早耗尽；预算只足够使用于起始住宅区、电力、自来水厂和排污管道。\n1. 在建造大坝前请保存进度，因为建造后的效果有可能与期望的效果不同。大坝是游戏中最昂贵的建筑之一。\n1. 浏览Steam中的创意工坊寻找好的mod，以及优质的交叉路口，这些交叉路口通常可以改善某些关键位置的交通状况。\n1. 可以使用[http://terrain.party/](http://terrain.party/)获得所选现实中城市的高度图，并将其导入到城市：天际线中。使用说明已被展示在衍生讨论与外部资源中。\n1. 不要在你必需某种服务之前就进行服务建筑的放置，因为服务建筑只要产生，就会消耗你的资金。如果你能在不建造它们的情况下撑过一段时间，就先不要消耗你的资金投放服务建筑。当然有一个例外情况，那就是在游戏开始时，你必须快速扩张，这时资金消耗可能会非常大并且不会产生盈利。\n\n## 衍生讨论与外部资源\n\n1. “如何构建交通”（讨论）。\n1. 新手适用的mod。\n1. 将高度图导入city：skylines','汉界 & 暴食者','beginners-guide'),(2,'2019-06-05 21:53:00.000000','2019-06-05 23:12:00.974397','功能列表','此页面包含了游戏中的主要游玩因素介绍。\r\n\r\n## 关于游戏\r\n\r\n《城市：天际线》是一个现代城市模拟经营类型的经典游戏。它没有向讨好玩家、吸引更多普通用户游玩妥协，而是借鉴现实城市的建造经历，融入了大量极为真实的城市经营模拟元素，使得游戏过程充满更多的刺激与挑战。\r\n\r\n借助来自构建《都市运输》的游戏团队的工作经验，城市天际线现在拥有一个几乎完全接近现实的交通运输系统。它同时还包含了模组化（MOD it !）的能力，因而你能够以几乎所有你想要的方式改造游戏因素，以符合你的游玩喜欢和有关于城市建造的想象。在这里，你几乎只会被你的想象力所限制，所以你需要做的是将它们发挥到极致，登峰造极！\r\n\r\n## 主要游戏因素\r\n\r\n**多维度并极具挑战的模拟引擎：** 从零开始建造一座城市非常容易上手，但却很难运筹帷幄。作为您所在城市的市长，您将面临诸多因素的平衡性需求，例如：教育、水电、警察、消防、医疗保健等市政服务，和其他的城市实体经济系统。市民对所在城市产生的各种变化会响应灵敏，十分真实，并极具吸引力。\r\n\r\n**真实的交通模拟引擎：** 城市天际线借鉴了 Colossal Orders 在《都市运输》中丰富的开发经历，并充分利用和精心设计、完善了其所使用的交通模拟引擎，现在，你拥有了更加真实的交通运输模拟体验。\r\n\r\n**地区和政策：** 你不会只是一个城管局队员。你可以为所在的城市划定区域，由此政策将会变的可用，这进一步让你真正成为这座城市的市长。\r\n\r\n**广泛的模组化（MOD）支持：** 支持第三方开发者以插件或模组的方式改进现有的游戏因素。同时，这些改进也可以被共享到 Steam 创意工坊，以供其他玩家免费下载和使用。\r\n\r\n## 其他游戏因素\r\n\r\n- 道路建造和分区管理。\r\n- 解锁独特建筑和众多市政服务。\r\n- 经营系统：调整城市预算和服务，并为不同的住宅、商业、工业类型使用不同的税率，以控制最终的城市主导产业类型（例如高新科技产业城市、工业城市、养老型城市、金融都市）。\r\n- 公共交通：建造地铁和巴士等公共交通来在城市的各个区间间穿梭于通行。\r\n- 外部链接：本地工业与商业将会与相邻城市实时的发生连接，互通有无，共同发展。\r\n- 里程碑系统：鼓励玩家不断挑战，从零开始建造大都会。\r\n- 庞大的地图：随着发展，解锁新的地块，以更多的可能性扩展你的城市。\r\n- 水流模拟：为供水服务带来了新的挑战。\r\n- 卓越的游戏画质与其他硬核内容。\r\n- 无限金钱工具、全部解锁工具、硬核游戏模式可用。\r\n\r\n## 游戏版本\r\n\r\n### 预购版\r\n\r\n预购版包括了一些独特的建筑资产。\r\n\r\n- 篮球场。\r\n- 植物园。\r\n- 城堡公园。\r\n- 旋转木马公园。\r\n- 狗狗公园。\r\n\r\n1.5.0-f4 版本发布比赛日 DLC 时，以上内容已向所有玩家免费解锁。\r\n\r\n### 豪华版\r\n\r\n豪华版包括来自世界各地的5个地标性建筑、游戏原生音乐和一本游戏美术设计阶段介绍的电子书。\r\n\r\n5个地标性建筑包括：\r\n\r\n- 自由女神像\r\n- 埃菲尔铁塔\r\n- 勃兰登堡门\r\n- 凯旋门\r\n- 格兰德中心航站楼\r\n\r\n**原声音乐：** 包括14首专门为游戏环境适配的独特曲目，让您在游戏过程中尽享美妙的音乐。\r\n\r\n**美术设计介绍电子书：** 豪华版用户将在游戏目录下获得这本讲述游戏美术设计过程故事的电子书。文件路径通常是 ``\\SteamPowered\\steamapps\\common\\Cities_Skylines\\Cities Skylines - Digital Artbook.pdf``。了解建筑背后的美学概念！这本书讲述了几乎游戏初期所有 32 个建筑类型的创作故事，并包含手绘的原型图。\r\n\r\n## 语言支持\r\n\r\n《城市：天际线》为以下语言的用户提供支持：\r\n\r\n- 简体中文\r\n- 英语\r\n- 法语\r\n- 德语\r\n- 西班牙语\r\n- 波兰语\r\n- 葡萄牙语（巴西）\r\n- 俄语\r\n- 韩语','汉界','features'),(3,'2019-06-05 23:41:00.000000','2019-12-24 23:52:34.058104','里程碑列表','随着城市的发展，新的人口里程碑将不断解锁，为城市带来新的服务类型和服务建筑解锁，并开放新的分区专精和地块区域，并提供额外的资金奖励。\r\n\r\n- 新服务类型的解锁使您可以向城市添加新的服务。解锁新服务类型时，你还可以开始使用该服务类型的基本建筑。在以后的里程碑，您可以继续为这些服务解锁新的建筑物。通常，新建筑物能够为您在城市管理方面提供更加高效且覆盖范围更大的方法。\r\n- 新的区域专精包括高密度住宅，商业区域和办公区域。分区专业化可以决定区域中建筑物的类型。\r\n- 独特建筑包括各种重要的建筑物，每个建筑物都有各自的解锁条件和益处。纪念碑级别的建筑会在最后一个人口里程碑被解锁时开放。\r\n- 解锁新区域后，您可以选择购买区域视图中相邻的区块之一以扩展您的城市建设用地面积。一些区域可能有水域，高速公路或自然资源。到游戏结束时，您总共可以解锁九个区域地块，但是使用 Steam Workshop 提供的模组（MOD）修改后，该区域的上限可以增加到总共 25 个，甚至 81 个。\r\n\r\n## 里程碑列表\r\n\r\n达到里程碑所需的人口数量在各个地图并不相同，而且似乎取决于所选的地图的某些因素，最有可能的是取决于当前地图中适合用于建造的有效面积大小。目前尚不明确这一标准的准确计算公式。\r\n\r\n|里程碑|人口数量|地块|功能|服务|分区|政策|道路|建筑|金钱奖励|\r\n|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|\r\n|小村庄|120-480|1个|贷款,税收|教育和校园,垃圾,卫生保健|-|-|-|社区学校,小学,垃圾填埋场,医疗诊所,回收中心,积雪场|20,000|\r\n|富有的村庄|240-950|2个|6|6|6|6|6|6|\r\n|小城镇|360-1,500|-|6|6|6|6|6|6|\r\n|繁荣的城镇|650-2,600|3个|6|6|6|6|6|6|\r\n|繁忙的小镇|1,200-5,000|-|6|6|6|6|6|6|\r\n|大城镇|1,800-7,500|4个|6|-|6|6|6|6|\r\n|小城市|2,600-11,000|-|6|6|6|6|6|6|\r\n|大城市|4,000-17,000|5个|6|6|6|6|6|6|\r\n|繁华的城市|5,000-22,000|-|6|6|6|6|6|6|\r\n|首都|8,000-36,000|6个|6|6|6|6|6|6|\r\n|巨大的城市|11,000-50,000|7个|6|6|6|6|6|6|\r\n|都会|16,000-70,000|8个|6|6||6|6|6|\r\n|大都会|20,000-90,000|9个(25)(81)|6|6|6|6|6|6|\r\n\r\n> 此表格暂未完成 ---- 骚汉 2019年12月24日23:58:41','汉界','milestones'),(4,'2019-12-16 20:53:00.000000','2019-12-18 22:59:50.858033','信息视图列表','城市：天际线提供 29 种不同的信息视图，以显示和突出标注有关于城市各方面的实时信息。一些信息视图包括针对相同类别但不同进度的相关信息，以及多个标签（例如教育信息视图同时包含了3个教育程度的状况，以及公共图书馆的容量情况）。虽然信息视图没有实际进行分类，但总体上，我们还是可以将其大致分为三个大类：\n\n- **城市服务相关：**显示的信息主要是关于不同的城市服务功能及其影响的城市范围。其中包括电力、垃圾收集、教育、卫生、消防安全、警察和公共交通。打开城市服务的建造菜单时，也会自动展示其相关的信息视图。\n- **与公民相关：**显示与公民本身相关的信息，例如幸福感，住房水平，人口统计信息等。这些信息视图使玩家可以查看其行为究竟是如何影响了公民的日常生活的。\n- **与城市和地图有关：**显示定义城市区域本身的特征和效果。这些是污染水平，土地价值，自然资源和地区。污染既显示地面污染，也显示水污染，而声音污染则显示道路网络以及各种分区建筑物和城市服务建筑物的影响（居民区几乎不产生噪声污染，而商业特别是工业区则严重影响噪声污染水平并使人患病）。','汉界','info-views'),(5,'2019-12-16 20:53:00.000000','2019-12-26 15:59:13.891764','道路','*有关如何最佳处理交通的提示，请参阅[交通](https://skylines.paradoxwikis.com/Traffic)。*\n\n*有关道路编辑或修改，请参阅[道路编辑器](https://skylines.paradoxwikis.com/Road_Editor)。*\n\n**道路**是建造城市最基本但也是最重要的工具。游戏中有很多不同类型的可用道路，他们主要有两个用途：交通运输和[区域划分](https://skylines.paradoxwikis.com/Zoning)。 在你开始建设一个新城市时，只有双车道道路是可以建造并使用的。更多类型的其他道路会在玩家建造第一条道路之后解锁或者通过达到相应的[里程碑](https://skylines.paradoxwikis.com/Milestones)解锁。','给时光以生命','road'),(6,'2019-12-16 20:53:00.000000','2019-12-18 22:27:12.745428','交通','编辑中...','Toms','traffic'),(7,'2019-12-16 20:53:00.000000','2019-12-18 22:27:17.887076','公共交通运输','编辑中...','Toms','transportation'),(8,'2019-12-16 20:53:00.000000','2019-12-16 20:53:00.000000','区域','编辑中...','Toms','zoning'),(9,'2019-12-16 20:53:00.000000','2019-12-16 20:53:00.000000','分区','编辑中...','Toms','districts'),(10,'2019-12-16 20:53:00.000000','2019-12-16 20:53:00.000000','政策列表','编辑中...','Toms','policies'),(11,'2019-12-16 20:53:00.000000','2019-12-16 20:53:00.000000','服务列表','编辑中...','Toms','services'),(12,'2019-12-16 20:53:00.000000','2019-12-16 20:53:00.000000','服务建筑列表','编辑中...','Toms','service-buildings'),(13,'2019-12-16 20:53:00.000000','2019-12-16 20:53:00.000000','装饰','编辑中...','Toms','decorations'),(14,'2019-12-16 20:53:00.000000','2019-12-16 20:53:00.000000','公园和广场','编辑中...','Toms','parks-and-plazas'),(15,'2019-12-16 20:53:00.000000','2019-12-16 20:53:00.000000','市民','编辑中...','Toms','citizens'),(16,'2019-12-16 20:53:00.000000','2019-12-16 20:53:00.000000','幸福度','编辑中...','Toms','happiness'),(17,'2019-12-16 20:53:00.000000','2019-12-16 20:53:00.000000','经济','编辑中...','Toms','economy'),(18,'2019-12-16 20:53:00.000000','2019-12-16 20:53:00.000000','自然资源','编辑中...','Toms','natural-resources'),(19,'2019-12-16 20:53:00.000000','2019-12-16 20:53:00.000000','旅游','编辑中...','Toms','tourism'),(20,'2019-12-16 20:53:00.000000','2019-12-16 20:53:00.000000','污染','编辑中...','Toms','pollution'),(21,'2019-12-16 20:53:00.000000','2019-12-16 20:53:00.000000','独特建筑列表','编辑中...','Toms','unique-buildings'),(22,'2019-12-16 20:53:00.000000','2019-12-16 20:53:00.000000','伟大工程列表','编辑中...','Toms','monuments'),(23,'2019-12-16 20:53:00.000000','2019-12-16 20:53:00.000000','MOD 开发','编辑中...','Toms','modding'),(24,'2019-12-16 20:53:00.000000','2019-12-16 20:53:00.000000','成就列表','编辑中...','Toms','achievements'),(25,'2019-12-16 20:53:00.000000','2019-12-16 20:53:00.000000','历史版本','编辑中...','Toms','patches'),(26,'2019-12-16 20:53:00.000000','2019-12-16 20:53:00.000000','可下载内容','编辑中...','Toms','downloadable-content'),(27,'2019-12-16 20:53:00.000000','2019-12-16 20:53:00.000000','开发者日志','编辑中...','Toms','developer-diaries');
/*!40000 ALTER TABLE `wikipassages` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-12-26 23:59:34
