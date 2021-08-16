<?php

class Login extends Controller{
     
    private $model; 
    
    function __construct($action){
       
        $this->model = $this->assignModel('Common','LoginModel');
        if (is_callable(array($this,$action))) {
            $this->$action();            
        }else{
            JSONmessage(show_action_error(get_class($this),$action));
            die();
        }
        
    }

    function checkLogin(){

        //1. verificar que este el usuario y la contrasena
        if (!isset($_REQUEST['email']) or !isset($_REQUEST['password'])) {
            printJSON(successFailure(false));
            die();
        }

        //2. verificar que le usuario y la contraseña esten en la base de datos
        $info = $this->model->verificarInfoLogin();

        if ($info) {            
            //devolver mensaje de exito
            $succesMessage = successFailure(true);            
            $dataToResponse = ['id'=>$info['persona_id']];
            $succesMessage = array_merge($succesMessage,$dataToResponse);
            printJSON($succesMessage);
        }else{
            //5. enviar un mensaje de error
            $failMessage = successFailure(false);
            $failMessage['message'] = 'El usuario y contraseña no coinciden';

            printJSON($failMessage);
        }
        
    }
    
    function bringuserinfo(){                   
            //traer la informacion de la persona asociada al id
            $info = $this->model->bringInfoId($_REQUEST['id']); 
            
            $info = array('message'=>$info);

            $succesMsg = successFailure(true);
            $succesMsg = array_merge($succesMsg, $info);
            printJSON($succesMsg);       
    }
    
    function bringToken(){
        $token = $this->model->bringToken();
        
        if ($token) {
            $response = successFailure(true);
            $token = message($token);
            $response = array_merge($response, $token);
        }else{
            $response = successFailure(false);
        }

        printJSON($response);
        
    }
}

?>