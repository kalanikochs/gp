<?php

class Profs extends Controller{
    private $model; 
    
    function __construct($action){
       
        $this->model = $this->assignModel('Users','ProfsModel');
        if (is_callable(array($this,$action))) {
            $this->$action();            
        }else{
            JSONmessage(show_action_error(get_class($this),$action));
            die();
        }
        
    }

    function mostrarProfesionales(){
        $profesionales = $this->model->mostrarProfesionales();

        if ($profesionales) {
            $response = successFailure(true);
            $profesionales = message($profesionales);
            $response = array_merge($response, $profesionales);
        }else{
            $response = successFailure(false);
        }

        printJSON($response);
    }
}

?>