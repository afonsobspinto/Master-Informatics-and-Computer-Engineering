<?php

include_once($_SERVER["DOCUMENT_ROOT"].'/FEUP-LTW/Project1/includes/init.php');

if(isset($_POST['tsk_id'])){


    $id = htmlspecialchars($_POST['tsk_id']);
    echo 'Post: Your name is '. $_POST['tsk_id'];


}
