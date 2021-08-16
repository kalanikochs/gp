<?php

class Citas extends Controller{
    private $model; 
    
    function __construct($action){
       
        $this->model = $this->assignModel('Profs','CitasModel');
        if (is_callable(array($this,$action))) {
            $this->$action();            
        }else{
            JSONmessage(show_action_error(get_class($this),$action));
            die();
        }
        
    }

    function mostrarCitas(){

        $citas = $this->model->mostrarCitas();
        $response;

        if ($citas) {
            $response = successFailure(true);
            $citas = message($citas);
            $response = array_merge($response, $citas);
        }else{
            $response = successFailure(false);
        }

        printJSON($response);
    }

    function solicitarCita(){

        $solicitudCita = $this->model->solicitarCita();
        $response;

        if ($solicitudCita) {
            $response = successFailure(true);            
        }else{
            $response = successFailure(false);
        }

        printJSON($response);
    }

    function asignarResultadoCita(){

        $resultadoCita = $this->model->asignarResultadoCita();
        $response;

        if ($resultadoCita) {
            $response = successFailure(true);            
        }else{
            $response = successFailure(false);
        }

        printJSON($response);
    }
}

?>