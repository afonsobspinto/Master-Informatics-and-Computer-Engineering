<?php
include_once(__DIR__ . '/includes/init.php');

session_destroy();

session_start();
$_SESSION['success_messages'][] = "User logged out!";

header('Location: ' . "index.php");
?>
