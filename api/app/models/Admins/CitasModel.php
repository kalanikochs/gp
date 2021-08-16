<?php

class CitasModel{

    private $db;

    function __construct(){
        $this->db = new Database();
    }

    function mostrarCitas(){
               
        $query = "
        select
        c.cita_id,
        c.cita_usuario as cita_usuario_id,
        concat(p.persona_nombres, ' ', p.persona_apellidos) as cita_usuario_nombre,
        c.cita_profesional as cita_profesional_id,
        concat(up.persona_nombres, ' ', up.persona_apellidos) as cita_profesional_nombre,
        c.tipo_id as cita_tipo_id,
        concat('Cita de ', t.tipo_desc) as cita_tipo_nombre,
        c.cita_fecha,
        c.estado_cita_id as cita_estado_id,
        e.estado_cita_desc as cita_estado_nombre,
        c.cita_resultado
        from cita c
        join estado_cita e on c.estado_cita_id = e.estado_cita_id
        join persona p on c.cita_usuario = p.persona_id
        join (select persona_id, persona_nombres, persona_apellidos from persona) as up
              on up.persona_id = c.cita_profesional
        join tipo t on c.tipo_id = t.tipo_id
        order by c.cita_id desc
        ";

        $this->db->query($query);
        $result = $this->db->responseAll();

        if ($result) {
            return $result;
        }else{
            return false;
        }

    }

    function aprobarCita(){

        $idCita = $_REQUEST['cita_id'];
       
        $query = 
        "UPDATE
         cita SET         
         estado_cita_id = 3
          where cita_id=$idCita;";
        $this->db->query($query);         
        $result = $this->db->rowCount();

        if ($result > 0) {
            return true;
        }else{
            return false;
        }

    }

    function anularCita(){

        $idCita = $_REQUEST['cita_id'];
       
        $query = 
        "UPDATE
         cita SET         
         estado_cita_id = 2
          where cita_id=$idCita;";
        $this->db->query($query);         
        $result = $this->db->rowCount();

        if ($result > 0) {
            return true;
        }else{
            return false;
        }

    }

    function activarCita(){

        $idCita = $_REQUEST['cita_id'];
       
        $query = 
        "UPDATE
         cita SET         
         estado_cita_id = 1
          where cita_id=$idCita;";
        $this->db->query($query);         
        $result = $this->db->rowCount();

        if ($result > 0) {
            return true;
        }else{
            return false;
        }

    }

    function modificarFechaCita(){

        $idCita = $_REQUEST['cita_id'];
        $fechaCita = $_REQUEST['cita_fecha'];
        
        $query = 
        "UPDATE
         cita SET         
         cita_fecha = '".$fechaCita."'
          where cita_id=$idCita;";
        $this->db->query($query);         
        $result = $this->db->rowCount();

        if ($result > 0) {
            return true;
        }else{
            return false;
        }

    }
}

?>