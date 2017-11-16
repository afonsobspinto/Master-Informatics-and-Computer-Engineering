<!DOCTYPE html>
<html lang="en-US">
<head>
		<title>Login below!</title>
		<!--<link rel="stylesheet" type="text/css" href="css/style.css">--> 
		<link href="https://fonts.googleapis.com/css?family=Comfortaa" rel="stylesheet">
</head>
<body>
	<div class="gridbox gridcenter">
		<div class="center">
	<h1 id="title">Member Log In</h1>

	<!-- <span>or <a href="register.php">register here</a></span> -->
	<div id="login">

	<form id="login_form" action="dbActions/action_login.php" method="post">
		<input id="login_email" type="text" placeholder="username" name="email" required="required">
		<input id="login_password" type="password" placeholder="password" name="password" required="required">
		<input id="submit_login" type="submit" name="submit_login" value="Log In" title="Welcome!">
	</form>

	<a href="" class="forgot_password">Forgot your password?</a>
		</div>
	
	</div>
	</div>
	<!-- DUVIDAAAAA: class? -->
	<!--<p class="no_account">Don't have an account?</p>
	<p><a href="" class="sign_up">Sign Up</a></p>-->
	<p class="no_account">New to to-do-list-name?<a href="" class="sign_up">Create an account.</a></p>
	

</body> 
</html>