-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 25-05-2021 a las 01:50:52
-- Versión del servidor: 10.3.24-MariaDB-cll-lve
-- Versión de PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `u363826452_gastropack`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alimento`
--

CREATE TABLE `alimento` (
  `alimento_id` int(11) NOT NULL,
  `grupoalimenticio_id` int(11) NOT NULL,
  `alimento_nombre` varchar(100) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `alimento`
--

INSERT INTO `alimento` (`alimento_id`, `grupoalimenticio_id`, `alimento_nombre`) VALUES
(1, 1, 'Banano 1/2 unidad'),
(2, 1, 'Ciruelas 4 unidades med.'),
(3, 1, 'Curuba 3 unidades'),
(4, 1, 'Durazno 2 unidades pequeña'),
(5, 1, 'Durazno 1 unidad grande'),
(6, 1, 'Feijoa 4 unidades'),
(7, 1, 'Fresas 10 unidades mediana'),
(8, 1, 'Granadilla 3 unidades'),
(9, 1, 'Guanábana 6 cucharadas'),
(10, 1, 'Guayaba 3 unidades mediana'),
(11, 1, 'Kiwi 1 unidad'),
(12, 1, 'Lima 1 unidad'),
(13, 1, 'Lulo 1 unidad'),
(14, 1, 'Mandarina 2 unidades pequeña'),
(15, 1, 'Mango 1 pocillo'),
(16, 1, 'Manzana 1 unidad'),
(17, 1, 'Maracuyá 2 unidades pequeña'),
(18, 1, 'Melón 2 pocillos'),
(19, 1, 'Mora 1 pocillo'),
(20, 1, 'Naranja 2 unidades mediana'),
(21, 1, 'Papaya 1 pocillo'),
(22, 1, 'Pera 1 unidad mediana'),
(23, 1, 'Piña 1 rodaja pequeña'),
(24, 1, 'Pitaya 1 unidad pequeña'),
(25, 1, 'Sandia 1 pocillo'),
(26, 1, 'Toronja 1 unidad'),
(27, 1, 'Uchuvas 1/2 pocillo'),
(28, 1, 'Uvas 14 unidades'),
(29, 2, 'Auyama 1 pocillo'),
(30, 2, 'Berenjena 1 pocillo'),
(31, 2, 'Remolacha 1 pocillo'),
(32, 2, 'Zanahoria 1 pocillo'),
(33, 3, 'Mazorca 1 unidad pequeña'),
(34, 3, 'Mazorca desgranado 1/2 pocillo'),
(35, 3, 'Ñame 1 unidad mediana'),
(36, 3, 'Papa 1 unidad mediana'),
(37, 3, 'Papa criolla 4 pequeñas'),
(38, 3, 'Papa a la francesa 6 unidades'),
(39, 3, 'Paquete de papas 1 unidad pequeña'),
(40, 3, 'Plátano 1/4 unidad mediana'),
(41, 3, 'Quinua 1/2 pocillo'),
(42, 3, 'Yuca 1 unidad mediana'),
(43, 4, 'Almohabana 1/2 unidad'),
(44, 4, 'Arepa de chocolo 1/2 unidad'),
(45, 4, 'Arepa plana 1/2 unidad mediana'),
(46, 4, 'Arepa plana 1 extradelgada'),
(47, 4, 'Arroz cocido 1/2 pocillo'),
(48, 4, 'Avena hojuelas 3 cucharadas'),
(49, 4, 'Buluelo 1 unidad pequeña'),
(50, 4, 'Cereal integral 3/4 pcillo'),
(51, 4, 'Galleta soda 3 unidades'),
(52, 4, 'Galletas de avena 2 unidades pequeñas'),
(53, 4, 'Galletas miel integral 2 unidades'),
(54, 4, 'Galletas saladas 3 unidades'),
(55, 4, 'Granola light 1/2 pocillo'),
(56, 4, 'Mantecada 1 tajada delgada'),
(57, 4, 'Pan arabe 1/2 unidad'),
(58, 4, 'Pan baguette 2 tajadas'),
(59, 4, 'Pan blanco 1 tajada'),
(60, 4, 'Pan de centeno 1 tajada'),
(61, 4, 'Pan de queso 1/2 unidad'),
(62, 4, 'Pan de yuca 1/2 unidad'),
(63, 4, 'Pan integral 1 tajada'),
(64, 4, 'Pan light 2 tajadas'),
(65, 4, 'Pasta cocida 1 pocillo'),
(66, 4, 'Tortilla integral 1 unidad'),
(67, 4, 'Tostadas 2 unidades pequeñas'),
(68, 4, 'Wrap 1 unidad delgada'),
(69, 5, 'Jugo de fruta 1/2 pocillo'),
(70, 6, 'Arveja 1/pocillo'),
(71, 6, 'Frijol 1/2 pocillo'),
(72, 6, 'Garbanzo 1/2 pocillo'),
(73, 6, 'Habas 1/2 pocillo'),
(74, 6, 'Lenteja 1/2 pocillo'),
(75, 6, 'Soya 3/4 pocillo'),
(76, 7, 'Avena baja en grasa 1 vaso'),
(77, 7, 'Kumis 1/2 vaso pequeño'),
(78, 7, 'Kumis bajo en grasa 1 vaso pequeño'),
(79, 7, 'Leche de soya light 1 vaso pequeño'),
(80, 7, 'Leche descremada 1 pocillo'),
(81, 7, 'Leche deslactosada 1 pocillo'),
(82, 7, 'Yogurt 1/2 vaso'),
(83, 7, 'Yogurt bajo en grasa 1 vaso'),
(84, 8, 'Acelgas'),
(85, 8, 'Alcachofa'),
(86, 8, 'Apio'),
(87, 8, 'Berro'),
(88, 8, 'Brocolo'),
(89, 8, 'Calabacín'),
(90, 8, 'Cebolla'),
(91, 8, 'Cohombro'),
(92, 8, 'Col'),
(93, 8, 'Coliflor'),
(94, 8, 'Champiñon'),
(95, 8, 'Encurtidos'),
(96, 8, 'Espárragos'),
(97, 8, 'Espinacas'),
(98, 8, 'Lechuga'),
(99, 8, 'Palmito'),
(100, 8, 'Pepino común'),
(101, 8, 'Pimentón'),
(102, 8, 'Raices chinas'),
(103, 8, 'Repollo'),
(104, 8, 'Tomate'),
(105, 9, 'Chicles sin azucar'),
(106, 9, 'Dulces sin azucar'),
(107, 9, 'Gelatina sin azucar'),
(108, 9, 'Mermelada sin azucar'),
(109, 10, 'Ají'),
(110, 10, 'Ajo'),
(111, 10, 'Alcaparra'),
(112, 10, 'Cilantro'),
(113, 10, 'Laurel'),
(114, 10, 'Orégano'),
(115, 10, 'Paprica'),
(116, 10, 'Perejil'),
(117, 10, 'Pimienta'),
(118, 10, 'Soya 3/4 pocillo'),
(119, 10, 'Tomillo'),
(120, 10, 'Vinagre'),
(121, 11, 'Agua'),
(122, 11, 'Agua con gas'),
(123, 11, 'Agua saborizada'),
(124, 11, 'Aromática de hierbas'),
(125, 11, 'Café negro descafeinados'),
(126, 11, 'Gaseosa sin azúcar'),
(127, 11, 'Limonada sin azúcar'),
(128, 11, 'Té verde'),
(129, 12, 'Vino blanco'),
(130, 12, 'Vino tinto'),
(131, 13, 'Endulzante sin calorias'),
(132, 13, 'Stevia'),
(133, 14, 'Carne de cerdo 120 gr'),
(134, 14, 'Carne de res 120 gr.'),
(135, 14, 'Hígado 120 gr'),
(136, 14, 'Lengua 120 gr'),
(137, 14, 'Pavo sin piel 120 gr'),
(138, 14, 'Pollo sin piel 120 gr'),
(139, 15, 'Arenque 120 gr'),
(140, 15, 'Atún en agua 1 lata'),
(141, 15, 'Bagre 120 gr'),
(142, 15, 'Corvina 120 gr'),
(143, 15, 'Mero 120 gr'),
(144, 15, 'Mojarra 120 gr'),
(145, 15, 'Nicuro 120 gr'),
(146, 15, 'Pargo Rojo 120 gr'),
(147, 15, 'Róbalo 120 gr'),
(148, 15, 'Salmón 120 gr'),
(149, 15, 'Trucha 120 gr'),
(150, 16, 'Calamares 120 gr'),
(151, 16, 'Camarón 120 gr'),
(152, 16, 'Langosta 120 gr'),
(153, 16, 'Mejillón 120 gr'),
(154, 16, 'Ostión 120 gr'),
(155, 16, 'Pulpo 120 gr'),
(156, 17, 'Claras 4 unidades'),
(157, 17, 'Huevo de codorniz 4 und'),
(158, 17, 'Huevos 2 und'),
(159, 18, 'Jamón de cerdo 2 tajadas'),
(160, 18, 'Jamón de pavo 2 tajadas'),
(161, 18, 'Jamón de pollo 2 tajadas'),
(162, 18, 'Salchicas 2 und'),
(163, 19, 'Campesino 100 gr'),
(164, 19, 'Costeño 60 gr'),
(165, 19, 'Cottage 1/2 pocillo'),
(166, 19, 'Cuajada 60 gr'),
(167, 19, 'Fundido 60 gr'),
(168, 19, 'Holandes 60 gr'),
(169, 19, 'Mozarella 100'),
(170, 19, 'Pera 60 gr'),
(171, 19, 'Requesón 100 gr'),
(172, 19, 'Semidescremado 60 gr'),
(173, 20, 'Aceite de canola 1 cucharada'),
(174, 20, 'Aceite de girasol 1 cucharada'),
(175, 20, 'Aceite de oliva 1 cucharada'),
(176, 20, 'Aceite de soya 1 cucharada'),
(177, 20, 'Aderezo de vinagreta 1 cucharada'),
(178, 21, 'Aceitunas 6 piezas'),
(179, 21, 'Aguacate 2 cucharadas'),
(180, 21, 'Almendras 6 piezas'),
(181, 21, 'Crema de leche 1 cucharada'),
(182, 21, 'Maní 14 piezas'),
(183, 21, 'Nueces 6 piezas'),
(184, 21, 'Queso crema 2 cucharadas'),
(185, 21, 'Semillas de girasol 2 cucharadas'),
(186, 21, 'Semillas del inaza 2 cucharadas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grupoalimenticio`
--

CREATE TABLE `grupoalimenticio` (
  `grupoalimenticio_id` int(11) NOT NULL,
  `grupoalimenticio_tipo` int(11) NOT NULL,
  `grupoalimenticio_nombre` varchar(100) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `grupoalimenticio`
--

INSERT INTO `grupoalimenticio` (`grupoalimenticio_id`, `grupoalimenticio_tipo`, `grupoalimenticio_nombre`) VALUES
(1, 1, 'Frutas'),
(2, 1, 'Verdura B'),
(3, 1, 'Verdura C'),
(4, 1, 'Cereales 1'),
(5, 1, 'Bebidas 2'),
(6, 1, 'Leguminosas'),
(7, 1, 'Lacteos'),
(8, 2, 'Verdura A'),
(9, 2, 'Postres'),
(10, 2, 'Condimentos'),
(11, 2, 'Bebidas 1'),
(12, 2, 'Licores'),
(13, 2, 'Edulcorantes'),
(14, 3, 'Carnes'),
(15, 3, 'Pescados'),
(16, 3, 'Mariscos'),
(17, 3, 'Huevos'),
(18, 3, 'Embutidos'),
(19, 3, 'Quesos'),
(20, 4, 'Aceites'),
(21, 4, 'Grasas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jornadaalimenticia`
--

CREATE TABLE `jornadaalimenticia` (
  `jornadaalimenticia_id` int(11) NOT NULL,
  `jornadaalimenticia_nombre` longtext COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `jornadaalimenticia`
--

INSERT INTO `jornadaalimenticia` (`jornadaalimenticia_id`, `jornadaalimenticia_nombre`) VALUES
(1, 'Desayuno'),
(2, 'Mediamañana'),
(3, 'Almuerzo'),
(4, 'Mediatarde'),
(5, 'Cena');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alimento`
--
ALTER TABLE `alimento`
  ADD PRIMARY KEY (`alimento_id`);

--
-- Indices de la tabla `grupoalimenticio`
--
ALTER TABLE `grupoalimenticio`
  ADD PRIMARY KEY (`grupoalimenticio_id`);

--
-- Indices de la tabla `jornadaalimenticia`
--
ALTER TABLE `jornadaalimenticia`
  ADD PRIMARY KEY (`jornadaalimenticia_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alimento`
--
ALTER TABLE `alimento`
  MODIFY `alimento_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=187;

--
-- AUTO_INCREMENT de la tabla `grupoalimenticio`
--
ALTER TABLE `grupoalimenticio`
  MODIFY `grupoalimenticio_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `jornadaalimenticia`
--
ALTER TABLE `jornadaalimenticia`
  MODIFY `jornadaalimenticia_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
