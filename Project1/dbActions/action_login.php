<?php
	if (!isset($_POST['username'])) die('No Username');
 	if (!isset($_POST['password'])) die('No Password');

    session_start();
    include_once '../database/connection.php';
    include_once '../database/users.php';

    $username = htmlentities($_POST['username'], ENT_QUOTES, "UTF-8");
    $username = trim($username);
    $username = strtolower($username);
    $password = $_POST['password'];

    if(verifyUserAccount($db, $username, $password)) {

    	$_SESSION['username'] = $_POST['username'];
      	$_SESSION['is_logged'] = true;
    }
?>
