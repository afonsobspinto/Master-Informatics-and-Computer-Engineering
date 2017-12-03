<?php

include_once('database/connection.php');

function isLoginCorrect($username, $password)
{
    global $dbh;
    $stmt = $dbh->prepare('SELECT * FROM user WHERE usr_username = ? AND usr_password = ?');
    $stmt->execute(array($username, sha1($password)));
    return $stmt->fetch() !== false;
}


function userExists($username)
{
    global $dbh;
    $stmt = $dbh->prepare('SELECT * FROM user WHERE usr_username = ?');
    $stmt->execute(array($username));
    $result = $stmt->fetchAll();
    if ($result) {
        return true;
    }

    return false;
}


function register($username, $password)
{
    global $dbh;
    $options = ['cost' => 12];
    $hash = password_hash($password, PASSWORD_DEFAULT, $options);

    $stmt = $dbh->prepare('INSERT INTO user(usr_username, usr_password) VALUES(?,?);');

    return ($stmt->execute(array($username, $hash))) ? false : true;
}


?>
