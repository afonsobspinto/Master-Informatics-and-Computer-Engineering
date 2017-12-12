<?php
include_once(ROOT_PATH . '/includes/init.php');
include_once(ROOT_PATH . '/database/user.php');


  if (isLoginCorrect($_POST['username'], $_POST['password'])) {
    setCurrentUser($_POST['username']);
    $_SESSION['success_messages'][] = "Login Successful!";
  } else {
    $_SESSION['error_messages'][] = "Login Failed!";
  }

  header('Location: ' . $_SERVER['HTTP_REFERER']);
?>
