@extends('layouts.base', ['categories' => $categories])

@section('resources')
@parent
<link rel="stylesheet" href="{{ asset('css/authentication.css') }}">
@endsection

@section('content')

<div class="container pb-5">
    <form class="mt-5 d-flex flex-column mx-auto p-4 bg-light" id="register" method="POST" action="{{ route('register') }}">
        {{ csrf_field() }}
        <h1 class="mx-auto pt-3 mb-5 font-weight-bold"> Register</h1>
        <div class="form-group{{ $errors->has('name') ? ' has-error' : '' }} control-label">
            <label for="name">Username:</label>
            <div>
                <input id="name" type="text" class="form-control" name="name" value="{{ old('name') }}" required autofocus>
                @if ($errors->has('name'))
                <span class="help-block">
                    <strong>{{ $errors->first('name') }}</strong>
                </span>
                @endif
            </div>
        </div>

        <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
            <label for="email">Email:</label>
            <div>
                <input id="email" type="email" class="form-control control-label" name="email" value="{{ old('email') }}" required>

                @if ($errors->has('email'))
                <span class="help-block">
                    <strong>{{ $errors->first('email') }}</strong>
                </span>
                @endif
            </div>
        </div>

        <div class="form-group mt-4">
            <label for="profile-picture">Profile Picture:</label>
            <input type="file" class="form-control-file" id="profile-picture">
        </div>

        <div class="form-row">
            <div class="form-group col-6">
                <label for="first-name">First Name:</label>
                <input type="text" class="form-control" id="first-name" aria-describedby="first-name" required>
            </div>
            <div class="form-group col-6">
                <label for="last-name">Last Name:</label>
                <input type="text" class="form-control" id="last-name" aria-describedby="last-name" required>
            </div>
        </div>

        <div class="form-group">
            <label for="address">Address:</label>
            <input type="text" class="form-control" id="address" aria-describedby="address" required>
        </div>

        <div class="form-row">
            <div class="form-group col-6 col-md-4">
                <label for="country">Country:</label>
                <input type="text" class="form-control" id="country" aria-describedby="Country" required>
            </div>

            <div class="form-group col-6 col-md-4">
                <label for="city">City:</label>
                <input type="text" class="form-control" id="city" aria-describedby="City" required>
            </div>

            <div class="form-group col-md-4">
                <label for="zip-code">Zip-code:</label>
                <input type="text" class="form-control" id="zip-code" aria-describedby="Zip-Code" required>
            </div>

        </div>

        <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }} mt-4 control-label">
            <label for="password">Password:</label>
            <div>
                <input id="password" type="password" class="form-control" name="password" required>

                @if ($errors->has('password'))
                <span class="help-block">
                    <strong>{{ $errors->first('password') }}</strong>
                </span>
                @endif
            </div>
        </div>

        <div class="form-group">
            <label for="password-confirm" class="control-label">Confirm Password</label>
            <div>
                <input id="password-confirm" type="password" class="form-control" name="password_confirmation" required>
            </div>
        </div>

            <a href="{{ url('/login') }}" class="text-center mb-2">Already have an account? Login</a>
            <button type="submit" class="btn btn-primary mx-auto w-50 mb-3 mt-4">Register</button>
    </form>
</div>
</div>
@endsection