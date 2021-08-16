<?php

class CitasModel {
    private $db;

    function __construct(){        
        $this->db = new Database();
    }

    function mostrarCitas(){
        $persona = $_REQUEST['usuario_id'];
        $tipo_id = $_REQUEST['tipo_id'];
        
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
        where c.cita_usuario = $persona 
        and c.tipo_id = $tipo_id 
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

    function confirmarCita(){
        $cita = $_REQUEST['cita_id'];
        $query= "update cita
                 set estado_cita_id = 4
                 where cita_id = $cita";

        $this->db->query($query);         
        $result = $this->db->rowCount();

        if ($result > 0) {
            return true;
        }else{
            return false;
        }    
    }

    function anularCita(){
        $cita = $_REQUEST['cita_id'];
        $query= "update cita
                 set estado_cita_id = 2
                 where cita_id = $cita";

        $this->db->query($query);         
        $result = $this->db->rowCount();

        if ($result > 0) {
            return true;
        }else{
            return false;
        }

    }

    function solicitarCita(){

        $cita_usuario = $_REQUEST['cita_usuario'];
        $cita_profesional = $_REQUEST['cita_profesional'];
        $cita_fecha = $_REQUEST['cita_fecha'];
        $cita_tipo = $_REQUEST['cita_tipo'];

        $query= "insert into cita (cita_usuario, cita_profesional, tipo_id, cita_fecha, estado_cita_id, cita_resultado)
        values ($cita_usuario, $cita_profesional, $cita_tipo, '" . $cita_fecha . "', 1, null);";

        $this->db->query($query);         
        $result = $this->db->rowCount();

        if ($result > 0) {
            return true;
        }else{
            return false;
        }

    }

    function mostrarTipoCita(){
        $query = "
        select
        tipo_id as cita_tipo_id,
        concat('Cita de ',tipo_desc) as cita_tipo_nombre
        from tipo;                
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