<?php

class Rutinas extends Controller{
    private $model; 
    
    function __construct($action){
       
        $this->model = $this->assignModel('Shared','RutinasModel');
        if (is_callable(array($this,$action))) {
            $this->$action();            
        }else{
            JSONmessage(show_action_error(get_class($this),$action));
            die();
        }
        
    }

    function mostrarRutinas(){

        $rutinas = $this->model->mostrarRutinas();
        $response;       

        if ($rutinas) {
            $response = successFailure(true);
            $rutinas = message($rutinas);
            $response = array_merge($response, $rutinas);
        }else{
            $response = successFailure(false);
        }

        printJSON($response);
    }

    function agregarRutina(){

        $solicitudRutina = $this->model->agregarRutina();
        
        printJSON($solicitudRutina);

    }

    function editarRutina(){
        $editarRutinas = $this->model->editarRutina();
        $response;

        if ($editarRutinas) {
            $response = successFailure(true);
        }else{
            $response= successFailure(false);
        }

        printJSON($response);
    }

    function editarInformacionRutina(){
        $editarInformacionRutinas = $this->model->editarInformacionRutina();
        
        printJSON($editarInformacionRutinas);
    }

    function mostrarRutinaActual(){

        $rutinaActual = $this->model->mostrarRutinaActual();
        $response;       

        if ($rutinaActual) {
            $response = successFailure(true);
            $rutinaActual = message($rutinaActual);
            $response = array_merge($response, $rutinaActual);
        }else{
            $response = successFailure(false);
        }

        printJSON($response);
    }
    
    function mostrarGruposAlimenticios(){

        $gruposAlimenticios = $this->model->mostrarGruposAlimenticios();
        $response;       

        if ($gruposAlimenticios) {
            $response = successFailure(true);
            $gruposAlimenticios = message($gruposAlimenticios);
            $response = array_merge($response, $gruposAlimenticios);
        }else{
            $response = successFailure(false);
        }

        printJSON($response);

    }

    function mostrarAlimentos(){

        $alimentos = $this->model->mostrarAlimentos();
        $response;       

        if ($alimentos) {
            $response = successFailure(true);
            $alimentos = message($alimentos);
            $response = array_merge($response, $alimentos);
        }else{
            $response = successFailure(false);
        }

        printJSON($response);

    }

    function mostrarDias(){
        $dias = $this->model->mostrarDias();
        $response;       

        if ($dias) {
            $response = successFailure(true);
            $dias = message($dias);
            $response = array_merge($response, $dias);
        }else{
            $response = successFailure(false);
        }

        printJSON($response);
    }

    function mostrarJornadasAlimenticias(){

        $jornadasAlimenticias = $this->model->mostrarJornadasAlimenticias();
        $response;       

        if ($jornadasAlimenticias) {
            $response = successFailure(true);
            $jornadasAlimenticias = message($jornadasAlimenticias);
            $response = array_merge($response, $jornadasAlimenticias);
        }else{
            $response = successFailure(false);
        }

        printJSON($response);

    }

    function agregarAlimento(){
        textHeaders();

        $agregarAlimento = $this->model->agregarAlimento();
        
        printJSON($agregarAlimento);

    }

    function modificarAlimento(){
        $modificarAlimento = $this->model->modificarAlimento();
        
        printJSON($modificarAlimento);
    }
}

?>