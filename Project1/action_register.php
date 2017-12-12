<?php
 if (!isset($_POST['username'])) die('username not set');
 if (!isset($_POST['password'])) die('password not set');

 include_once('database/connection.php'); // connects to the database

 include_once('database/user.php'); // loads the functions responsible for the users table
  
 include_once('includes/init.php');

 if (!userExists($dbh,$_POST['username'])) // test if user exists
 {
     try {
         register($dbh, $_POST['username'], $_POST['password']);
     } catch (PDOException $e) {
         die($e->getMessage());
     }
 }

	
  //header('Location: ' . $_SERVER['HTTP_REFERER']);
?>