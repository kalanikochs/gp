<?php

class Profile extends Controller{
     
    private $model; 
    
    function __construct($action){
        session_start();
        $this->model = $this->assignModel('Common','ProfileModel');
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
            $dataToResponse = ['id'=>$info['usuario_id']];
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

            $succesMsg = successFailure(true);
            $succesMsg = array_merge($succesMsg, $info);
            printJSON($succesMsg);       
    }

    function changedata(){
       
        //se modifica la informacion de perfil
        $dataAccess = $this->model->changedata();
        
        $response;

        if ($dataAccess) {
            $response = successFailure(true);
        }else{
            $response = successFailure(false);
        }

       
        printJSON($response);
    }
    
}

?>