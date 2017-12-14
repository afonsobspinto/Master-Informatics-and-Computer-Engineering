<?php

include_once($_SERVER["DOCUMENT_ROOT"].'/FEUP-LTW/Project1/includes/init.php');

if(isset($_POST['name'])){


    $name = htmlspecialchars($_POST['name']);

    global $dbh;
    $stmt = $dbh->prepare('SELECT usr_id FROM user WHERE usr_username = ?');
    $stmt->execute(array($_SESSION['username']));
    $id = $stmt->fetch(PDO::FETCH_ASSOC);

    $stmt = $dbh->prepare('INSERT INTO todoList (tdl_name, tdl_cat, usr_id) VALUES (?,?,?)');
    $stmt->execute(array($name, "NONE_YET", $id['usr_id']));

    header("Location: index.php");
}
