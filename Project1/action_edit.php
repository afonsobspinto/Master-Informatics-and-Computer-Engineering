
<?php
if (!isset($_POST['username'])) die('username not set');
if (!isset($_POST['password'])) die('password not set');
if (!isset($_POST['oldpassword'])) die('oldPassword not set');
if (!isset($_POST['email'])) die('email not set');

include_once(__DIR__ . '/database/connection.php'); // connects to the database
include_once(__DIR__ . '/database/user.php'); // loads the functions responsible for the users table
include_once(__DIR__ . '/includes/init.php');

$options = ['cost' => 12];
$username = htmlspecialchars($_POST['username']);
$password = htmlspecialchars($_POST['password']);
$oldpassword = htmlspecialchars($_POST['oldpassword']);
$password_hashed = password_hash($password, PASSWORD_DEFAULT, $options);
$email = htmlspecialchars($_POST['email']);

if(!isLoginCorrect($_SESSION['username'], $oldpassword)) die('invalid password');

global $dbh;

$stmt = $dbh->prepare('SELECT usr_id FROM user WHERE usr_username = ?');
$stmt->execute(array($_SESSION['username']));
$id = $stmt->fetch(PDO::FETCH_ASSOC);

$stmt = $dbh->prepare('UPDATE user SET usr_username = ?,
      usr_password = ?, usr_email = ? WHERE usr_id = ?');

$stmt->execute(array($username,$password_hashed, $email, $id['usr_id']));

session_destroy();

session_start();
$_SESSION['success_messages'][] = "User logged out!";

header('Location: ' . "index.php");



?>