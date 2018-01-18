<html>
<head>
    <link rel="stylesheet" href="css/style.css">
    <script src="javascript/validation.js"></script>
</head>
<body>
<section id="user_register">
    <h3>Register</h3>
    <hr>

    <form action='action_register.php' method='post' id="myForm">
        <div class="imgcontainer">
            <img src="images/site/user_avatar.svg" alt="Avatar" class="avatar">
        </div>
        <input type='text' name="username" placeholder=" Write your username" id="username1" onblur="validate('username', this.value)" required>
        <div id="username"></div>
        <input type='password' name="password" placeholder=" Write your password" id="password1" onblur="validate('password', this.value)" required>
        <div id="password"></div>

        <input type='text' name="name" placeholder=" Write your name" id="name1" required><br>
        <input type='email' name="email" placeholder=" Write your email" id="email1" required><br>

        <label>Gender:</label>
        <div class="gender-container">
            <input type="radio" name="gender" class="gender" value="male">
            <p class="label">Male</p>
            <input type="radio" name="gender" class="gender" value="female">
            <p class="label">Female</p>
        </div>


        <input class="button" type="submit" value="Register">
    </form>
</section>
</body>
</html>
