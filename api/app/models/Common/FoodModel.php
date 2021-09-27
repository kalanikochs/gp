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

    function addFoods() {
        if(isset($_REQUEST['grupo']) && isset($_REQUEST['alimento'])) {
            $grupo = $_REQUEST['grupo'];
            $alimento = $_REQUEST['alimento'];
            $date = strtotime(date('Y-m-d'));

            $query = "INSERT INTO switch_alimentario (grupo,alimento,created_at) VALUES ($grupo, $alimento, $date)";

            $this->db->query($query);

            $result = $this->db->rowCount();

            if($result > 0) {
                return true;
            } else {
                return false;
            }
        }
    }
}