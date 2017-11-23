<?php
include_once('includes/init.php');
include_once('database/user.php');
include_once('templates/common/user.php');

  if (isLoginCorrect($_POST['username'], $_POST['password'])) {
    setCurrentUser($_POST['username']);
  }


  header('Location: ' . $_SERVER['HTTP_REFERER']);
  
   //header('Location: templates/common/user.php?id=' . $_POST['username']);
  
?>
