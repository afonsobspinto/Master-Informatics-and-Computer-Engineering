<?php

include_once(__DIR__ . '/../../includes/init.php');

if(!empty($_POST['name'])){
    $name = htmlspecialchars($_POST['name']);

    global $dbh;
    $stmt = $dbh->prepare('SELECT usr_id FROM user WHERE usr_username = ?');
    $stmt->execute(array($_SESSION['username']));
    $id = $stmt->fetch(PDO::FETCH_ASSOC);

    $stmt = $dbh->prepare('INSERT INTO todoList (tdl_name, tdl_cat, usr_id) VALUES (?,?,?)');
    $stmt->execute(array($name, "NONE_YET", $id['usr_id']));
}
else{
	http_response_code(400);
}
