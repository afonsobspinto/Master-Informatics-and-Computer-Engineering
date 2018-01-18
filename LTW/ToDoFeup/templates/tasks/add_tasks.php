<?php
include_once(__DIR__ .'/../../includes/init.php');

if( !empty($_POST['name']) && !empty($_POST['lst_id'])){
    $name = htmlspecialchars($_POST['name']);
    $lst_id = htmlspecialchars($_POST['lst_id']);
    global $dbh;
    $stmt = $dbh->prepare('INSERT INTO task (tsk_description, tsk_datedue, tsk_status, tdl_id) VALUES (?,?,?,?)');
    $stmt->execute(array($name, 0, 0, $lst_id));
}
else{
	http_response_code(400);
}