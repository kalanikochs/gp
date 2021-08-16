<?php

class Planes extends Controller{
    private $model; 
    
    function __construct($action){
       
        $this->model = $this->assignModel('Users','PlanesModel');
        if (is_callable(array($this,$action))) {
            $this->$action();            
        }else{
            JSONmessage(show_action_error(get_class($this),$action));
            die();
        }
        
    }

    function mostrarPlanes(){

        $planes = $this->model->mostrarPlanes();
        $response;       

        if ($planes) {
            $response = successFailure(true);
            $planes = message($planes);
            $response = array_merge($response, $planes);
        }else{
            $response = successFailure(false);
        }

        printJSON($response);
    }
   
}

?>