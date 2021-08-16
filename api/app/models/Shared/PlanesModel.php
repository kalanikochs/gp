<?php

class PlanesModel{
    private $db;
    
    function __construct(){
       
        $this->db = new Database();
        
    }

    function mostrarPlanActual(){

        $plan_id = $_REQUEST['plan_id'];

        $query = "
        
        select
        p.plan_id,
        p.plan_tipo,
        concat('plan de ',t.tipo_desc) as plan_tipo_nombre,
        p.plan_usuario as plan_usuario_id,
        concat(pe.persona_nombres, ' ', pe.persona_apellidos) as plan_usuario_nombre,
        p.plan_profesional as plan_profesional_id,
        concat(up.persona_nombres, ' ', up.persona_apellidos) as plan_profesional_nombre,
        p.plan_fecha,
        p.plan_nombre,
        p.plan_descripcion,
        p.plan_links,
        p.estado_plan_id as plan_estado_id,
        ep.estado_plan_desc as plan_estado_nombre
        from plan p
        join persona pe on p.plan_usuario = pe.persona_id
        join (select persona_id, persona_nombres, persona_apellidos from persona) as up
              on up.persona_id = p.plan_profesional
        join estado_plan ep on p.estado_plan_id= ep.estado_plan_id
        join tipo t on p.plan_tipo = t.tipo_id
        where p.plan_id = $plan_id       
        
        ";

        $this->db->query($query);

        $result = $this->db->responseUnique();
      
        if ($result) {
            return $result;
        }else{
            return false;
        }
        
    } 
}

?>