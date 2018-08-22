@extends('layouts.base', ['categories' => []])

@section('title', 'Reset password')

@section('resources')
    @parent

    <link rel="stylesheet" href="{{ asset('css/authentication.css') }}">
@endsection

@section('content')

<div class="container">
    <form class="mt-5 d-flex flex-column mx-auto p-4 bg-light" method="POST" action="{{ route('password.request') }}" style="width:30rem;">
        {{ csrf_field() }}

        <input type="hidden" name="token" value="{{ $token }}">
        <h1 class="mx-auto pt-3 mb-5 font-weight-bold"> Reset Password</h1>
        <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
            <label for="email" class="control-label">E-Mail Address</label>
            <div>
                <input id="email" type="email" class="form-control" name="email" value="{{ $email or old('email') }}" required autofocus>

                @if ($errors->has('email'))
                    <span class="help-block">
                    <strong>{{ $errors->first('email') }}</strong>
                </span>
                @endif
            </div>
        </div>

        <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
            <label for="password" class=" control-label">Password</label>

            <div>
                <input id="password" type="password" class="form-control" name="password" required>

                @if ($errors->has('password'))
                    <span class="help-block">
                    <strong>{{ $errors->first('password') }}</strong>
                </span>
                @endif
            </div>
        </div>

        <div class="form-group{{ $errors->has('password_confirmation') ? ' has-error' : '' }}">
            <label for="password-confirm" class="control-label">Confirm Password</label>
            <div>
                <input id="password-confirm" type="password" class="form-control" name="password_confirmation" required>

                @if ($errors->has('password_confirmation'))
                    <span class="help-block">
                    <strong>{{ $errors->first('password_confirmation') }}</strong>
                </span>
                @endif
            </div>
        </div>

        <button type="submit" class="btn btn-primary mx-auto w-50 mb-3 mt-4">
            Reset Password
        </button>
    </form>
</div>

@endsection
