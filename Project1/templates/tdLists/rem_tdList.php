<?php

include_once($_SERVER["DOCUMENT_ROOT"].'/FEUP-LTW/Project1/includes/init.php');

if(isset($_POST['tdl_id'])){


    $name = htmlspecialchars($_POST['tdl_id']);

    global $dbh;

    $stmt = $dbh->prepare('SELECT * FROM task WHERE tdl_id = ?');
    $stmt->execute(array($id['tdl_id']));
    $tasks = $stmt->fetch(PDO::FETCH_ASSOC);

    foreach($tasks as $task){
        $stmt = $dbh->prepare('DELETE FROM task WHERE tdl_id = ?');
        $stmt->execute(array($task['tdl_id']));
        $id = $stmt->fetch(PDO::FETCH_ASSOC);
    }

    $stmt = $dbh->prepare('DELETE FROM todoList WHERE tdl_id = ?');
    $stmt->execute(array($tdl_id));
    $id = $stmt->fetch(PDO::FETCH_ASSOC);

}
