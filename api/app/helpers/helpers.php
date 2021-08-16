<?php

function textHeaders(){
    header('Access-Control-Allow-Headers: Access-Control-Allow-Origin, Content-Type');
    header("Access-Control-Allow-Origin: *");    
}

function printJSON($array){
    header('Access-Control-Allow-Headers: Access-Control-Allow-Origin, Content-Type');
    header("Access-Control-Allow-Origin: *");    
    header('Content-type:application/json; charset=utf-8');
    echo json_encode($array, JSON_UNESCAPED_UNICODE);
}

function successFailure($res){

    if ($res) {
      $aux = ['status'=>'success'];
    }else{
      $aux = ['status'=>'failure'];
    }
  
   return $aux;
}

function JSONmessage($string){
  $auxArray = array();
  $auxArray['message'] = $string;
  printJSON($auxArray);
}

function show_controller_error($section, $controller){
  return "El controlador $controller de la seccion $section pudo ser encontrado";
}

function show_action_error($controller,$action){
  return "La accion $action del controlador $controller no pudo ser encontrada";
}

function show_model_error($section,$model){
  return "El modelo $model de la seccion $section no pudo ser encontrado";
}

function message($obj){
  return array('message'=>$obj);
}

?>