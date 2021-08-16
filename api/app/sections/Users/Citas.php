<?php

class Citas extends Controller{
    private $model; 
    
    function __construct($action){
       
        $this->model = $this->assignModel('Users','CitasModel');
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

    function confirmarCita(){
        $confirmacionCita = $this->model->confirmarCita();
        $response;

        if ($confirmacionCita) {
            $response = successFailure(true);            
        }else{
            $response = successFailure(false);
        }

        printJSON($response);
    }

    function anularCita(){
        $anulacionCita = $this->model->anularCita();
        $response;

        if ($anulacionCita) {
            $response = successFailure(true);            
        }else{
            $response = successFailure(false);
        }

        printJSON($response);
    }  
    
    function mostrarTipoCita(){

        $tipoCita = $this->model->mostrarTipoCita();
        $response;

        if ($tipoCita) {
            $response = successFailure(true);
            $tipoCita = message($tipoCita);
            $response = array_merge($response, $tipoCita);
        }else{
            $response = successFailure(false);
        }

        printJSON($response);
    }

}

?>