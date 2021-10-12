<?php

class FoodModel {
    private $db;

    function __construct()
    {
        $this->db = new Database();
    }

    function showFoods() {
        $query = "SELECT * FROM switch_alimentario";

        $this->db->query($query);

        return $this->db->responseAll();
    }
    
    function grupoAlimenticio() {
        $query = "SELECT id, grupo AS name FROM switch_alimentario";

        $this->db->query($query);

        return $this->db->responseAll();
    }
    
    function Alimentos() {
        //if(isset($_REQUEST['id'])) {
            $query = "SELECT
            id AS alimento_id,
            id AS grupoalimenticio_id,
            alimento AS alimento_nombre,
            created_at AS alimento_estado_id
            FROM switch_alimentario";
            
    
            $this->db->query($query);
    
            return $this->db->responseAll();
        //}
    }

    function addFoods() {
        if(isset($_REQUEST['grupo']) && isset($_REQUEST['alimento'])) {
            $grupo = $_REQUEST['grupo'];
            $alimento = $_REQUEST['alimento'];
            $date = strtotime(date('Y-m-d'));

            $query = "INSERT INTO switch_alimentario (grupo, alimento, created_at) VALUES ('$grupo', '$alimento', $date)";

            $this->db->query($query);

            $result = $this->db->rowCount();

            if($result > 0) {
                return 'Alimento añadido correctamente';
            } else {
                return false;
            }
        } else {
            return $_POST;
        }
    }
}