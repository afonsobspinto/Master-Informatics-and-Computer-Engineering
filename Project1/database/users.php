<?php

function verifyUserAccount($db, $username, $password) {
	$stmt = $db->prepare('SELECT * FROM user WHERE username = :username');
	$username = trim($username);
    $username = strtolower($username);
	$stmt->bindParam(':username', $username, PDO::PARAM_STR);
	$stmt->execute();
	$username = $stmt->fetch();
	$hashedPassword = $username['password'];
  	return ($username !== false && password_verify($password, $hashedPassword));
}

?>