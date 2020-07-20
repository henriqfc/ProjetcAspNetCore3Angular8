-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: imobiliariadb
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `endereco`
--

DROP TABLE IF EXISTS `endereco`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `endereco` (
  `idEndereco` int NOT NULL AUTO_INCREMENT,
  `cep` varchar(45) NOT NULL,
  `rua` varchar(45) NOT NULL,
  `bairro` varchar(45) NOT NULL,
  `cidade` varchar(45) NOT NULL,
  `uf` varchar(45) NOT NULL,
  `dataInsert` datetime DEFAULT NULL,
  `dataUpdate` datetime DEFAULT NULL,
  `ativo` tinyint DEFAULT NULL,
  PRIMARY KEY (`idEndereco`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `imagensimovel`
--

DROP TABLE IF EXISTS `imagensimovel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `imagensimovel` (
  `idImagensImovel` int NOT NULL AUTO_INCREMENT,
  `idImovelImagem` int NOT NULL,
  `path` varchar(200) NOT NULL,
  `dataInsert` datetime DEFAULT NULL,
  `dataUpdate` datetime DEFAULT NULL,
  `Ativo` tinyint DEFAULT NULL,
  `name` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`idImagensImovel`),
  KEY `idImovel_idx` (`idImovelImagem`),
  CONSTRAINT `idImovelImagem` FOREIGN KEY (`idImovelImagem`) REFERENCES `imovel` (`idImovel`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `imovel`
--

DROP TABLE IF EXISTS `imovel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `imovel` (
  `idImovel` int NOT NULL AUTO_INCREMENT,
  `idTipo` int NOT NULL,
  `idEndereco` int NOT NULL,
  `numero` int NOT NULL,
  `numComodos` int NOT NULL,
  `numQuartos` int NOT NULL,
  `numBanheiros` int NOT NULL,
  `descricao` varchar(200) DEFAULT NULL,
  `dataInsert` datetime DEFAULT NULL,
  `dataUpdate` datetime DEFAULT NULL,
  `ativo` tinyint DEFAULT NULL,
  `valorAluguel` float DEFAULT NULL,
  `valorVenda` float DEFAULT NULL,
  `complemento` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idImovel`),
  KEY `idTipo_idx` (`idTipo`),
  KEY `idEndereco_idx` (`idEndereco`),
  CONSTRAINT `idEndereco` FOREIGN KEY (`idEndereco`) REFERENCES `endereco` (`idEndereco`),
  CONSTRAINT `idTipo` FOREIGN KEY (`idTipo`) REFERENCES `tipo` (`idTipo`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tipo`
--

DROP TABLE IF EXISTS `tipo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo` (
  `idTipo` int NOT NULL AUTO_INCREMENT,
  `nomeTipo` varchar(45) NOT NULL,
  `dataInsert` datetime DEFAULT NULL,
  `dataUpdate` datetime DEFAULT NULL,
  `Ativo` tinyint DEFAULT NULL,
  PRIMARY KEY (`idTipo`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `idUsuario` int NOT NULL AUTO_INCREMENT,
  `login` varchar(45) NOT NULL,
  `senha` varchar(45) NOT NULL,
  `nomeUsuario` varchar(45) NOT NULL,
  `emailUsuario` varchar(45) NOT NULL,
  `cpfUsuario` varchar(45) NOT NULL,
  `dataInsert` datetime DEFAULT NULL,
  `dataUpdate` datetime DEFAULT NULL,
  `Ativo` tinyint DEFAULT NULL,
  PRIMARY KEY (`idUsuario`),
  UNIQUE KEY `login_UNIQUE` (`login`),
  UNIQUE KEY `cpfUsuario_UNIQUE` (`cpfUsuario`),
  UNIQUE KEY `emailUsuario_UNIQUE` (`emailUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `valoresimovel`
--

DROP TABLE IF EXISTS `valoresimovel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `valoresimovel` (
  `idValoresImovel` int NOT NULL AUTO_INCREMENT,
  `idImovel` int NOT NULL,
  `tipoValor` varchar(45) NOT NULL,
  `valor` float NOT NULL,
  `dataInsert` datetime DEFAULT NULL,
  `dataUpdate` datetime DEFAULT NULL,
  `Ativo` tinyint DEFAULT NULL,
  PRIMARY KEY (`idValoresImovel`),
  KEY `idImovel_idx` (`idImovel`),
  CONSTRAINT `idImovel` FOREIGN KEY (`idImovel`) REFERENCES `imovel` (`idImovel`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-07-20 19:16:32
