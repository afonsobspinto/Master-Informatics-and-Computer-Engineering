
<!DOCTYPE html>
<html>
<head>
    <title>Bidbay: Password Reset</title>
</head>
<body>
<h2>Bidbay: Password Reset</h2>
<br/>
Hi {{$user['username']}}. You've received this email because you're requested a password reset. If you didn't please ignore this message.
<br/>
<a href="{{url('profile/password/reset', $user->verifyUser->token)}}">Reset Password</a> <br>
</body>
</html>