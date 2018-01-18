<?php
include_once(__DIR__ . '/database/user.php');
include_once(__DIR__ . '/database/connection.php');

$value = $_GET['query'];
$formfield = $_GET['field'];

//Check Valid or Invalid username
if ($formfield == "username") {
    if (userExists($value)) {
        echo "<span>User Already Exists</span><br>";
    } else if (strlen($value) < 4) {
        echo "<span>Must be 3+ letters</span><br>";
    } else {
        echo "<span>Valid</span><br>";
    }
}

//Check Valid or Invalid password
if ($formfield == "password") {
    if (strlen($value) < 6) {
        echo "<span>Password too short</span><br>";
    } else {
        echo "<span>Strong</span><br>";
    }
}

?>