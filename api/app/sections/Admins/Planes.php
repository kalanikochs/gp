<?php

class Planes extends Controller{
    private $model; 
    
    function __construct($action){
       
        $this->model = $this->assignModel('Admins','PlanesModel');
        if (is_callable(array($this,$action))) {
            $this->$action();            
        }else{
            JSONmessage(show_action_error(get_class($this),$action));
            die();
        }
        
    }

    function mostrarPlanes(){
        
        $plan = $this->model->mostrarPlanes();
        $response;

        if ($plan) {
            $response = successFailure(true);
            $plan = message($plan);
            $response = array_merge($response, $plan);
        }else{
            $response = successFailure(false);
        }

        printJSON($response);
    }

    function activarPlan(){
        $aprobacionPlan = $this->model->activarPlan();
        $response;

        if ($aprobacionPlan) {
            $response = successFailure(true);            
        }else{
            $response = successFailure(false);
        }

        printJSON($response);
    }

    function anularPlan(){
        $anulacionPlan = $this->model->anularPlan();
        $response;

        if ($anulacionPlan) {
            $response = successFailure(true);            
        }else{
            $response = successFailure(false);
        }

        printJSON($response);
    }

    function finalizarPlan(){
        $finalizacionPlan = $this->model->finalizarPlan();
        $response;

        if ($finalizacionPlan) {
            $response = successFailure(true);            
        }else{
            $response = successFailure(false);
        }

        printJSON($response);
    }




}

?>