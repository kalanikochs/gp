<?php

//se encarga de poder cargar los modelos y las vistas

class Controller{
    //cargar controlador
    public function assignModel($sectionModel,$controllerModel){

      $sectionModel = ucfirst($sectionModel);
      $controllerModel = ucfirst($controllerModel);  
       
      $classPath = 'app/models/'.$sectionModel."/".$controllerModel.'.php';
    
        if (file_exists($classPath)) {
            require_once $classPath;
            //instanciar el modelo
            return new $controllerModel;
       }else{
            //si el archivo no existe imprima un error
            JSONmessage(show_model_error($sectionModel, $controllerModel));
            die();
       }
    }
}

 ?>
