<!DOCTYPE html>
<html>

<head>
    <title>To Do List</title>
    <meta charset="utf-8">
    <link rel="stylesheet" href="css/style.css">
    <link href="https://fonts.googleapis.com/css?family=Cherry+Swash" rel="stylesheet">
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" >
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body id="header">

<header>
    <div id="info">
        <a href="#">
            <img src="images/site/logo.svg" alt="Logo">
        </a>
    </div>

    <nav id="main-nav">
        <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="../../../../FEUP-LTW/Project1/search.php">Search</a></li>
            <?php if (isset($_SESSION['username']) && $_SESSION['username'] != '') { ?>
                <li><a href="#"><?=$_SESSION['username']?></a></li>
                <li><a href="action_logout.php">Logout</a></li>
            <?php } else { ?>
                <li><a href="#about">About</a></li>
                <li><a href="#team">Team</a></li>
                <li><a href="login.php">Login</a></li>
                <li><a href="register.php">Register</a></li>
            <?php } ?>
        </ul>
    </nav>

    <section id="messages">
        <?php $errors = getErrorMessages();foreach ($errors as $error) { ?>
            <article class="error">
                <p><?=$error?></p>
            </article>
        <?php } ?>
        <?php $successes = getSuccessMessages();foreach ($successes as $success) { ?>
            <article class="success">
                <p><?=$success?></p>
            </article>
        <?php } clearMessages(); ?>
    </section>
</header>




