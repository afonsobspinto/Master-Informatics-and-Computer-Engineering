<?php

include_once(__DIR__ .'/../../includes/init.php');

if(isset($_POST['tsk_id'])){

    $id = htmlspecialchars($_POST['tsk_id']);

    global $dbh;
    $stmt = $dbh->prepare('UPDATE task SET tsk_status = 1 WHERE tsk_id = ?');
    $stmt->execute(array($id));
    $id = $stmt->fetch(PDO::FETCH_ASSOC);
}
