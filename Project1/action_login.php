<?php
include_once('includes/init.php');
include_once('database/user.php');

if (isLoginCorrect($_POST['username'], $_POST['password'])) {
    setCurrentUser($_POST['username']);
    $_SESSION['success_messages'][] = "Login Successful!";
} else {
    $_SESSION['success_messages'][] = "Login Failed!";
}


//header('Location: ' . $_SERVER['HTTP_REFERER']);
header('location:index.php');

//header('Location: templates/common/user.php?id=' . $_POST['username']);

?>


