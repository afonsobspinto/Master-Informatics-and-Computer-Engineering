<?php

include_once('database/connection.php');

  function isLoginCorrect($username, $password) {
    global $dbh;
    $stmt = $dbh->prepare('SELECT password FROM User WHERE username = ?');
    $stmt->execute(array($username));
    $userInfo = $stmt->fetch();
    return ($userInfo !== false && password_verify($password, $userInfo['password']));
}


  function userExists($dbh,$username){
    echo('Checking if user exists in db <br>');
    $stmt = $dbh->prepare('SELECT * FROM User WHERE username = ?');
    $stmt->execute(array($username));
    $result = $stmt->fetchAll();
    if ($result){
      echo('user exists in db <br>');
      return true;
    }
    echo('user does not exist in db <br>');
    return false;
  }


  function register($db, $username, $password) {

    $options = ['cost' => 12];
    $hash = password_hash($password, PASSWORD_DEFAULT, $options);
    //$hash = password_hash($password, PASSWORD_BCRYPT, $options);

    $stmt = $db->prepare('INSERT INTO User(username, password) VALUES(?,?);');

    return ($stmt->execute(array($username, $hash))) ? 0 : 1;
  }
  
  


?>
