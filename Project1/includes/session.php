<?php
  session_start();




  function setCurrentUser($username) {
    $_SESSION['username'] = $username;
  }

?>
