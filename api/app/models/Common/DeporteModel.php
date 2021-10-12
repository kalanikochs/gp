<?php

class DeporteModel {
    private $db;

    function __construct()
    {
        $this->db = new Database();
    }

    function showDeportes() {
        $query = "SELECT * FROM switch_deportivo";

        $this->db->query($query);

        return $this->db->responseAll();
    }
    
    function grupoDeportivo() {
        $query = "SELECT id, rutina AS name FROM switch_deportivo";

        $this->db->query($query);

        return $this->db->responseAll();
    }
    
    function Ejercicio() {
        //if(isset($_REQUEST['id'])) {
            $query = "SELECT
            id AS alimento_id,
            id AS grupoalimenticio_id,
            ejercicio AS alimento_nombre,
            status AS alimento_estado_id
            FROM switch_deportivo";
            
    
            $this->db->query($query);
    
            return $this->db->responseAll();
        //}
    }

    function addDeportes() {
        if(isset($_REQUEST['rutina']) && isset($_REQUEST['ejercicio'])) {
            $rutina = $_REQUEST['rutina'];
            $ejercicio = $_REQUEST['ejercicio'];
            $date = strtotime(date('Y-m-d'));

            $query = "INSERT INTO switch_deportivo (rutina, ejercicio, status, created_at) VALUES ('$rutina', '$ejercicio', '1', $date)";

            $this->db->query($query);

            $result = $this->db->rowCount();

            if($result > 0) {
                return 'Grupo Deportivo a単adido correctamente';
            } else {
                return false;
            }
        } else {
            return $_POST;
        }
    }
}