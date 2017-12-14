<?php

include_once($_SERVER["DOCUMENT_ROOT"].'/FEUP-LTW/Project1/includes/init.php');

if(isset($_POST['tsk_id'])){

    $id = htmlspecialchars($_POST['tsk_id']);

    global $dbh;
    $stmt = $dbh->prepare('DELETE FROM task WHERE tsk_id = ?');
    $stmt->execute(array($id));
    $id = $stmt->fetch(PDO::FETCH_ASSOC);

}
