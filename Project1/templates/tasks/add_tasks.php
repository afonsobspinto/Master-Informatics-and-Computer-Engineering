<?php


include_once($_SERVER["DOCUMENT_ROOT"].'/FEUP-LTW/Project1/includes/init.php');


if(isset($_POST['name']) AND isset($_POST['lst_id'])){

    $name = htmlspecialchars($_POST['name']);
    $lst_id = htmlspecialchars($_POST['lst_id']);

    global $dbh;
    $stmt = $dbh->prepare('SELECT usr_id FROM user WHERE usr_username = ?');
    $stmt->execute(array($_SESSION['username']));
    $id = $stmt->fetch(PDO::FETCH_ASSOC);

    $stmt = $dbh->prepare('INSERT INTO task (tsk_description, tsk_datedue, tsk_status, tdl_id) VALUES (?,?,?,?)');
    $stmt->execute(array($name, 0, 0, $lst_id));

}