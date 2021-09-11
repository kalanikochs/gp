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
        textHeaders();
        $title = isset($_REQUEST['title']) ? $_REQUEST['title'] : '';
        $description = isset($_REQUEST['description']) ? $_REQUEST['description'] : '';
        $usuarios = isset($_REQUEST['usuario']) ? $_REQUEST['usuario'] : '';
        $date = isset($_REQUEST['date']) ? $_REQUEST['date'] : '';

        $users = explode(',', $usuarios);

        $fields = array(
            'app_id' => "949d218f-1a5d-4f1b-9dd0-ea8999076061",
            'include_player_ids' => $users,
            'data' => array("test" => "test"),
            'headings' => array(
                'en' => $title
            ),
            'contents' => array(
                "en" => $description
            ),
            'send_afert' => $date. ' GMT-5'
        );

        $fields = json_encode($fields);

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, "https://onesignal.com/api/v1/notifications");
        curl_setopt($ch, CURLOPT_HTTPHEADER,
            [
                'Content-Type: application/json; charset=utf-8',
                'Authorization: Basic MmMyYWQ2YzAtNWQ0My00NjdjLWJiOTEtOWMwY2VhN2IxM2Uz'
            ]
        );
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        curl_setopt($ch, CURLOPT_HEADER, FALSE);
        curl_setopt($ch, CURLOPT_POST, TRUE);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);

        $response = curl_exec($ch);
        curl_close($ch);

        return $fields;
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
