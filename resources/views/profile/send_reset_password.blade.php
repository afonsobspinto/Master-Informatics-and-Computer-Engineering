@extends('layouts.base', ['categories' => $categories])

@section('title', 'Login')

@section('resources')
    @parent

    <link rel="stylesheet" href="{{ asset('css/authentication.css') }}">
@endsection

@section('content')

    <div class="container">
        <form action="{{ url('profile/password/send-email') }}" method="POST" class="mt-5 d-flex flex-column mx-auto p-4 bg-light" id="login">
            {{ csrf_field() }}
            <h1 class="mx-auto pt-3 mb-5 font-weight-bold"> Password Reset</h1>
            <div class="form-group">
                <label for="email">Email:</label>
                <div>
                    <input id="email" type="email" class="form-control" name="email" required autofocus>
                </div>
            </div>
            <button type="submit" class="btn btn-primary mx-auto w-50 mb-3 mt-4">Send Password Reset</button>
        </form>
    </div>
@endsection








