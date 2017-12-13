<html>
<head>
    <link rel="stylesheet" href="../../css/style.css">
    <script src="../../javascript/validation.js"></script>
</head>
<body>
<section id="user_register">
    <h3>Register</h3>
    <hr>

    <form action='../../action_register.php' method='post' id="myForm">
        <div class="imgcontainer">
            <img src="../../images/site/user_avatar.svg" alt="Avatar" class="avatar">
        </div>
        <input type='text' name="username" placeholder=" Write your username" id="username1" onblur="validate('username', this.value)" required></td>
        <div id="username"></div></td>
        <input type='password' name="password" placeholder=" Write your password" id="password1" onblur="validate('password', this.value)" required>
        <div id="password"></div><br>
        <input class="button" type="submit" value="Register">
    </form>
</section>
</body>
</html>
