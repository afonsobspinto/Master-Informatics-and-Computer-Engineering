<?php
include_once('../../database/user.php');

$tdls = getAllTDLists();

// Get Query String
$q = $_REQUEST['q'];

$suggestion = "";

// Get Suggestions
if($q !== ""){
    $q = strtolower($q);
    $len = strlen($q);
    foreach($tdls as $tdl){
        if(stristr($q, substr($tdl, 0, $len))){
            if($suggestion === ""){
                $suggestion = $tdl;
            } else {
                $suggestion .= ", $tdl";
            }
        }
    }
}

echo $suggestion === "" ? "No Suggestion" : $suggestion;