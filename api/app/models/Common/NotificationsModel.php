<?php

class NotificationsModel{
    private $db;

    function __construct(){        
        $this->db = new Database();
    }

    function shownotifications(){
        if (!isset($_REQUEST['id'])) {
            return [];
        }

        $id = $_REQUEST['id'];

        $squery="SELECT * from notificacion WHERE usuario_id = $id AND estatus_notificacion_id=1";

        $this->db->query($squery);
        return $this->db->responseAll();
    }

    function updateNotifications(){
        if (!isset($_REQUEST['ids'])) {
            return false;
        }

        $ids = json_decode($_REQUEST['ids']);

        foreach ($ids as $key => $id) {
            $squery = "UPDATE notificacion SET estatus_notificacion_id=2 WHERE notificacion_id=$id";
            $this->db->query($squery);
            $this->db->execute();
        }

        return true;
    }

}

?>