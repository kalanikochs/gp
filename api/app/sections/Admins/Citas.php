<?php

class Citas extends Controller{
    private $model; 
    
    function __construct($action){
       
        $this->model = $this->assignModel('Admins','CitasModel');
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

    function aprobarCita(){
        $aprobacionCita = $this->model->aprobarCita();
        $response;

        if ($aprobacionCita) {
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

    function activarCita(){
        $activacionCita = $this->model->activarCita();
        $response;

        if ($activacionCita) {
            $response = successFailure(true);            
        }else{
            $response = successFailure(false);
        }

        printJSON($response);
    }

    function modificarFechaCita(){
        $modificacionCita = $this->model->modificarFechaCita();
        $response;

        if ($modificacionCita) {
            $response = successFailure(true);            
        }else{
            $response = successFailure(false);
        }

        printJSON($response);
    }
    
}

?>