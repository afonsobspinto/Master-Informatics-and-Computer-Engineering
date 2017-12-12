<?php
  include_once(ROOT_PATH.'/includes/init.php');

  session_destroy();

  session_start();
  $_SESSION['success_messages'][] = "User logged out!";

  header('Location: ' . $_SERVER['HTTP_REFERER']);
?>
