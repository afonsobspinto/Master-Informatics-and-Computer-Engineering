<?php

   function isLoginCorrect($username, $password) {
    global $dbh;
    $stmt = $dbh->prepare('SELECT usr_password FROM user WHERE usr_username = ?');
    $stmt->execute(array($username));
    $userInfo = $stmt->fetch();
    return ($userInfo !== false && password_verify($password, $userInfo['usr_password']));
}
  
   function userExists($dbh,$username){
    $stmt = $dbh->prepare('SELECT * FROM user WHERE usr_username = ?');
    $stmt->execute(array($username));
    $result = $stmt->fetchAll();
    if ($result){
      return true;
    }
    return false;
  }

  function register($db, $username, $password) {

    $options = ['cost' => 12];
    $hash = password_hash($password, PASSWORD_DEFAULT, $options);

    $stmt = $db->prepare('INSERT INTO user(usr_username, usr_password) VALUES(?,?);');

    return ($stmt->execute(array($username, $hash))) ? 0 : 1;
  }

?>
