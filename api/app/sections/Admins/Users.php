<?php

class Users extends Controller{
    private $model; 
    
    function __construct($action){
       
        $this->model = $this->assignModel('Admins','UsersModel');
        if (is_callable(array($this,$action))) {
            $this->$action();            
        }else{
            JSONmessage(show_action_error(get_class($this),$action));
            die();
        }
        
    }

    function mostrarUsuarios(){

        $usuarios = $this->model->mostrarUsuarios();
        $response;

        if ($usuarios) {
            $response = successFailure(true);
            $usuarios = message($usuarios);
            $response = array_merge($response, $usuarios);
        }else{
            $response = successFailure(false);
        }

        printJSON($response);
    }

    function suspenderUsuario(){
        $suspensionUsuario = $this->model->suspenderUsuario();
        $response;

        if ($suspensionUsuario) {
            $response = successFailure(true);            
        }else{
            $response = successFailure(false);
        }

        printJSON($response);
    }

    function eliminarUsuario(){
        $eliminacionUsuario = $this->model->eliminarUsuario();
        $response;

        if ($eliminacionUsuario) {
            $response = successFailure(true);            
        }else{
            $response = successFailure(false);
        }

        printJSON($response);
    }

    function activarUsuario(){
        $activacionUsuario = $this->model->activarUsuario();
        $response;

        if ($activacionUsuario) {
            $response = successFailure(true);            
        }else{
            $response = successFailure(false);
        }

        printJSON($response);
    }

    function agregarUsuario(){
        $agregarUsuario = $this->model->agregarUsuario();
        $response;

        if ($agregarUsuario) {
            $response = successFailure(true);            
        }else{
            $response = successFailure(false);
        }

        printJSON($response);
    }

    
}

?>