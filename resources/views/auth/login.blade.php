@extends('layouts.base', ['categories' => $categories])

@section('title', 'Login')

@section('resources')
@parent

<link rel="stylesheet" href="{{ asset('css/authentication.css') }}">
@endsection

@section('content')

<div class="container">
    <form action="{{ route('login') }}" method="POST" class="mt-5 d-flex flex-column mx-auto p-4 bg-light" id="login">
        {{ csrf_field() }}
        <h1 class="mx-auto pt-3 mb-5 font-weight-bold"> Login</h1>
        <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
            <label for="email">Email:</label>
            <div>
                <input id="email" type="email" class="form-control" name="email" value="{{ old('email') }}" required autofocus>

                @if ($errors->has('email'))
                <span class="help-block">
                    <strong>{{ $errors->first('email') }}</strong>
                </span>
                @endif
            </div>
        </div>
        <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
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
        <a class="btn btn-link" href="{{ url('/register') }}">
            Don't have an account? Register
        </a>
        <a class="btn btn-link" href="{{ url('/profile/password/send-email') }}">
            Forgot your password?
        </a>
        <button type="submit" class="btn btn-primary mx-auto w-50 mb-3 mt-4">Login</button>
    </form>
</div>

@endsection
