<?php

class Index{
    
    function __construct($action){

        if (is_callable(array($this,$action))) {
            $this->$action();
        }else{
            JSONmessage(show_action_error(get_class($this),$action));
            die();
        }

    }

    private function main(){
        JSONmessage("Stage Api Gatropack invocado satisfactoriamente");
    }
    
    private function  request(){
        printJSON($_REQUEST);
    }
}

?>