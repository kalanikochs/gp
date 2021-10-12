<?php

class RutinasModel {
    private $db;

    function __construct(){
        $this->db = new Database();
    }

    function mostrarRutinas(){
        $planId = $_REQUEST['plan_id'];
        
        $query = "
        
        select 
        rutina_id,
        plan_id as rutina_plan_id,
        rutina_nombre,
        rutina_descripcion,
        rutina_objetivo,
        rutina_fecha,
        rutina_links,
        rutina_informacion
        from rutina  
        where plan_id = $planId      
        order by rutina_id desc
        ";

        $this->db->query($query);
        $result = $this->db->responseAll();
      
        if ($result) {
            //ahora agrego los anexos
            $finalResponse = [];
           
            foreach ($result as $key => $eachResult) {     
                       
                $rutinaId = $eachResult['rutina_id'];
                $listaAnexos = $this->mostrarAnexos($rutinaId);
                $eachResult += ['rutina_anexos'=>$listaAnexos];
                array_push($finalResponse,$eachResult);
            }
                       

            return $finalResponse;

        }else{
            return false;
        }
    }

    function mostrarRutina() {
        $rutina = $_REQUEST['rutina_id'];
        $query = "SELECT rutina_informacion FROM rutina WHERE rutina_id = '$rutina'";
        $this->db->query($query);
        return ($this->db->responseAll() ?: false);

    }

    function agregarRutina(){

        $rutinaId = (int)$this->obtenerUltimaRutina() + 1;        
        $agregarAnexos = $this->agregarAnexos($rutinaId);

        if ($agregarAnexos['status']=='failure') {
            return $agregarAnexos;
        }

        $plan_id = $_REQUEST['plan_id'];
        $rutina_nombre = $_REQUEST['rutina_nombre'];
        $rutina_descripcion = $_REQUEST['rutina_descripcion'];
        $rutina_objetivo = $_REQUEST['rutina_objetivo'];
        $rutina_fecha = date('Y-m-d');
        $rutina_links = $_REQUEST['rutina_links'];
        $rutina_informacion = $_REQUEST['rutina_informacion'];


        $query= "
        
        INSERT INTO rutina
         (
            plan_id,
            rutina_nombre,
            rutina_descripcion,
            rutina_objetivo,
            rutina_fecha,
            rutina_links,
            rutina_informacion
          ) VALUES
          (
            $plan_id,
            '".$rutina_nombre."',
            '".$rutina_descripcion."',
            '".$rutina_objetivo."',
            '".$rutina_fecha."',
            '".$rutina_links."',
            '".$rutina_informacion."'
          )
        ";


        $this->db->query($query);         
        $result = $this->db->rowCount();

        if ($result > 0) {                                  
            return array('status' => 'success', 'message'=>'Datos ingresados con exito');            
        }else{
            return array('status' => 'failure', 'message'=>'Problema con la base de datos');
        }

    }  

    function obtenerUltimaRutina(){
        $query = "select rutina_id from rutina order by rutina_id desc limit 1";
        $this->db->query($query);
        $response = $this->db->responseUnique();
        if ($response) {
            return $response['rutina_id'];
        }else{
            return 0;
        }
    }
    
    function mostrarAnexos($rutinaId){

        $dir = './storage/rutinas/' . $rutinaId . '/';
                                
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

    function agregarAnexos($rutinaId){
        //1. primero creo el directorio
        $dir = './storage/rutinas/' . $rutinaId . '/';
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

    function editarRutina(){
        
        $rutina_id = $_REQUEST['rutina_id'];
        $rutina_nombre = $_REQUEST['rutina_nombre'];
        $rutina_descripcion = $_REQUEST['rutina_descripcion'];       
        $rutina_links = $_REQUEST['rutina_links'];


        $query= "
        
        UPDATE rutina
        set 
        rutina_nombre= '".$rutina_nombre."',
        rutina_descripcion= '".$rutina_descripcion."',        
        rutina_links= '".$rutina_links."'
        where rutina_id=$rutina_id
        ";


        $this->db->query($query);         
        $result = $this->db->rowCount();

        if ($result > 0) {                                  
            return array('status' => 'success', 'message'=>'Datos ingresados con exito');            
        }else{
            return array('status' => 'failure', 'message'=>'Problema con la base de datos');
        }

    }

    function editarInformacionRutina(){
        
        $rutina_id = $_REQUEST['rutina_id'];
        $rutina_informacion = $_REQUEST['rutina_informacion'];


        $query= "
        
        UPDATE rutina
        set 
        rutina_informacion= '".$rutina_informacion."'
        where rutina_id=$rutina_id
        ";


        $this->db->query($query);         
        $result = $this->db->rowCount();

        if ($result > 0) {                                  
            return array('status' => 'success', 'message'=>'Datos modificados con exito');            
        }else{
            return array('status' => 'failure', 'message'=>'Problema con la base de datos');
        }

    }

    function mostrarRutinaActual(){

        $rutina_id = $_REQUEST['rutina_id'];

        $query = "
        
        select 
        rutina_id,
        plan_id as rutina_plan_id,
        rutina_nombre,
        rutina_fecha,
        rutina_links
        from rutina  
        where rutina_id = $rutina_id;    
        
        ";

        $this->db->query($query);

        $result = $this->db->responseUnique();
      
        if ($result) {
            return $result;
        }else{
            return false;
        }
        
    } 
    

    function mostrarGruposAlimenticios(){

        $query = "select * from grupoalimenticio";
        $this->db->query($query);
        $response = $this->db->responseAll();

        return $response;

    }
    
    function mostrarGruposDeportivos(){

        $query = "select * from grupodeportivo";
        $this->db->query($query);
        $response = $this->db->responseAll();

        return $response;

    }

    function mostrarGruposPsicologia(){

        $query = "select * from grupopsicologia";
        $this->db->query($query);
        $response = $this->db->responseAll();

        return $response;

    }

    function mostrarGrupoMedico(){

        $query = "select * from grupomedico";
        $this->db->query($query);
        $response = $this->db->responseAll();

        return $response;

    }
    
    function agregarEjercicio(){

        $ejercicio = $_REQUEST['ejercicio'];
        
        $query = "INSERT INTO grupodeportivo (grupodeportivo_nombre) VALUES ('$ejercicio')";

        $this->db->query($query);         
        $result = $this->db->rowCount();

        if ($result > 0) {                                  
            return array('status' => 'success', 'message'=>'Datos ingresados con exito');            
        }else{
            return array('status' => 'failure', 'message'=>'Problema con la base de datos');
        }

    }

    function agregarTerapia() {
        $terapia = $_REQUEST['terapia'];
        
        $query = "INSERT INTO grupopsicologia (grupopsicologia_nombre) VALUES ('$terapia')";

        $this->db->query($query);         
        $result = $this->db->rowCount();

        if($result > 0) {                                  
            return array('status' => 'success', 'message'=>'Datos ingresados con exito');            
        } else {
            return array('status' => 'failure', 'message'=>'Problema con la base de datos');
        }
    }

    function agregarReceta() {
        $receta = $_REQUEST['receta'];
        
        $query = "INSERT INTO grupomedico (grupomedico_nombre) VALUES ('$receta')";

        $this->db->query($query);
        $result = $this->db->rowCount();

        if($result > 0) {                                  
            return array('status' => 'success', 'message'=>'Datos ingresados con exito');            
        } else {
            return array('status' => 'failure', 'message'=>'Problema con la base de datos');
        }
    }


    function agregarObservacion(){

        $observacion = $_REQUEST['observacion'];
        $jornadaalimenticia = $_REQUEST['jornadaalimenticia_id'];
        
        $query = "INSERT INTO observaciones_deportivas (jornadadeportiva_id,observacion)
        VALUES ('$jornadaalimenticia','$observacion')";

        $this->db->query($query);         
        $result = $this->db->rowCount();

        if ($result > 0) {                                  
            return array('status' => 'success', 'message'=>'Datos ingresados con exito');            
        }else{
            return array('status' => 'failure', 'message'=>'Problema con la base de datos');
        }

    }

    function mostrarObservaciones() {
        $query = "SELECT * FROM observaciones_deportivas";
        $this->db->query($query);
        
        return ($this->db->responseAll() ?: false);
    }
    
    function agregarRutinaEjercicio() {

        $grupodeportivo_id = $_REQUEST['grupodeportivo_id'];
        $ejercicio_nombre = $_REQUEST['ejercicio_nombre'];
        
        $query = "INSERT INTO ejercicio (grupodeportivo_id,ejercicio_nombre,estado_ejercicio_id) 
                  VALUES ($grupodeportivo_id,'$ejercicio_nombre','1')";

        $this->db->query($query);
        $result = $this->db->rowCount();

        if ($result > 0) {                                  
            return array('status' => 'success', 'message'=>'Datos ingresados con exito');            
        }else{
            return array('status' => 'failure', 'message'=>'Problema con la base de datos');
        }

    }

    function mostrarAlimentos() {

        $query = "select alimento_id,
                    grupoalimenticio_id,
                    alimento_nombre,
                    estado_alimento_id as alimento_estado_id
                    from alimento";
        $this->db->query($query);
        $response = $this->db->responseAll();

        return $response;

    }
    
    function mostrarEjercicios(){

        $query = "select ejercicio_id as alimento_id,
                    grupodeportivo_id as grupoalimenticio_id,
                    ejercicio_nombre as alimento_nombre,
                    estado_ejercicio_id as alimento_estado_id
                    from ejercicio";
        $this->db->query($query);
        $response = $this->db->responseAll();

        return $response;

    }

    function mostrarIndicaciones(){

        $query = "select indicacion_id as alimento_id,
                    grupopsicologia_id as grupoalimenticio_id,
                    indicacion_nombre as alimento_nombre,
                    estado_indicacion_id as alimento_estado_id
                    from indicaciones";
        $this->db->query($query);
        $response = $this->db->responseAll();

        return $response;

    }

    function mostrarIndicacionesM(){

        $query = "select indicacion_id as alimento_id,
                    grupomedico_id as grupoalimenticio_id,
                    indicacion_nombre as alimento_nombre,
                    estado_indicacion_id as alimento_estado_id
                    from indicacionesm";
        $this->db->query($query);
        $response = $this->db->responseAll();

        return $response;

    }

    function mostrarDias(){
        $query = "select * from dia";
        $this->db->query($query);
        $response = $this->db->responseAll();

        return $response;
      
    }

    function mostrarJornadasAlimenticias(){

        $query = "select * from jornadaalimenticia";
        $this->db->query($query);
        $response = $this->db->responseAll();

        return $response;

    }
    
    function mostrarJornadasDeportivas(){

        $query = "select * from jornadadeportiva";
        $this->db->query($query);
        $response = $this->db->responseAll();

        return $response;

    }

    function agregarAlimento(){

        $grupoalimenticio_id = $_REQUEST['grupoalimenticio_id'];
        $alimento_nombre = $_REQUEST['alimento_nombre'];
        
        $query = "INSERT INTO alimento (grupoalimenticio_id,alimento_nombre) 
                  VALUES ($grupoalimenticio_id,'$alimento_nombre')";

        $this->db->query($query);         
        $result = $this->db->rowCount();

        if ($result > 0) {                                  
            return array('status' => 'success', 'message'=>'Datos ingresados con exito');            
        }else{
            return array('status' => 'failure', 'message'=>'Problema con la base de datos');
        }

    }

    function agregarIndicacion(){

        $grupoalimenticio_id = $_REQUEST['grupopsicologia_id'];
        $alimento_nombre = $_REQUEST['indicacion_nombre'];
        
        $query = "INSERT INTO indicaciones (grupopsicologia_id,indicacion_nombre,estado_indicacion_id) 
                  VALUES ($grupoalimenticio_id,'$alimento_nombre', '1')";

        $this->db->query($query);         
        $result = $this->db->rowCount();

        if ($result > 0) {                                  
            return array('status' => 'success', 'message'=>'Datos ingresados con exito');            
        }else{
            return array('status' => 'failure', 'message'=>'Problema con la base de datos');
        }

    }

    function agregarIndicacionM(){

        $grupoalimenticio_id = $_REQUEST['grupomedico_id'];
        $alimento_nombre = $_REQUEST['indicacion_nombre'];
        
        $query = "INSERT INTO indicacionesm (grupomedico_id,indicacion_nombre,estado_indicacion_id) 
                  VALUES ($grupoalimenticio_id,'$alimento_nombre', '1')";

        $this->db->query($query);         
        $result = $this->db->rowCount();

        if ($result > 0) {                                  
            return array('status' => 'success', 'message'=>'Datos ingresados con exito');            
        }else{
            return array('status' => 'failure', 'message'=>'Problema con la base de datos');
        }

    }

    function modificarAlimento(){
        $alimento_id = $_REQUEST['alimento_id'];
        $alimento_nombre = $_REQUEST['alimento_nombre'];
        $alimento_estado = $_REQUEST['alimento_estado'];

        $query = "UPDATE alimento SET 
                    alimento_nombre = '$alimento_nombre',
                    estado_alimento_id = $alimento_estado
                  WHERE alimento_id = $alimento_id";

        $this->db->query($query);         
        $result = $this->db->rowCount();

        if ($result > 0) {                                  
        return array('status' => 'success', 'message'=>'Datos modificados con exito');            
        }else{
        return array('status' => 'failure', 'message'=>'Problema con la modificacion de alimentos');
        }
    }
    
    function modificarEjercicio(){
        $alimento_id = $_REQUEST['ejercicio_id'];
        $alimento_nombre = $_REQUEST['ejercicio_nombre'];
        $alimento_estado = $_REQUEST['ejercicio_estado'];

        $query = "UPDATE ejercicio SET 
                    ejercicio_nombre = '$alimento_nombre',
                    estado_ejercicio_id = $alimento_estado
                  WHERE ejercicio_id = $alimento_id";

        $this->db->query($query);         
        $result = $this->db->rowCount();

        if ($result > 0) {                                  
        return array('status' => 'success', 'message'=>'Datos modificados con exito');            
        }else{
        return array('status' => 'failure', 'message'=>'Problema con la modificacion de alimentos');
        }
    }

    function modificarIndicaciones() {
        $indicacion_id = $_REQUEST['indicacion_id'];
        $indicacion_nombre = $_REQUEST['indicacion_nombre'];
        $indicacion_estado = $_REQUEST['indicacion_estado'];

        $query = "UPDATE indicaciones SET 
                    indicacion_nombre = '$indicacion_nombre',
                estado_indicacion_id = '$indicacion_estado'
                  WHERE indicacion_id = '$indicacion_id'";

        $this->db->query($query);         
        $result = $this->db->rowCount();

        if ($result > 0) {                                  
            return array('status' => 'success', 'message'=>'Datos modificados con exito');            
        } else {
            return array('status' => 'failure', 'message'=>'Problema con la modificacion de alimentos');
        }
    }

    function modificarIndicacionesM() {
        $indicacion_id = $_REQUEST['indicacion_id'];
        $indicacion_nombre = $_REQUEST['indicacion_nombre'];
        $indicacion_estado = $_REQUEST['indicacion_estado'];

        $query = "UPDATE indicacionesm SET 
                    indicacion_nombre = '$indicacion_nombre',
                estado_indicacion_id = '$indicacion_estado'
                  WHERE indicacion_id = '$indicacion_id'";

        $this->db->query($query);         
        $result = $this->db->rowCount();

        if ($result > 0) {                                  
            return array('status' => 'success', 'message'=>'Datos modificados con exito');            
        } else {
            return array('status' => 'failure', 'message'=>'Problema con la modificacion de alimentos');
        }
    }
}

?>