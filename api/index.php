<?php

ini_set('display_errors', 1);
ini_set('error_reporting', E_ALL);


//Se requiere el archivo de paramatrizacion
require_once("app/config/config-stage.php");

//se llaman a todos los archivos del directorio libs
require_once("app/libs/Core.php");
require_once("app/libs/Database.php");
require_once("app/libs/Controller.php");
//se llama al archivo de helpers
require_once("app/helpers/helpers.php");

$core = new Core();

?>