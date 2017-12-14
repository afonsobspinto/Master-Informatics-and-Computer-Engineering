<?php
include_once($_SERVER["DOCUMENT_ROOT"].'/FEUP-LTW/Project1/includes/init.php');
include_once($_SERVER["DOCUMENT_ROOT"].'/FEUP-LTW/Project1/templates/common/header.php');
include_once('database/user.php');
$info = getAllUserInfo($_SESSION['username']);
?>

<!DOCTYPE html>
<html>
<head>
    <title>Profile FEUP TODO</title>
    <meta charset="utf-8">
    <link rel="stylesheet" href="css/style.css">
    <link href="https://fonts.googleapis.com/css?family=Cherry+Swash" rel="stylesheet">
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" >
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body>
<section id="profile">
    <h1>Profile</h1>
    <img src="images/site/user_avatar.svg">
    <button id="edit">
        <a href="register.php"><img src="images/site/edit.svg" alt="Edit Profile"></a>
        <br>
    </button>
    <table align="center">
        <tr><td> Username </td><td><?php echo $info['usr_username']; ?></td></tr>
        <tr><td> Name </td><td><?php echo $info['usr_name']; ?></td></tr>
        <tr><td> Email </td><td><?php echo $info['usr_email']; ?></td></tr>
        <tr><td> Gender </td><td><?php echo $info['usr_gender']; ?></td></tr>
        <tr><td> Birthday </td><td><?php echo $info['usr_birthdate']; ?></td></tr>
    </table>
</section>
</body>
</html>
<?php
include_once($_SERVER["DOCUMENT_ROOT"].'/FEUP-LTW/Project1/templates/common/footer.php');
?>