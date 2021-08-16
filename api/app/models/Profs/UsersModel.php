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
            p.persona_direccion,
            p.estado_persona_id,
            concat('Profesional ', ep.estado_persona_desc) as persona_estado_nombre
            from persona p
            join tipo_persona tp on p.tipo_persona_id = tp.tipo_persona_id
            join estado_persona ep on p.estado_persona_id = ep.estado_persona_id
            where p.tipo_persona_id in (1)
            and p.estado_persona_id not in (2);           
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