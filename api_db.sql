-- MariaDB dump 10.19  Distrib 10.4.18-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: api_pokemon
-- ------------------------------------------------------
-- Server version	10.4.18-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `api_pokemon`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `api_pokemon` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `api_pokemon`;

--
-- Table structure for table `pokemons`
--

DROP TABLE IF EXISTS `pokemons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pokemons` (
  `id` varchar(5) NOT NULL,
  `name` varchar(25) NOT NULL,
  `type` varchar(30) NOT NULL,
  `url_photo` varchar(50) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pokemons`
--

LOCK TABLES `pokemons` WRITE;
/*!40000 ALTER TABLE `pokemons` DISABLE KEYS */;
INSERT INTO `pokemons` VALUES ('001','Bulbasaur','Grass,Poison','./images/bulbasaur.jpg','Bulbasaur can be seen napping in bright sunlight. There is a seed on its back. By soakingup the sun\'s rays, the seed grows progressively larger.'),('002','Ivysaur','Grass,Poison','./images/ivysaur.jpg','There is a bud on this Pokemon\'s back. To support its weight, Ivysaur\'s ,legs and trunk grow thick and strog. If it starts spendig more time lying in the sunlight, it\'s a sign that the bud will bloom into a large flower soon'),('003','Venusaur','Grass,Poison','./images/venusaur.jpg','There is a large flower on Venusaur\'back. The flower is said to take on vivid colors if gets plenty of nutrition and sunlight. The flower\'s aroma soothes the emotions of people'),('004','Charmander','Fire','./images/charmander.jpg','The flame that burns at the tip of its tail is an indication of its emotions.The flame wavers when Charmander is enjoying itself. If the Pokemon becomes enraged, the flame burns fiercely'),('005','Charmeleon','Fire','./images/charmeleon.jpg','Charmeleon mercilessly destroys its foes using its sharp claws. If it encounters a strong foe, it turns aggressive. In this exited state, the flame at the tip of its tail flares whith a bluish white color.'),('006','Charizard','Fire,Flying','./images/charizard.jpg','Charizard flies around the sky in search of powerful oponents. It breathes fire of such great heat that it melts anything. However , it never turns its fiery breath on any opponet weaker thant itself.'),('007','Squirtle','Water','./images/squirtle.jpg','Squirtle\'s shell is not merely used for protection. The shell\'s rounded shape and the grooves on its surface help minimize resistance in water, enabling this Pokemon to swim at high speeds.'),('008','Wartortle','Water','./images/wartortle.jpg','Its tail is large and covered with a rich, thick fur. The tail becomes increasingly deeper in color as Wartortle ages. The scratches on its shell are evidence of this pokemon\'s toughness as a battler.'),('009','Blastoise','Water','./images/blastoise.jpg','Blastoise has water spouts that protrude from its shell. The water spouts are very accurate. They can shoot bullets of water whith enough accuracy to strike empty cans from a distance of over 160 feet.'),('010','Caterpie','Bug','./images/caterpie.jpg','Its body is soft and weak. In nature, its perpetual fate is to be seen by others as food.'),('011','Metapod','Bug','./images/metapod.jpg','Its hard shell doesn\'t crack a bit even if Pikipek pecks at it, but it will tip over, splilling out its insides.'),('012','Butterfree','Bug,Flying','./images/butterfree.jpg','Nectar from pretty flowers is its favorite food. In fields of flowers, it has heated battles with Cutiefly for territory.'),('013','Weedle','Bug,Poison','./images/weedle.jpg','Weedle has an extremely acute sense of smell. It is capable of distinguishing its favorite kinds of leaves from those it dislikes just by sniffing with its big red proboscis(nose).'),('014','Kakuna','Bug,Poison','./images/kakuna.jpg','Kakuna temains virtually inmobile as it clings to a tree. However, on the inside, it is extrenely busy as it prepares for its coming evolution. This is evident from how hot the shell becomes to the touch.'),('015','Beedrill','Bug,Poison','./images/beedrill.jpg','Beedrill is extremely territorial. No one should ever approach its nest this is for their own safety. If angered, they will attack in a furious swarm.'),('016','Pidgey','Normal,Flying','./images/pidgey.jpg','Pidgey has an extremely sharp sense of direction. It is capable of unerringly returnig home to its nest, however far it may be removed from its familiar surroundings.'),('017','Pidgeotto','Normal,Flying','./images/pidgeotto.jpg','Pidgeotto claims a large area as its own territor. This pokemon flies around, patrolling its living space. If its territory is violated, it shows no merce in thoroughly punishing the foe with its sharp claws.'),('018','Pidgeot','Normal,Flying','./images/pidgeot.jpg','This Pokemon has a dazzling plumage of beautifully glossy feathers. Many trainers are captivated by the striking beauty of the feathers on its head, compelling them to choose Pidgeot as their Pokemon.'),('019','Rattata','Normal','./images/rattata.jpg','This pokemon is common but hazardous. Its sharp incisors can easily cut right through hard wood.'),('020','Raticate','Normal','./images/raticate.jpg','Its whiskers are essential for maintaining its balance. No matter how friendly you are, it will get angry and bite you if you touch its whiskers.');
/*!40000 ALTER TABLE `pokemons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stadistics`
--

DROP TABLE IF EXISTS `stadistics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stadistics` (
  `pokemon_id` varchar(5) NOT NULL,
  `HP` int(3) NOT NULL,
  `ATK` int(3) NOT NULL,
  `DEF` int(3) NOT NULL,
  `ATK_ESP` int(3) NOT NULL,
  `DEF_ESP` int(3) NOT NULL,
  `SPEED` int(3) NOT NULL,
  KEY `pokemon_id` (`pokemon_id`),
  CONSTRAINT `stadistics_ibfk_1` FOREIGN KEY (`pokemon_id`) REFERENCES `pokemons` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stadistics`
--

LOCK TABLES `stadistics` WRITE;
/*!40000 ALTER TABLE `stadistics` DISABLE KEYS */;
INSERT INTO `stadistics` VALUES ('001',45,49,49,65,65,45),('002',60,62,63,80,80,60),('003',80,82,83,100,100,80),('004',39,52,43,60,50,65),('005',58,64,58,80,65,80),('006',78,84,78,109,85,100),('007',44,48,65,50,64,43),('008',59,63,80,65,80,58),('009',79,83,100,85,105,78),('010',45,30,35,20,20,45),('011',50,20,55,25,25,30),('012',60,45,50,90,80,70),('013',40,35,30,20,20,50),('014',45,50,30,25,25,35),('015',65,90,40,45,80,75),('016',40,45,40,35,35,56),('017',63,60,55,50,50,71),('018',83,80,75,70,70,101),('019',30,56,35,25,35,72),('020',55,81,60,50,70,97);
/*!40000 ALTER TABLE `stadistics` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-10-18  3:26:27
