<?php

class ProfileModel{
    private $db;

    function __construct(){        
        $this->db = new Database();
    }

    function changedata(){
               
        $persona_id = $_REQUEST['persona_id'];
        $persona_nombres = $_REQUEST['persona_nombres'];
        $persona_apellidos = $_REQUEST['persona_apellidos'];
        $persona_direccion = $_REQUEST['persona_direccion'];
        $persona_telefono = $_REQUEST['persona_telefono'];
        $persona_documento = $_REQUEST['persona_documento'];
        $persona_contrasena = $_REQUEST['persona_contrasena'];
        $persona_email = $_REQUEST['persona_email'];
       
        $squery = "
        UPDATE persona SET         
         persona_contrasena = '" . $persona_contrasena. "',
         persona_nombres = '" . $persona_nombres. "', 
         persona_apellidos = '" . $persona_apellidos . "', 
         persona_direccion = '" . $persona_direccion . "', 
         persona_telefono = '" . $persona_telefono . "',
         persona_email = '" . $persona_email . "', 
         persona_documento = '" . $persona_documento . "' 
         where persona_id = $persona_id
        ";
        
        $this->db->query($squery);
        
        $result = $this->db->rowCount();

        if ($result and $result > 0) {
            return true;
        }else{
            return false;
        }
    }

    function verifyEmail(){
        $persona_email = $_REQUEST['persona_email'];

        $squery = "SELECT * FROM persona WHERE persona_email = '".$persona_email."'";

        $this->db->query($squery);

        $response = $this->db->responseUnique();

        if ($response) {
            //si existe el correo, no pasa la prueba
            return false;
        }else{
            return true;
        }
    }
}

?>