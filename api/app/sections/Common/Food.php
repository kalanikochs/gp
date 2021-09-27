<?php

class Food extends Controller {

    private $model;

    function __construct($action) {
        session_start();
        $this->model = $this->assignModel('Common','FoodModel');
        if (is_callable(array($this,$action))) {
            $this->$action();
        } else {
            JSONmessage(show_action_error(get_class($this),$action));
            die();
        }
    }

    function showFoods() {
        textHeaders();
        $foods = ['food'=> $this->model->showFoods()] ;

        $success = successFailure(true);
        $response = array_merge($success,$foods);

        printJSON($success);
    }

    function sendFoods(){
        textHeaders();
       $foods = ['food'=> $this->model->sendFoods()] ;

       $success = successFailure(true);
       $response = array_merge($success,$foods);

       print_r($foods);

    }
}