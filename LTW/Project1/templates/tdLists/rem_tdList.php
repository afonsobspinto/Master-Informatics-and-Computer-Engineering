<?php

include_once(__DIR__ . '/../../includes/init.php');

if(isset($_POST['id'])){
    $id = htmlspecialchars($_POST['id']);
    global $dbh;

    $stmt = $dbh->prepare('DELETE FROM task WHERE tdl_id = ?');
    $stmt->execute(array($id));

    $stmt = $dbh->prepare('DELETE FROM todoList WHERE tdl_id = ?');
    $stmt->execute(array($id));
    $id = $stmt->fetch(PDO::FETCH_ASSOC);

}
