<?php

class LoginModel
{
    private $db;

    function __construct()
    {
        $this->db = new Database();
    }

    function verificarInfoLogin()
    {
        $queryStr = "SELECT * FROM persona where persona_email=:email 
                        and persona_contrasena=:pwd and estado_persona_id=1";
        $this->db->query($queryStr);
        $this->db->bind(':email', $_REQUEST['email']);
        $this->db->bind(':pwd', $_REQUEST['password']);

        $response = $this->db->responseUnique();

        if ($response) {
            return $response;
        } else {
            return false;
        }
    }

    function bringInfoId($id)
    {

        $queryStr = "SELECT * FROM persona where persona_id=:id";
        $this->db->query($queryStr);
        $this->db->bind(':id', $id);

        return $response = $this->db->responseUnique();
    }

    function changedata()
    {
        return true;
    }

    function bringToken()
    {
        $query =
            "
        select t.token_desc
        from token t
        where token_id = 1

        ";

        $this->db->query($query);

        $result = $this->db->responseUnique();

        if ($result) {
            return $result['token_desc'];
        } else {
            return false;
        }
    }
}
