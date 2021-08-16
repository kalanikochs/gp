<?php

/*Mapear la URL ingresada en el navegador
  1- controlador
  2- metodo
  3- parametro
*/

class Core{
  protected $actualController;
  protected $actualSection;
  protected $actualAction;


  public function __construct(){
    $url=$this->getUrl();

    //1. verifico los componentes de la url
    $this->actualSection = isset($url[0]) ? ucfirst($url[0]) : 'Common';
    $this->actualController = isset($url[1]) ? ucfirst($url[1]) : 'Index';
    $this->actualAction = isset($url[2]) ? ucfirst($url[2]) : 'main';

    //2. requerir la seccion
    if (file_exists("app/sections/".$this->actualSection."/".$this->actualController.".php")) {
      require_once("app/sections/".$this->actualSection."/".$this->actualController.".php");
    }else{
      JSONmessage(show_section_error($this->actualSection, $this->actualController));
      die();
    }

    //3. Iniciar el controlador enviando la accion
    $core = new $this->actualController($this->actualAction);
  
  }

  public function getUrl(){
    
     if (isset($_GET['url'])) {
          $url = rtrim($_GET['url'],'/');
          $url = filter_var($url,FILTER_SANITIZE_URL);
          $url = explode('/',$url);
          return $url;
      }else{
        return array();
      }


  }

}

?>