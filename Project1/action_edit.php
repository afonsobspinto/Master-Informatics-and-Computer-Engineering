
<?php
if (!isset($_POST['username'])) die('username not set');
if (!isset($_POST['password'])) die('password not set');
if (!isset($_POST['oldPassword'])) die('oldPassword not set');

include_once($_SERVER["DOCUMENT_ROOT"].'/FEUP-LTW/Project1/database/connection.php'); // connects to the database
include_once($_SERVER["DOCUMENT_ROOT"].'/FEUP-LTW/Project1/database/user.php'); // loads the functions responsible for the users table
include_once($_SERVER["DOCUMENT_ROOT"].'/FEUP-LTW/Project1/includes/init.php');

$options = ['cost' => 12];
$username = htmlspecialchars($_POST['username']);
$password = htmlspecialchars($_POST['password']);
$oldpassword = htmlspecialchars($_POST['oldPassword']);
$password_hashed = password_hash($password, PASSWORD_DEFAULT, $options);

if(!isLoginCorrect($_SESSION['username'], $oldpassword)) die('invalid password');

global $dbh;

$stmt = $dbh->prepare('SELECT usr_id FROM user WHERE usr_username = ?');
$stmt->execute(array($_SESSION['username']));
$id = $stmt->fetch(PDO::FETCH_ASSOC);

$stmt = $dbh->prepare('UPDATE user SET usr_username = ?,
      usr_password = ? WHERE usr_id = ?');

$stmt->execute(array($username,$password_hashed, $id['usr_id']));

header("Location: index.php");


?>