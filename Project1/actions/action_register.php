<?php
require_once (__DIR__."/../config.php");

 if (!isset($_POST['username'])) die('username not set');
 if (!isset($_POST['password'])) die('password not set');

 include_once(ROOT_PATH . '/database/connection.php');
 include_once(ROOT_PATH . '/database/user.php');
 include_once(ROOT_PATH . '/includes/init.php');

 if (!userExists($dbh,$_POST['username']))
 {
     try {
         register($dbh, $_POST['username'], $_POST['password']);
     } catch (PDOException $e) {
         die($e->getMessage());
     }
 }

	
  //header('Location: ' . $_SERVER['HTTP_REFERER']);
?>