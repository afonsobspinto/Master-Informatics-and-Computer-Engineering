
<?php
if (!isset($_POST['username'])) die('username not set');
if (!isset($_POST['password'])) die('password not set');

include_once($_SERVER["DOCUMENT_ROOT"].'/FEUP-LTW/Project1/database/connection.php'); // connects to the database
include_once($_SERVER["DOCUMENT_ROOT"].'/FEUP-LTW/Project1/database/user.php'); // loads the functions responsible for the users table
include_once($_SERVER["DOCUMENT_ROOT"].'/FEUP-LTW/Project1/includes/init.php');

echo

//header('Location: ' . $_SERVER['HTTP_REFERER']);
header('location:index.php');

?>