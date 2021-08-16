<?php

class Profs extends Controller{
    private $model; 
    
    function __construct($action){
       
        $this->model = $this->assignModel('Admins','ProfsModel');
        if (is_callable(array($this,$action))) {
            $this->$action();            
        }else{
            JSONmessage(show_action_error(get_class($this),$action));
            die();
        }
        
    }

    function mostrarProfesionales(){

        $profesionales = $this->model->mostrarProfesionales();
        $response;

        if ($profesionales) {
            $response = successFailure(true);
            $profesionales = message($profesionales);
            $response = array_merge($response, $profesionales);
        }else{
            $response = successFailure(false);
        }

        printJSON($response);
    }

    function agregarProfesional(){
                        
        $agregarProfesional = $this->model->agregarProfesional();
        $response;

        if ($agregarProfesional) {
            $response = successFailure(true);            
        }else{
            $response = successFailure(false);
        }

        printJSON($response);
    }

    function suspenderProfesional(){
        $suspensionProfesional = $this->model->suspenderProfesional();
        $response;

        if ($suspensionProfesional) {
            $response = successFailure(true);            
        }else{
            $response = successFailure(false);
        }

        printJSON($response);
    }

    function eliminarProfesional(){
        $eliminacionProfesional = $this->model->eliminarProfesional();
        $response;

        if ($eliminacionProfesional) {
            $response = successFailure(true);            
        }else{
            $response = successFailure(false);
        }

        printJSON($response);
    }

    function activarProfesional(){
        $activacionProfesional = $this->model->activarProfesional();
        $response;

        if ($activacionProfesional) {
            $response = successFailure(true);            
        }else{
            $response = successFailure(false);
        }

        printJSON($response);
    }

    function mostrarTipoPersona(){

        $tipoPersona = $this->model->mostrarTipoPersona();
        $response;

        if ($tipoPersona) {
            $response = successFailure(true);
            $tipoPersona = message($tipoPersona);
            $response = array_merge($response, $tipoPersona);
        }else{
            $response = successFailure(false);
        }

        printJSON($response);
    }

}

?>