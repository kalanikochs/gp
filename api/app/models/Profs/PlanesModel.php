<?php

class PlanesModel {
    private $db;

    function __construct(){        
        $this->db = new Database();
    }

    function mostrarPlanes(){
        $profesional = $_REQUEST['profesional_id'];
        
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
        p.plan_meta,
        p.plan_links,
        p.estado_plan_id as plan_estado_id,
        ep.estado_plan_desc as plan_estado_nombre
        from plan p
        join persona pe on p.plan_usuario = pe.persona_id
        join (select persona_id, persona_nombres, persona_apellidos from persona) as up
              on up.persona_id = p.plan_profesional
        join estado_plan ep on p.estado_plan_id= ep.estado_plan_id
        join tipo t on p.plan_tipo = t.tipo_id
        where p.plan_profesional = $profesional      
        order by p.plan_fecha desc, p.plan_id desc
        ";

        $this->db->query($query);
        $result = $this->db->responseAll();
      
        if ($result) {
            //ahora agrego los anexos
            $finalResponse = [];
           
            foreach ($result as $key => $eachResult) {     
                       
                $planId = $eachResult['plan_id'];
                $listaAnexos = $this->mostrarAnexos($planId);
                $eachResult += ['plan_anexos'=>$listaAnexos];
                array_push($finalResponse,$eachResult);
            }
                       

            return $finalResponse;

        }else{
            return false;
        }

    }

    function agregarPlan(){

        $planId = (int)$this->obtenerUltimoPlan() + 1;        
        $agregarAnexos = $this->agregarAnexos($planId);

        if ($agregarAnexos['status']=='failure') {
            return $agregarAnexos;
        }

        $plan_tipo = $_REQUEST['plan_tipo'];
        $plan_usuario = $_REQUEST['plan_usuario'];
        $plan_profesional = $_REQUEST['plan_profesional'];
        $plan_fecha = date('Y-m-d');
        $plan_nombre = $_REQUEST['plan_nombre'];
        $plan_descripcion = $_REQUEST['plan_descripcion'];
        $plan_meta = $_REQUEST['plan_meta'];
        $plan_links = $_REQUEST['plan_links'];

        $query= "
        
        INSERT INTO plan
        (plan_tipo, plan_usuario, plan_profesional, plan_fecha,plan_nombre, plan_descripcion, plan_meta,
        plan_links, estado_plan_id)
        VALUES
        ($plan_tipo,
        $plan_usuario,
        $plan_profesional,
        '".$plan_fecha."',
        '".$plan_nombre."',
        '".$plan_descripcion."',
        '".$plan_meta."',
        '".$plan_links."',1)

        ";
       
        $this->db->query($query);         
        $result = $this->db->rowCount();

        if ($result > 0) {                                  
            return array('status' => 'success', 'message'=>'Datos ingresados con exito');            
        }else{
            return array('status' => 'failure', 'message'=>'Problema con la base de datos');
        }

    }

    function obtenerUltimoPlan(){
        $query = "select plan_id from plan order by plan_id desc limit 1";
        $this->db->query($query);
        $response = $this->db->responseUnique();
        return $response['plan_id'];
    }

    function mostrarAnexos($planId){

        $dir = './storage/planes/' . $planId . '/';
                                        
        if (file_exists($dir)) {
                        
            $fileList = glob($dir."*");

            if (count($fileList) > 0) {
                $files = array();
                foreach ($fileList as $key => $file) {
                    $file = substr($file,10);
                    $file = STORAGE_PATH . $file;
                    array_push($files, $file);
                }
                return $files;
            }else{
                return array();
            }

        }else{
            return array();
        }        
    }

    function agregarAnexos($planId){
        //1. primero creo el directorio
        $dir = './storage/planes/' . $planId . '/';
        if (!file_exists($dir)) {
           if (!mkdir($dir,0777,true)) {
               $result = array('status' => 'failure', 'message'=>'Directorio no pudo ser creado');
               goto end; 
            } 
        }

        //ahora agrego los anexos

        if (isset($_FILES['anexos']['name'])) {

            $countfiles = count($_FILES['anexos']['name']);

            for ($i=0; $i < $countfiles; $i++) { 
                $filename = $_FILES['anexos']['name'][$i];                
                $location = $dir.$filename;
                move_uploaded_file($_FILES['anexos']['tmp_name'][$i],$location);
            }

            $result = array('status' => 'success', 'message'=>'Archivos subidos con exito');

        }else{
            $result = array('status' => 'success', 'message'=>'No existen archivos por agregar');
        }
        
        end:
        return $result;


    }

    function editarPlan(){
        $plan_id = $_REQUEST['plan_id'];        
        $plan_usuario = $_REQUEST['plan_usuario'];
        $plan_profesional = $_REQUEST['plan_profesional'];
        $plan_fecha = $_REQUEST['plan_fecha'];
        $plan_nombre = $_REQUEST['plan_nombre'];
        $plan_descripcion = $_REQUEST['plan_descripcion'];
        $plan_links = $_REQUEST['plan_links'];

        $query= "
        
        UPDATE plan
        SET       
        plan_usuario=$plan_usuario,
        plan_profesional=$plan_profesional,
        plan_fecha='".$plan_fecha."',
        plan_nombre='".$plan_nombre."',
        plan_descripcion='".$plan_descripcion."',
        plan_links='".$plan_links."'       
        WHERE
        plan_id = $plan_id

        ";

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