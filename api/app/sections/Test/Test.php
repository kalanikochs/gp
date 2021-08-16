<?php

class Test extends Controller{
     
    private $model; 
    
    function __construct($action){
       
        //$this->model = $this->assignModel('Common','LoginModel');
        if (is_callable(array($this,$action))) {
            $this->$action();            
        }else{
            JSONmessage(show_action_error(get_class($this),$action));
            die();
        }
        
    }

    function main(){
        textHeaders();
        echo "hola mundo";
    }

    function uploadFile(){
        textHeaders();
        $countfiles = count($_FILES['basicFile']['name']);
        $name = $_POST['name'];
                
        for ($i=0; $i < $countfiles; $i++) { 
            $filename = $_FILES['basicFile']['name'][$i];
            $fileExtension = pathinfo($filename, PATHINFO_EXTENSION);
            $location = './storage/'.$name.$i.".".$fileExtension;
            move_uploaded_file($_FILES['basicFile']['tmp_name'][$i],$location);
        }

        var_dump("imagenes subidas con exito");

    }

    function mostrarTest(){
       
        $db = new Database();

        $query = "SELECT * FROM test";

        $db->query($query);
        var_dump($db->responseAll());
    }

    function updateTest(){

        $db = new Database();

        $str = "update test set test_desc='hola 2' where test_id=1";
        $db->query($str);

        var_dump($db->rowCount());
        die();
    }

    function getPost(){
        var_dump($_POST);
    }
    
    function getFiles(){
        textHeaders();
        var_dump($_FILES);
    }

    function ejemploLinks(){
        $ejemploLinks = [
                            ['nombre'=>'link1',
                            'link'=>'https://www.google.com.co'],
                            ['nombre'=>'link2',
                            'link'=>'https://www.youtube.com/']
        ];

        printJSON($ejemploLinks);
    }
    
    function try(){
        $db = new Database();
        
        $query="select * from persona";
        
        $db->query($query);
        
        $response = $db->responseAll();
        
        var_dump($response);
        
    }
}
?>