
<!DOCTYPE html>
<html>
<head>
    <title>Bidbay: account email confirmation</title>
</head>
<body>
    <h2>BidBay: account email confirmation</h2>
<br/>
Hi {{$user['username']}}. Please verify your email ({{$user['email']}}) to activate your account.
<br/>
<a href="{{url('profile/verify', $user->verifyUser->token)}}">Verify Email</a> <br>
<p>Please ignore if this email isn't meant for you.</p>
</body>
</html>