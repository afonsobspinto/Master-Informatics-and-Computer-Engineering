<link rel="stylesheet" href="../../css/style.css">

<div id="user">
  <?php if (isset($_SESSION['username']) && $_SESSION['username'] != '') { ?>
    <form action="../../action_logout.php" method="post">
      <a href="../user/register.php"><?=$_SESSION['username']?></a>
      <input type="submit" value="Logout">
    </form>
  <?php } else { ?>
  <!-- login -->
  <section id="login">
    <h3>Login</h3>
    <hr>

    <form action="../../action_login.php" method="post">
      <input type="text" placeholder=" Write your username" name="username"><br>
      <input type="password" placeholder="Write your password" name="password"><br>
      <div>
        <input class="button" type="submit" value="Login">
        <!--<a href="register.php">Register</a>-->
      </div>
    </form>
  </section>
  <?php } ?>
</div>

