<?php
class NotificationsModel {
    private $db;

    function __construct(){
        $this->db = new Database();
    }

    function notificaciones(){

        $query = "SELECT * FROM `notificaciones`";

        $this->db->query($query);
        $result = $this->db->responseAll();

        if ($result) {
            return $result;
        }else{
            return false;
        }

    }

    function savePush() {
        textHeaders();
        //if(!empty($_POST)) {
            $id = $_REQUEST['persona_id']; $title = $_REQUEST['title']; $msg = $_REQUEST['message']; $date = $_REQUEST['date'];
            $query = "INSERT INTO notificaciones (persona_id,titulo,mensaje,fecha) VALUES ('".$id."','".$title."','".$msg."','".$date."')";
            $this->db->query($query);
            $result = $this->db->rowCount();

            if ($result > 0) {
                return array('status' => 'success', 'message'=>'Datos ingresados con exito');            
            }else{
                return array('status' => 'failure', 'message'=>'Problema con la base de datos');
            }
        /*} else {
            return $_POST;
        }*/
    }
}