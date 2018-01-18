<html>
<head>
    <link rel="stylesheet" href="css/style.css">
    <script src="javascript/validation.js"></script>
</head>
<body>
<section id="user_register">
    <h3>Edit Profile</h3>
    <hr>

    <form action='action_edit.php' method='post' id="myForm">
        <div class="imgcontainer">
            <img src="images/site/user_avatar.svg" alt="Avatar" class="avatar">
        </div>
        <input type='text' name="username" placeholder=" Write your new username" id="username1" onblur="validate('username', this.value)" required></td>
        <div id="username"></div></td>
        <input type='password' name="password" placeholder=" Write your new password" id="password1" onblur="validate('password', this.value)" required>
        <div id="password"></div><br>
        <input type='password' name="oldpassword" placeholder=" Write your old password" id="password1" onblur="validate('oldPassword', this.value)" required>
        <div id="password"></div><br>
        <input type='email' name="email" placeholder=" Write your  email" id="email1" onblur="validate('email', this.value)" required>
        <div id="email"></div><br>
        <input class="button" type="submit" value="Edit">
    </form>
</section>
</body>
</html>
