<?php

class Planes extends Controller{
    private $model; 
    
    function __construct($action){
       
        $this->model = $this->assignModel('Shared','PlanesModel');
        if (is_callable(array($this,$action))) {
            $this->$action();            
        }else{
            JSONmessage(show_action_error(get_class($this),$action));
            die();
        }
        
    }

    function mostrarPlanActual(){

        $planActual = $this->model->mostrarPlanActual();
        $response;       

        if ($planActual) {
            $response = successFailure(true);
            $planActual = message($planActual);
            $response = array_merge($response, $planActual);
        }else{
            $response = successFailure(false);
        }

        printJSON($response);
    } 
}

?>