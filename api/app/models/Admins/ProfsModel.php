<?php

class ProfsModel{
    private $db;

    function __construct(){
        $this->db = new Database();
    }


    function mostrarProfesionales(){
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
            concat('Profesional ', ep.estado_persona_desc) as persona_estado_nombre
            from persona p
            join tipo_persona tp on p.tipo_persona_id = tp.tipo_persona_id
            join estado_persona ep on p.estado_persona_id = ep.estado_persona_id
            where p.tipo_persona_id not in (1,6)
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

    function suspenderProfesional(){

        $profesional_id = $_REQUEST['profesional_id'];
       
        $query = 
        "UPDATE
         persona SET         
         estado_persona_id = 2
          where persona_id=$profesional_id";
        $this->db->query($query);         
        $result = $this->db->rowCount();

        if ($result > 0) {
            return true;
        }else{
            return false;
        }

    }

    function activarProfesional(){

        $profesional_id = $_REQUEST['profesional_id'];
       
        $query = 
        "UPDATE
         persona SET         
         estado_persona_id = 1
          where persona_id=$profesional_id";
        $this->db->query($query);         
        $result = $this->db->rowCount();

        if ($result > 0) {
            return true;
        }else{
            return false;
        }

    }

    function eliminarProfesional(){

        $profesional_id = $_REQUEST['profesional_id'];
       
        $query = 
        "UPDATE
         persona SET         
         estado_persona_id = 3
          where persona_id=$profesional_id";
        $this->db->query($query);         
        $result = $this->db->rowCount();

        if ($result > 0) {
            return true;
        }else{
            return false;
        }

    }
    
    function agregarProfesional(){
        $profesional_tipo_id = $_REQUEST['profesional_tipo_id'];
        $profesional_email = $_REQUEST['profesional_email'];
        $profesional_contrasena = $_REQUEST['profesional_contrasena'];
        $profesional_nombres = $_REQUEST['profesional_nombres'];
        $profesional_apellidos = $_REQUEST['profesional_apellidos'];
        $profesional_direccion = $_REQUEST['profesional_direccion'];
        $profesional_telefono = $_REQUEST['profesional_telefono'];
        $profesional_documento = $_REQUEST['profesional_documento'];

        if (!$this->verifyEmail($profesional_email)) {
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
          $profesional_tipo_id,
         '".$profesional_email."',
         '".$profesional_contrasena."',
         '".$profesional_nombres."',
         '".$profesional_apellidos."',
         '".$profesional_direccion."',
         '".$profesional_telefono."',
         '".$profesional_documento."',
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

    function mostrarTipoPersona(){
        $query = "
            select
            tp.tipo_persona_id,
            tp.tipo_persona_nombre
            from tipo_persona tp
            where tipo_persona_id not in (6)
        ";

        $this->db->query($query);
        $result = $this->db->responseAll();

        if ($result) {
            return $result;
        }else{
            return false;
        }
    }

}

?>