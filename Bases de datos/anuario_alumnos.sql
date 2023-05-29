-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: anuario
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `alumnos`
--

DROP TABLE IF EXISTS `alumnos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alumnos` (
  `Num_control` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `correo_electronico` varchar(255) DEFAULT NULL,
  `fotografia` varchar(255) DEFAULT NULL,
  `intereses_academicos` varchar(255) DEFAULT NULL,
  `habilidades_fortalezas` varchar(255) DEFAULT NULL,
  `objetivos_corto_plazo` varchar(255) DEFAULT NULL,
  `objetivos_largo_plazo` varchar(255) DEFAULT NULL,
  `informacion_adicional` varchar(255) DEFAULT NULL,
  `contrasena` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`Num_control`)
) ENGINE=InnoDB AUTO_INCREMENT=190118755 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alumnos`
--

LOCK TABLES `alumnos` WRITE;
/*!40000 ALTER TABLE `alumnos` DISABLE KEYS */;
INSERT INTO `alumnos` VALUES (190115672,'Romel','romel@gmail.com','2c7cbcaf78a8ad3fbce80e36b3b66582','Ciencias de la computación, Matemáticas, Inteligencia artificial','Programación en Python, Resolución de problemas, Trabajo en equipossssssssssss','Obtener buenas calificaciones, Participar en proyectos de investigación.','Obtener un título de posgrado, Contribuir al avance tecnológico en el campo de la IAssssss','Apasionado por la tecnología, dispuesto a aprender y enfrentar nuevos desafíos.','12345'),(190116844,'Jennifer Carbajal Valencia ','jennifer@gmail.com','f87d4013f9ab4e30c3869acb1796676f',' Participado en varios proyectos estudiantiles, donde ha demostrado su capacidad para liderar equipos y entregar resultados de alta calidad.','Habilidad para adaptarse rápidamente a nuevos entornos y aprender nuevas tecnologías.','Obtener una pasantía en una empresa líder en tecnología para aplicar mis conocimientos y adquirir experiencia práctica.','Convertirme en un desarrollador de software altamente especializado y reconocido en la industria.','He recibido reconocimientos académicos por su destacado rendimiento en cursos relacionados con la inteligencia artificial y el desarrollo de aplicaciones móviles.','jennifer'),(190116923,'Medina Lozano Mitzy Joselyn','joselin@gmail.com','70ea3c4ee1e0b3b697861b1464b05072','Ciencias de la computación, Matemáticas, Inteligencia artificial','Programación en Python, Resolución de problemas, Trabajo en equipos','Obtener buenas calificaciones, Participar en proyectos de investigación.','Obtener un título de posgrado, Contribuir al avance tecnológico en el campo de la IA','Apasionado por la tecnología, dispuesto a aprender y enfrentar nuevos desafíos.','12345'),(190118754,'Alejandro Martínez',' alejandromartinez@email.com','083274ac973d84f6a5acb95498a3f7a5',' Gran interés en estudiar y comprender cómo funcionan las organizaciones, desde la planificación estratégica hasta la gestión de recursos humanos y la toma de decisiones financieras.','Destreza en el análisis de datos y capacidad para encontrar soluciones creativas.','Completar con éxito mi último año de estudios en Administración de Empresas.','Convertirme en un ejecutivo de alto nivel en el ámbito empresarial, con énfasis en estrategia y gestión.','He recibido reconocimientos académicos por su destacado rendimiento en cursos de gestión estratégica y análisis financiero.','alejandro');
/*!40000 ALTER TABLE `alumnos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-29 12:14:21
