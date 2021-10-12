<?php

class Deporte extends Controller {

    private $model;

    function __construct($action) {
        session_start();
        $this->model = $this->assignModel('Common','DeporteModel');
        if (is_callable(array($this,$action))) {
            $this->$action();
        } else {
            JSONmessage(show_action_error(get_class($this),$action));
            die();
        }
    }

    function showDeportes() {
        textHeaders();
        $foods = ['message'=> $this->model->showDeportes()] ;

        $success = successFailure(true);
        $response = array_merge($success,$foods);

        printJSON($response);
    }

    function addDeportes() {
        textHeaders();
       $foods = ['message'=> $this->model->addDeportes()] ;

       $success = successFailure(true);
       $response = array_merge($success,$foods);

       printJSON($response);

    }
    
    function grupoDeportivo() {
       textHeaders();
       $foods = ['message'=> $this->model->grupoDeportivo()] ;

       $success = successFailure(true);
       $response = array_merge($success,$foods);

       printJSON($response);

    }
    
    function Ejercicio() {
       textHeaders();
       $foods = ['message'=> $this->model->Ejercicio()] ;

       $success = successFailure(true);
       $response = array_merge($success,$foods);

       printJSON($response);

    }
}