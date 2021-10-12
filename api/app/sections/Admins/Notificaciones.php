<?php

class Notificaciones extends Controller {
    private $model; 

    function __construct($action){

        $this->model = $this->assignModel('Admins','NotificationsModel');
        if (is_callable(array($this,$action))) {
            $this->$action();            
        }else{
            JSONmessage(show_action_error(get_class($this),$action));
            die();
        }

    }

    function notificaciones(){

        $usuarios = $this->model->notificaciones();
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

    function savePush() {
        $notificaciones = $this->model->savePush();
        $response;
        if($notificaciones) {
            $response = successFailure(true);
            $usuarios = message(['asi es']);
            $response = array_merge($response, $usuarios);
        } else {
            $response = successFailure(false);
            $response = array_merge($response, ['abce']);
        }

        printJSON($response);
    }
}