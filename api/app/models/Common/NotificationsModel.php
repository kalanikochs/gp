<?php

class NotificationsModel
{
    private $db;

    function __construct()
    {
        $this->db = new Database();
    }

    function shownotifications()
    {
        if (!isset($_REQUEST['id'])) {
            return [];
        }

        $id = $_REQUEST['id'];

        $squery = "SELECT * from notificacion WHERE usuario_id = $id AND estatus_notificacion_id=1";

        $this->db->query($squery);
        return $this->db->responseAll();
    }

    function sendNotifications()
    {
        $title = isset($_REQUEST['title']) ? $_REQUEST['title'] : '';
        $description = isset($_REQUEST['description']) ? $_REQUEST['description'] : '';
        $usuario = isset($_REQUEST['usuario']) ? $_REQUEST['usuario'] : '';
        $date = isset($_REQUEST['date']) ? $_REQUEST['date'] : '';

        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => 'https://onesignal.com/api/v1/notifications',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS => '{
                "app_id": "c62835e1-5eb7-4af5-be25-082a71fdbeac",
                "headings": {"en": "'.$title.'"}
                "contents": {"en": "'.$description.'"},
                "include_player_ids": ["'.$usuario.'"],
                "data": {"test": "test"},
            }',
            CURLOPT_HTTPHEADER => array(
                'Content-Type: application/json; charset=utf-8',
                'Authorization: Basic NGNlNWZhZmMtOGZmNS00MzRiLTljN2ItZDg3MzNiZmY0ZDZh'
            ),
        ));

        $response = curl_exec($curl);

        curl_close($curl);
        echo $response;
        /* if (!isset($_REQUEST['id'])) {
            return [];
        }

        $id = $_REQUEST['id'];

        $squery="SELECT * from notificacion WHERE usuario_id = $id AND estatus_notificacion_id=1";

        $this->db->query($squery);
        return $this->db->responseAll(); */
    }

    function updateNotifications()
    {
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
