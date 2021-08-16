<?php

class EvidenciasModel {
    private $db;

    function __construct(){
        $this->db = new Database();
    }

    function mostrarEvidencias(){
        $rutinaId = $_REQUEST['rutina_id'];
        
        $query = "
        
             select
             evidencia_id,
             rutina_id as evidencia_rutina_id,
             evidencia_fecha,
             evidencia_informacion
             from evidencia where rutina_id = $rutinaId        
             order by evidencia_fecha desc, evidencia_id desc   
        ";

        $this->db->query($query);
        $result = $this->db->responseAll();
      
        if ($result) {
            //ahora agrego los anexos
            $finalResponse = [];
           
            foreach ($result as $key => $eachResult) {     
                       
                $evidenciaId = $eachResult['evidencia_id'];
                $listaAnexos = $this->mostrarAnexos($evidenciaId);
                $eachResult += ['evidencia_anexos'=>$listaAnexos];
                array_push($finalResponse,$eachResult);
            }
                       

            return $finalResponse;

        }else{
            return false;
        }

    }

    function agregarEvidencia(){

        $evidenciaId = (int)$this->obtenerUltimaEvidencia() + 1;
        $agregarAnexos = $this->agregarAnexos($evidenciaId);

        if ($agregarAnexos['status']=='failure') {
            return $agregarAnexos;
        }
        
        $rutina_id = $_REQUEST['rutina_id'];
        $evidencia_informacion = $_REQUEST['evidencia_informacion'];

        $query= "
        
        insert into evidencia 
        (rutina_id,
         evidencia_fecha,
         evidencia_informacion)
        values
        ($rutina_id,
         CURDATE(),
         '".$evidencia_informacion."'
        );

        ";

        $this->db->query($query);         
        $result = $this->db->rowCount();

        if ($result > 0) {                                  
            return array('status' => 'success', 'message'=>'Datos ingresados con exito');            
        }else{
            return array('status' => 'failure', 'message'=>'Problema con la base de datos');
        }     
    }

    function agregarEvidenciaMobile(){

        $evidenciaId = (int)$this->obtenerUltimaEvidencia() + 1;
        $agregarAnexosMobile = $this->agregarAnexosMobile($evidenciaId);

        if ($agregarAnexosMobile['status']=='failure') {
            return $agregarAnexosMobile;
        }
        
        $rutina_id = $_REQUEST['rutina_id'];
        $evidencia_informacion = $_REQUEST['evidencia_informacion'];

        $query= "
        
        insert into evidencia 
        (rutina_id,
         evidencia_fecha,
         evidencia_informacion)
        values
        ($rutina_id,
         CURDATE(),
         '".$evidencia_informacion."'
        );

        ";

        $this->db->query($query);         
        $result = $this->db->rowCount();

        if ($result > 0) {                                  
            return array('status' => 'success', 'message'=>'Datos ingresados con exito');            
        }else{
            return array('status' => 'failure', 'message'=>'Problema con la base de datos');
        }     
    }

    function obtenerUltimaEvidencia(){
        $query = "select evidencia_id from evidencia order by evidencia_id desc limit 1";
        $this->db->query($query);
        $response = $this->db->responseUnique();
        if ($response) {
            return $response['evidencia_id'];
        }else{
            return 0;
        }        
    }

    function mostrarAnexos($evidenciaId){

        $dir = './storage/evidencias/' . $evidenciaId . '/';
                                
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
    
    function agregarAnexos($evidenciaId){
        //1. primero creo el directorio
        $dir = './storage/evidencias/' . $evidenciaId . '/';
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
            $result = array('status' => 'failure', 'message'=>'No existen archivos por agregar');
        }
        
        end:
        return $result;


    }

    function agregarAnexosMobile($evidenciaId){
        //1. primero creo el directorio
        $dir = './storage/evidencias/' . $evidenciaId . '/';
        if (!file_exists($dir)) {
           if (!mkdir($dir,0777,true)) {
               $result = array('status' => 'failure', 'message'=>'Directorio no pudo ser creado');
               goto end;
           } 
        }

        //ahora agrego los anexos

        if (isset($_POST['anexos'])) {

            $countfiles = count($_POST['anexos']);

            for ($i=0; $i < $countfiles; $i++) {                 
                // create an image file
                $fp = fopen($dir."imagen".$i.".png", "w+");

                // write the data in image file
                fwrite($fp, base64_decode($_POST['anexos'][$i]));

                // close an open file pointer
                fclose($fp);

            }

            $result = array('status' => 'success', 'message'=>'Archivos subidos con exito');

        }else{
            $result = array('status' => 'failure', 'message'=>'No existen archivos por agregar');
        }
        
        end:
        return $result;


    }
}

?>