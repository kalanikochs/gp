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

    function mostrarRutina(){

        $rutinas = $this->model->mostrarRutina();
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
    
    function mostrarGruposDeportivos(){

        $gruposAlimenticios = $this->model->mostrarGruposDeportivos();
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

    function mostrarGruposPsicologia(){

        $gruposAlimenticios = $this->model->mostrarGruposPsicologia();
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

    function mostrarGrupoMedico(){

        $gruposAlimenticios = $this->model->mostrarGrupoMedico();
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
    
    function agregarEjercicio() {

        $gruposAlimenticios = $this->model->agregarEjercicio();
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

    function agregarTerapia() {

        $gruposAlimenticios = $this->model->agregarTerapia();
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

    function agregarReceta() {

        $gruposAlimenticios = $this->model->agregarReceta();
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

    function agregarObservacion(){

        $gruposAlimenticios = $this->model->agregarObservacion();
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

    function mostrarObservaciones(){

        $alimentos = $this->model->mostrarObservaciones();
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
    
    function mostrarEjercicios() {

        $alimentos = $this->model->mostrarEjercicios();
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

    function mostrarIndicaciones() {

        $alimentos = $this->model->mostrarIndicaciones();
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

    function mostrarIndicacionesM() {

        $alimentos = $this->model->mostrarIndicacionesM();
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
    
    function mostrarJornadasDeportivas(){

        $jornadasAlimenticias = $this->model->mostrarJornadasDeportivas();
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
    
    function agregarRutinaEjercicio(){
        textHeaders();

        $agregarEjercicio = $this->model->agregarRutinaEjercicio();
        
        printJSON($agregarEjercicio);

    }

    function agregarIndicacion(){
        textHeaders();

        $agregarAlimento = $this->model->agregarIndicacion();
        
        printJSON($agregarAlimento);

    }

    function agregarIndicacionM(){
        textHeaders();

        $agregarAlimento = $this->model->agregarIndicacionM();
        
        printJSON($agregarAlimento);

    }

    function modificarAlimento(){
        $modificarAlimento = $this->model->modificarAlimento();
        
        printJSON($modificarAlimento);
    }
    
    function modificarEjercicio(){
        $modificarAlimento = $this->model->modificarEjercicio();
        
        printJSON($modificarAlimento);
    }

    function modificarIndicaciones(){
        $modificarAlimento = $this->model->modificarIndicaciones();
        
        printJSON($modificarAlimento);
    }

    function modificarIndicacionesM(){
        $modificarAlimento = $this->model->modificarIndicacionesM();
        
        printJSON($modificarAlimento);
    }
}

?>