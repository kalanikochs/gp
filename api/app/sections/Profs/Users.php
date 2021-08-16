<?php

class Users extends Controller{
    private $model; 
    
    function __construct($action){
       
        $this->model = $this->assignModel('Profs','UsersModel');
        if (is_callable(array($this,$action))) {
            $this->$action();            
        }else{
            JSONmessage(show_action_error(get_class($this),$action));
            die();
        }
        
    }

    function mostrarUsuarios(){
        $usuarios = $this->model->mostrarUsuarios();

        if ($usuarios) {
            $response = successFailure(true);
            $usuarios = message($usuarios);
            $response = array_merge($response, $usuarios);
        }else{
            $response = successFailure(false);
        }

        printJSON($response);
    }
}

?>