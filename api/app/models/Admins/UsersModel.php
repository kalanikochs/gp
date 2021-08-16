<?php

class UsersModel{
    private $db;

    function __construct(){
        $this->db = new Database();
    }


    function mostrarUsuarios(){

        $query = "
                select
                p.persona_id,
                p.tipo_persona_id as persona_tipo_id,
                tp.tipo_persona_nombre as persona_tipo_nombre,
                p.persona_email,
                p.persona_nombres,
                p.persona_apellidos,
                p.persona_direccion,
                p.persona_telefono,
                p.persona_documento,
                p.persona_contrasena,
                p.estado_persona_id as persona_estado_id,
                concat('Usuario ', ep.estado_persona_desc) as persona_estado_nombre
                from persona p
                join tipo_persona tp on p.tipo_persona_id = tp.tipo_persona_id
                join estado_persona ep on p.estado_persona_id = ep.estado_persona_id
                where p.tipo_persona_id in (1)
                and p.estado_persona_id < 3
                order by p.persona_id desc
        ";

        $this->db->query($query);
        $result = $this->db->responseAll();

        if ($result) {
            return $result;
        }else{
            return false;
        }

    }

    function suspenderUsuario(){

        $usuario_id = $_REQUEST['usuario_id'];
       
        $query = 
        "UPDATE
         persona SET         
         estado_persona_id = 2
         where persona_id=$usuario_id;";

        $this->db->query($query);         
        $result = $this->db->rowCount();

        if ($result > 0) {
            return true;
        }else{
            return false;
        }

    }

    function activarUsuario(){

        $usuario_id = $_REQUEST['usuario_id'];
       
        $query = 
        "UPDATE
         persona SET         
         estado_persona_id = 1
         where persona_id=$usuario_id;";

        $this->db->query($query);         
        $result = $this->db->rowCount();

        if ($result > 0) {
            return true;
        }else{
            return false;
        }

    }

    function eliminarUsuario(){

        $usuario_id = $_REQUEST['usuario_id'];
       
        $query = 
        "UPDATE
         persona SET         
         estado_persona_id = 3
         where persona_id=$usuario_id;";

        $this->db->query($query);         
        $result = $this->db->rowCount();

        if ($result > 0) {
            return true;
        }else{
            return false;
        }

    }

    function agregarUsuario(){
       
        $usuario_email = $_REQUEST['usuario_email'];
        $usuario_contrasena = $_REQUEST['usuario_contrasena'];
        $usuario_nombres = $_REQUEST['usuario_nombres'];
        $usuario_apellidos = $_REQUEST['usuario_apellidos'];
        $usuario_direccion = $_REQUEST['usuario_direccion'];
        $usuario_telefono = $_REQUEST['usuario_telefono'];
        $usuario_documento = $_REQUEST['usuario_documento'];

        if (!$this->verifyEmail($usuario_email)) {
            return false;
        }

        $query= "
        INSERT INTO persona
        (tipo_persona_id,
         persona_email,
         persona_contrasena,
         persona_nombres,
         persona_apellidos,
         persona_direccion,
         persona_telefono,
         persona_documento,
         estado_persona_id)
        VALUES
        (
          1,
         '".$usuario_email."',
         '".$usuario_contrasena."',
         '".$usuario_nombres."',
         '".$usuario_apellidos."',
         '".$usuario_direccion."',
         '".$usuario_telefono."',
         '".$usuario_documento."',
         1);
        ";

        $this->db->query($query);

        $result = $this->db->rowCount();

        if ($result > 0) {
            return true;
        }else{
            return false;
        }
    }

    function verifyEmail($email){
        $persona_email = $email;

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