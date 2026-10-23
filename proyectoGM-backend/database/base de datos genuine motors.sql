-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: genuine_motors
-- ------------------------------------------------------
-- Server version	8.0.46

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
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria` (
  `id_categoria` bigint NOT NULL AUTO_INCREMENT,
  `id_categoria_padre` bigint DEFAULT NULL,
  `nombre` varchar(100) NOT NULL,
  `slug` varchar(120) NOT NULL,
  `orden` int NOT NULL DEFAULT '0',
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  `padre_clave` bigint GENERATED ALWAYS AS (ifnull(`id_categoria_padre`,0)) STORED NOT NULL,
  PRIMARY KEY (`id_categoria`),
  UNIQUE KEY `uq_categoria_slug` (`slug`),
  UNIQUE KEY `uq_categoria_nombre_por_padre` (`padre_clave`,`nombre`),
  KEY `fk_categoria_padre` (`id_categoria_padre`),
  CONSTRAINT `fk_categoria_padre` FOREIGN KEY (`id_categoria_padre`) REFERENCES `categoria` (`id_categoria`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `ck_categoria_orden` CHECK ((`orden` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` (`id_categoria`, `id_categoria_padre`, `nombre`, `slug`, `orden`, `activo`) VALUES (1,NULL,'Motor','motor',1,1),(2,NULL,'Filtros','filtros',2,1),(3,NULL,'Frenos','frenos',3,1),(4,NULL,'Suspension y Direccion','suspension-direccion',4,1),(5,NULL,'Embrague y Transmision','embrague-transmision',5,1),(6,NULL,'Refrigeracion','refrigeracion',6,1),(7,NULL,'Electricidad y Luces','electricidad-luces',7,1),(8,NULL,'Carroceria','carroceria',8,1),(9,NULL,'Afinamiento y Encendido','afinamiento-encendido',9,1),(10,NULL,'Lubricantes','lubricantes',10,1),(11,NULL,'Accesorios','accesorios',11,1),(12,NULL,'Kits de Mantenimiento','kits-mantenimiento',12,1),(13,1,'Pistones','pistones',1,1),(14,1,'Empaquetaduras','empaquetaduras',2,1),(15,1,'Correas de distribucion','correas-distribucion',3,1),(16,2,'Filtros de aceite','filtros-aceite',1,1),(17,2,'Filtros de aire','filtros-aire',2,1),(18,2,'Filtros de combustible','filtros-combustible',3,1),(19,2,'Filtros de cabina','filtros-cabina',4,1),(20,3,'Pastillas de freno','pastillas-freno',1,1),(21,3,'Discos de freno','discos-freno',2,1),(22,3,'Zapatas de freno','zapatas-freno',3,1),(23,4,'Amortiguadores','amortiguadores',1,1),(24,4,'Rotulas','rotulas',2,1),(25,4,'Terminales de direccion','terminales-direccion',3,1),(26,5,'Discos de embrague','discos-embrague',1,1),(27,5,'Collarines','collarines',2,1),(28,6,'Radiadores','radiadores',1,1),(29,6,'Bombas de agua','bombas-agua',2,1),(30,6,'Termostatos','termostatos',3,1),(31,7,'Alternadores','alternadores',1,1),(32,7,'Arrancadores','arrancadores',2,1),(33,7,'Faros','faros',3,1),(34,9,'Bujias','bujias',1,1),(35,9,'Bobinas de encendido','bobinas-encendido',2,1);
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_pedido`
--

DROP TABLE IF EXISTS `detalle_pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_pedido` (
  `id_detalle` bigint NOT NULL AUTO_INCREMENT,
  `id_pedido` bigint NOT NULL,
  `id_producto` bigint NOT NULL,
  `nombre_producto` varchar(200) NOT NULL,
  `precio_unitario` decimal(10,2) NOT NULL,
  `cantidad` int NOT NULL,
  `subtotal` decimal(12,2) GENERATED ALWAYS AS ((`cantidad` * `precio_unitario`)) STORED,
  PRIMARY KEY (`id_detalle`),
  UNIQUE KEY `uq_detalle_pedido_producto` (`id_pedido`,`id_producto`),
  KEY `idx_detalle_pedido_producto` (`id_producto`),
  CONSTRAINT `fk_detalle_pedido_pedido` FOREIGN KEY (`id_pedido`) REFERENCES `pedido` (`id_pedido`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `fk_detalle_pedido_producto` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `ck_detalle_pedido_cantidad` CHECK ((`cantidad` > 0)),
  CONSTRAINT `ck_detalle_pedido_precio` CHECK ((`precio_unitario` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_pedido`
--

LOCK TABLES `detalle_pedido` WRITE;
/*!40000 ALTER TABLE `detalle_pedido` DISABLE KEYS */;
INSERT INTO `detalle_pedido` (`id_detalle`, `id_pedido`, `id_producto`, `nombre_producto`, `precio_unitario`, `cantidad`) VALUES (1,1,1,'Filtro de aceite Hyundai',35.00,2);
/*!40000 ALTER TABLE `detalle_pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventario`
--

DROP TABLE IF EXISTS `inventario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventario` (
  `id_inventario` bigint NOT NULL AUTO_INCREMENT,
  `id_producto` bigint NOT NULL,
  `stock_actual` int NOT NULL DEFAULT '0',
  `stock_minimo` int NOT NULL DEFAULT '0',
  `version` bigint NOT NULL DEFAULT '0',
  `fecha_actualizacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_inventario`),
  UNIQUE KEY `uq_inventario_producto` (`id_producto`),
  CONSTRAINT `fk_inventario_producto` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `ck_inventario_minimo` CHECK ((`stock_minimo` >= 0)),
  CONSTRAINT `ck_inventario_stock` CHECK ((`stock_actual` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventario`
--

LOCK TABLES `inventario` WRITE;
/*!40000 ALTER TABLE `inventario` DISABLE KEYS */;
INSERT INTO `inventario` VALUES (1,1,30,5,3,'2026-10-20 16:39:15'),(2,2,15,5,0,'2026-10-20 12:30:41'),(3,3,10,3,0,'2026-10-20 12:30:41');
/*!40000 ALTER TABLE `inventario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `marca`
--

DROP TABLE IF EXISTS `marca`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `marca` (
  `id_marca` bigint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) NOT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_marca`),
  UNIQUE KEY `uq_marca_nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marca`
--

LOCK TABLES `marca` WRITE;
/*!40000 ALTER TABLE `marca` DISABLE KEYS */;
INSERT INTO `marca` VALUES (1,'Hyundai',1),(2,'Kia',1);
/*!40000 ALTER TABLE `marca` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modelo_vehiculo`
--

DROP TABLE IF EXISTS `modelo_vehiculo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `modelo_vehiculo` (
  `id_modelo` bigint NOT NULL AUTO_INCREMENT,
  `id_marca` bigint NOT NULL,
  `nombre` varchar(80) NOT NULL,
  PRIMARY KEY (`id_modelo`),
  UNIQUE KEY `uq_modelo_vehiculo_nombre` (`id_marca`,`nombre`),
  CONSTRAINT `fk_modelo_vehiculo_marca` FOREIGN KEY (`id_marca`) REFERENCES `marca` (`id_marca`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modelo_vehiculo`
--

LOCK TABLES `modelo_vehiculo` WRITE;
/*!40000 ALTER TABLE `modelo_vehiculo` DISABLE KEYS */;
INSERT INTO `modelo_vehiculo` VALUES (1,1,'Accent'),(5,1,'Creta'),(2,1,'Elantra'),(8,1,'Grand i10'),(6,1,'i10'),(7,1,'i20'),(4,1,'Santa Fe'),(3,1,'Tucson'),(11,2,'Cerato'),(12,2,'Picanto'),(9,2,'Rio'),(14,2,'Seltos'),(15,2,'Sonet'),(13,2,'Sorento'),(10,2,'Sportage');
/*!40000 ALTER TABLE `modelo_vehiculo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movimiento_inventario`
--

DROP TABLE IF EXISTS `movimiento_inventario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movimiento_inventario` (
  `id_movimiento` bigint NOT NULL AUTO_INCREMENT,
  `id_producto` bigint NOT NULL,
  `id_pedido` bigint DEFAULT NULL,
  `tipo` varchar(10) NOT NULL,
  `cantidad` int NOT NULL,
  `stock_resultante` int NOT NULL,
  `motivo` varchar(200) DEFAULT NULL,
  `fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_movimiento`),
  KEY `idx_movimiento_producto_fecha` (`id_producto`,`fecha`),
  KEY `idx_movimiento_pedido` (`id_pedido`),
  CONSTRAINT `fk_movimiento_pedido` FOREIGN KEY (`id_pedido`) REFERENCES `pedido` (`id_pedido`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_movimiento_producto` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `ck_movimiento_cantidad` CHECK ((((`tipo` = _utf8mb4'ENTRADA') and (`cantidad` > 0)) or ((`tipo` = _utf8mb4'SALIDA') and (`cantidad` < 0)) or ((`tipo` = _utf8mb4'AJUSTE') and (`cantidad` <> 0)))),
  CONSTRAINT `ck_movimiento_stock` CHECK ((`stock_resultante` >= 0)),
  CONSTRAINT `ck_movimiento_tipo` CHECK ((`tipo` in (_utf8mb4'ENTRADA',_utf8mb4'SALIDA',_utf8mb4'AJUSTE')))
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movimiento_inventario`
--

LOCK TABLES `movimiento_inventario` WRITE;
/*!40000 ALTER TABLE `movimiento_inventario` DISABLE KEYS */;
INSERT INTO `movimiento_inventario` VALUES (1,1,NULL,'ENTRADA',10,35,'PRUEBA-GM-ENTRADA-001','2026-10-20 12:32:36'),(2,1,NULL,'SALIDA',-3,32,'PRUEBA-GM-SALIDA-001','2026-10-20 12:33:10'),(3,1,1,'SALIDA',-2,30,'Salida por pedido GM-PRUEBA-001','2026-10-20 16:39:15');
/*!40000 ALTER TABLE `movimiento_inventario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedido`
--

DROP TABLE IF EXISTS `pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedido` (
  `id_pedido` bigint NOT NULL AUTO_INCREMENT,
  `id_usuario` bigint NOT NULL,
  `numero_pedido` varchar(20) NOT NULL,
  `estado` varchar(20) NOT NULL DEFAULT 'PENDIENTE',
  `tipo_entrega` varchar(20) NOT NULL,
  `subtotal` decimal(12,2) NOT NULL,
  `descuento` decimal(12,2) NOT NULL DEFAULT '0.00',
  `costo_envio` decimal(12,2) NOT NULL DEFAULT '0.00',
  `total` decimal(12,2) NOT NULL,
  `direccion_envio` varchar(255) DEFAULT NULL,
  `distrito` varchar(80) DEFAULT NULL,
  `telefono_contacto` varchar(20) NOT NULL,
  `fecha_pedido` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_actualizacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_pedido`),
  UNIQUE KEY `uq_pedido_numero` (`numero_pedido`),
  KEY `idx_pedido_usuario_fecha` (`id_usuario`,`fecha_pedido`),
  KEY `idx_pedido_estado` (`estado`),
  CONSTRAINT `fk_pedido_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `ck_pedido_direccion` CHECK (((`tipo_entrega` = _utf8mb4'RECOJO_TIENDA') or ((`direccion_envio` is not null) and (`distrito` is not null)))),
  CONSTRAINT `ck_pedido_entrega` CHECK ((`tipo_entrega` in (_utf8mb4'DELIVERY',_utf8mb4'RECOJO_TIENDA'))),
  CONSTRAINT `ck_pedido_envio_recojo` CHECK (((`tipo_entrega` = _utf8mb4'DELIVERY') or (`costo_envio` = 0))),
  CONSTRAINT `ck_pedido_estado` CHECK ((`estado` in (_utf8mb4'PENDIENTE',_utf8mb4'PAGADO',_utf8mb4'PREPARANDO',_utf8mb4'ENVIADO',_utf8mb4'ENTREGADO',_utf8mb4'CANCELADO'))),
  CONSTRAINT `ck_pedido_montos` CHECK (((`subtotal` >= 0) and (`descuento` >= 0) and (`costo_envio` >= 0) and (`descuento` <= `subtotal`))),
  CONSTRAINT `ck_pedido_total` CHECK ((`total` = ((`subtotal` - `descuento`) + `costo_envio`)))
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido`
--

LOCK TABLES `pedido` WRITE;
/*!40000 ALTER TABLE `pedido` DISABLE KEYS */;
INSERT INTO `pedido` VALUES (1,1,'GM-PRUEBA-001','PENDIENTE','RECOJO_TIENDA',70.00,0.00,0.00,70.00,NULL,NULL,'999999999','2026-10-20 16:35:23','2026-10-20 16:35:23');
/*!40000 ALTER TABLE `pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto` (
  `id_producto` bigint NOT NULL AUTO_INCREMENT,
  `id_categoria` bigint NOT NULL,
  `id_marca` bigint NOT NULL,
  `sku` varchar(40) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `descripcion` text,
  `precio_venta` decimal(10,2) NOT NULL,
  `precio_lista` decimal(10,2) DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  `fecha_creacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_actualizacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_producto`),
  UNIQUE KEY `uq_producto_sku` (`sku`),
  KEY `idx_producto_categoria_activo` (`id_categoria`,`activo`),
  KEY `idx_producto_marca` (`id_marca`),
  FULLTEXT KEY `ft_producto_busqueda` (`nombre`,`descripcion`),
  CONSTRAINT `fk_producto_categoria` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_producto_marca` FOREIGN KEY (`id_marca`) REFERENCES `marca` (`id_marca`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `ck_producto_precio_lista` CHECK (((`precio_lista` is null) or (`precio_lista` >= `precio_venta`))),
  CONSTRAINT `ck_producto_precio_venta` CHECK ((`precio_venta` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES (1,16,1,'GM-HY-001','Filtro de aceite Hyundai','Producto de prueba para el catálogo Genuine Motors',35.00,45.00,1,'2026-10-20 12:28:34','2026-10-20 12:28:34'),(2,17,1,'GM-HY-002','Filtro de aire Hyundai','Producto de prueba para el catálogo Genuine Motors',55.00,70.00,1,'2026-10-20 12:28:34','2026-10-20 12:28:34'),(3,20,2,'GM-KI-001','Pastillas de freno Kia','Producto de prueba para el catálogo Genuine Motors',120.00,150.00,1,'2026-10-20 12:28:34','2026-10-20 12:28:34'),(4,16,1,'GM-HY-003','Filtro de combustible Hyundai','Filtro de combustible para vehiculos Hyundai',60.00,80.00,1,'2026-10-23 00:10:27','2026-10-23 00:13:44');
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto_imagen`
--

DROP TABLE IF EXISTS `producto_imagen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto_imagen` (
  `id_imagen` bigint NOT NULL AUTO_INCREMENT,
  `id_producto` bigint NOT NULL,
  `ruta` varchar(255) NOT NULL,
  `texto_alt` varchar(200) DEFAULT NULL,
  `orden` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_imagen`),
  UNIQUE KEY `uq_producto_imagen_orden` (`id_producto`,`orden`),
  CONSTRAINT `fk_producto_imagen_producto` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `ck_producto_imagen_orden` CHECK ((`orden` >= 0)),
  CONSTRAINT `ck_producto_imagen_ruta` CHECK (((char_length(trim(`ruta`)) > 0) and (not((`ruta` like _utf8mb4'%..%')))))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto_imagen`
--

LOCK TABLES `producto_imagen` WRITE;
/*!40000 ALTER TABLE `producto_imagen` DISABLE KEYS */;
/*!40000 ALTER TABLE `producto_imagen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto_vehiculo`
--

DROP TABLE IF EXISTS `producto_vehiculo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto_vehiculo` (
  `id_compatibilidad` bigint NOT NULL AUTO_INCREMENT,
  `id_producto` bigint NOT NULL,
  `id_vehiculo` bigint NOT NULL,
  `observacion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_compatibilidad`),
  UNIQUE KEY `uq_producto_vehiculo_par` (`id_producto`,`id_vehiculo`),
  KEY `idx_producto_vehiculo_inverso` (`id_vehiculo`,`id_producto`),
  CONSTRAINT `fk_producto_vehiculo_producto` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `fk_producto_vehiculo_vehiculo` FOREIGN KEY (`id_vehiculo`) REFERENCES `vehiculo` (`id_vehiculo`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto_vehiculo`
--

LOCK TABLES `producto_vehiculo` WRITE;
/*!40000 ALTER TABLE `producto_vehiculo` DISABLE KEYS */;
/*!40000 ALTER TABLE `producto_vehiculo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `id_rol` bigint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) NOT NULL,
  `descripcion` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id_rol`),
  UNIQUE KEY `uq_rol_nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES (1,'ADMIN','Administrador del sistema Genuine Motors'),(2,'CLIENTE','Cliente que puede consultar productos y realizar pedidos');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id_usuario` bigint NOT NULL AUTO_INCREMENT,
  `id_rol` bigint NOT NULL,
  `nombres` varchar(100) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  `fecha_creacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_actualizacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `uq_usuario_email` (`email`),
  KEY `fk_usuario_rol` (`id_rol`),
  CONSTRAINT `fk_usuario_rol` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `ck_usuario_email` CHECK ((`email` like _utf8mb4'%_@_%')),
  CONSTRAINT `ck_usuario_hash` CHECK ((char_length(`password_hash`) >= 60))
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,2,'Cliente','Prueba','cliente.prueba@genuinemotors.test','$2a$10$Xrxra6GWVNHFmfhKZ6KIC.Bdf8KJq0cGnW8Csmg7r2fl0hkPAZNvu',NULL,1,'2026-10-20 16:31:03','2026-10-20 16:31:03');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehiculo`
--

DROP TABLE IF EXISTS `vehiculo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehiculo` (
  `id_vehiculo` bigint NOT NULL AUTO_INCREMENT,
  `id_modelo` bigint NOT NULL,
  `anio_inicio` smallint NOT NULL,
  `anio_fin` smallint DEFAULT NULL,
  `motor` varchar(60) NOT NULL,
  `combustible` varchar(20) NOT NULL,
  `transmision` varchar(20) NOT NULL,
  PRIMARY KEY (`id_vehiculo`),
  UNIQUE KEY `uq_vehiculo_version` (`id_modelo`,`anio_inicio`,`motor`,`combustible`,`transmision`),
  KEY `idx_vehiculo_anios` (`id_modelo`,`anio_inicio`,`anio_fin`),
  CONSTRAINT `fk_vehiculo_modelo` FOREIGN KEY (`id_modelo`) REFERENCES `modelo_vehiculo` (`id_modelo`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `ck_vehiculo_anio_fin` CHECK (((`anio_fin` is null) or ((`anio_fin` >= `anio_inicio`) and (`anio_fin` <= 2100)))),
  CONSTRAINT `ck_vehiculo_anio_inicio` CHECK ((`anio_inicio` between 1950 and 2100)),
  CONSTRAINT `ck_vehiculo_combustible` CHECK ((`combustible` in (_utf8mb4'GASOLINA',_utf8mb4'DIESEL',_utf8mb4'HIBRIDO',_utf8mb4'ELECTRICO',_utf8mb4'GLP',_utf8mb4'GNV'))),
  CONSTRAINT `ck_vehiculo_transmision` CHECK ((`transmision` in (_utf8mb4'MANUAL',_utf8mb4'AUTOMATICA',_utf8mb4'CVT',_utf8mb4'DCT')))
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehiculo`
--

LOCK TABLES `vehiculo` WRITE;
/*!40000 ALTER TABLE `vehiculo` DISABLE KEYS */;
INSERT INTO `vehiculo` VALUES (1,1,2018,2022,'1.4L','GASOLINA','MANUAL'),(2,2,2020,2023,'1.6L','GASOLINA','AUTOMATICA'),(3,9,2018,2022,'1.4L','GASOLINA','MANUAL');
/*!40000 ALTER TABLE `vehiculo` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-10-23  0:56:59
