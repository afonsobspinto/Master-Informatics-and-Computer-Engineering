<?php
include_once($_SERVER["DOCUMENT_ROOT"].'/FEUP-LTW/Project1/includes/init.php');
include_once('../../database/todoList.php');

$tdls = getAllTDLists();

// Get Query String
$q = $_REQUEST['q'];

$suggestion = "";

// Get Suggestions
if($q !== ""){
    $q = strtolower($q);
    $len = strlen($q);
    foreach($tdls as $tdl){
        $name = $tdl['tdl_name'];
        if(stristr($q, substr($name, 0, $len))){
            if($suggestion === ""){
                $suggestion = $name;
            } else {
                $suggestion .= ", $name";
            }
        }
    }
}

echo $suggestion === "" ? "No Lists Found" : $suggestion;