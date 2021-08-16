<?php

class Evidencias extends Controller{
    private $model; 
    
    function __construct($action){
       
        $this->model = $this->assignModel('Shared','EvidenciasModel');
        if (is_callable(array($this,$action))) {
            $this->$action();            
        }else{
            JSONmessage(show_action_error(get_class($this),$action));
            die();
        }
        
    }

    function mostrarEvidencias(){

        $evidencias = $this->model->mostrarEvidencias();
        $response;       

        if ($evidencias) {
            $response = successFailure(true);
            $evidencias = message($evidencias);
            $response = array_merge($response, $evidencias);
        }else{
            $response = successFailure(false);
            $mensaje = message('No hay evidencias');
            $response = array_merge($response,$mensaje);
        }

        printJSON($response);
    }

    function agregarEvidencia(){

        $solicitudEvidencia = $this->model->agregarEvidencia();
        
        printJSON($solicitudEvidencia);
    }
    
    function agregarEvidenciaMobile(){

        $solicitudEvidencia = $this->model->agregarEvidenciaMobile();
        
        printJSON($solicitudEvidencia);
    }     
}

?>