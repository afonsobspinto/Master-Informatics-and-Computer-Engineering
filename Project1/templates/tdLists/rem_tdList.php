<?php

include_once($_SERVER["DOCUMENT_ROOT"].'/FEUP-LTW/Project1/includes/init.php');

echo 'Processing...';

if(isset($_POST['id'])){
    echo 'POST: Your id is '. $_POST['id'];

    $id = htmlspecialchars($_POST['id']);
    global $dbh;

    $stmt = $dbh->prepare('DELETE FROM task WHERE tdl_id = ?');
    $stmt->execute(array($id));

    $stmt = $dbh->prepare('DELETE FROM todoList WHERE tdl_id = ?');
    $stmt->execute(array($id));
    $id = $stmt->fetch(PDO::FETCH_ASSOC);

}
else{
    echo 'Shit...';
}