<?php

class Notifications extends Controller{
     
    private $model; 
    
    function __construct($action){
        session_start();
        $this->model = $this->assignModel('Common','NotificationsModel');
        if (is_callable(array($this,$action))) {
            $this->$action();            
        }else{
            JSONmessage(show_action_error(get_class($this),$action));
            die();
        }
        
    }

    function shownotifications(){
       $notifications = ['notificaciones'=>$this->model->shownotifications()] ;

       $success = successFailure(true);
       $response = array_merge($success,$notifications);

       printJSON($response);

    }

    function readnotifications(){
                            
        $update = $this->model->updateNotifications();

        $response;

        if ($update) {
            $response = successFailure(true);
        }else{
            $response = successFailure(false);
        }
             
        printJSON($response);
    }

  
    
}

?>