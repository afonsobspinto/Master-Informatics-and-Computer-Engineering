<?php

include_once(__DIR__ .'/../../includes/init.php');

if(isset($_POST['tsk_id'])){

    $id = htmlspecialchars($_POST['tsk_id']);

    global $dbh;
    $stmt = $dbh->prepare('DELETE FROM task WHERE tsk_id = ?');
    $stmt->execute(array($id));
    $id = $stmt->fetch(PDO::FETCH_ASSOC);

}
