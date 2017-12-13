<?php

 if (!isset($_POST['username'])) die('username not set');
 if (!isset($_POST['password'])) die('password not set');

 include_once('database/connection.php');
 include_once('database/user.php');
 include_once('includes/init.php');

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