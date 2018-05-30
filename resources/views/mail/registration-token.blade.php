
<!DOCTYPE html>
<html>
<head>
    <title>Welcome Email</title>
</head>
<body>
    <h2>BidBay account email confirmation</h2>
<br/>
Please verify your email ({{$user['email']}}) to activate your account
<br/>
<a href="{{url('profile/verify', $user->verifyUser->token)}}">Verify Email</a>
</body>
</html>