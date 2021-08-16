<?php

class CitasModel {
    private $db;

    function __construct(){        
        $this->db = new Database();
    }

    function mostrarCitas(){
        $profesional = $_REQUEST['profesional_id'];
        
        $query = "
        SELECT
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
        where c.cita_profesional = $profesional
        order by c.cita_fecha desc
        ";
       
        $this->db->query($query);
        $result = $this->db->responseAll();

        if ($result) {
            return $result;
        }else{
            return false;
        }

    }

    function solicitarCita(){

        $cita_usuario = $_REQUEST['cita_usuario'];
        $cita_profesional = $_REQUEST['cita_profesional'];
        $cita_fecha = $_REQUEST['cita_fecha'];
        $cita_tipo = $_REQUEST['cita_tipo'];

        $query= "insert into cita (cita_usuario, cita_profesional, cita_fecha, tipo_id, estado_cita_id, cita_resultado)
        values ($cita_usuario, $cita_profesional, '". $cita_fecha ."',$cita_tipo, 1, null);";

        $this->db->query($query);         
        $result = $this->db->rowCount();

        if ($result > 0) {
            return true;
        }else{
            return false;
        }

    }

    function asignarResultadoCita(){
        $idCita = $_REQUEST['cita_id'];
        $resultado = $_REQUEST['cita_resultado'];

        $query = 
        "UPDATE
         cita SET
         cita_resultado = '". $resultado. "',
         estado_cita_id = 5
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