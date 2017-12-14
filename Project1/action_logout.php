<?php
include_once($_SERVER["DOCUMENT_ROOT"].'/FEUP-LTW/Project1/includes/init.php');

session_destroy();

session_start();
$_SESSION['success_messages'][] = "User logged out!";

header('Location: ' . $_SERVER['HTTP_REFERER']);
?>
