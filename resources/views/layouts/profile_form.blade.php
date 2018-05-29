@extends('layouts.base', ['categories' => $categories])

@section('resources')
    @parent
    <script src="{{ asset('js/profile_edit.js') }}" defer></script>
    <link rel="stylesheet" href="{{ asset('css/authentication.css') }}">
@endsection

@section('content')

    <div class="container pb-5">
        <form class="mt-5 d-flex flex-column mx-auto p-4 bg-light" id="user_form" method="POST" enctype="multipart/form-data" action="@yield('form-url')">
            @yield('form-type')
            {{ csrf_field() }}
            <h1 class="mx-auto pt-3 mb-5 font-weight-bold"> @yield('form-title') </h1>
            <div class="form-group{{ $errors->has('username') ? ' has-error' : '' }} control-label">
                <label for="username">Username:</label>
                <div>
                    <input id="username" type="text" class="form-control" name="username" value="{{ old('username') ?? $user->username ?? '' }}" required autofocus>
                    @include('components.form_error_msg', ['errorName' => 'username'])
                </div>
            </div>

            <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                <label for="email">Email:</label>
                <div>
                    <input id="email" type="email" class="form-control control-label" name="email" value="{{ old('email') ?? $user->email ?? '' }}" required>

                    @include('components.form_error_msg', ['errorName' => 'email'])
                </div>
            </div>

            {{-- profile picture --}}
            <div class="form-group mt-4">
                <label for="profile-picture">Profile Picture:</label>
                <div>
                    <img id="profile-avatar" class="form-picture" src="{{ $profile_picture }}" alt="Profile Picture">
                </div>
                <input type="file" class="form-control-file" id="profile-picture" accept="image/*" name="picture">
                @include('components.form_error_msg', ['errorName' => 'picture'])
            </div>

            <div class="form-row">
                <div class="form-group col-6">
                    <label for="first-name">First Name:</label>
                    <input type="text" class="form-control" id="first-name" name="first_name" aria-describedby="first-name" value="{{ old('first_name') ?? $user->first_name ?? '' }}" required>
                </div>
                <div class="form-group col-6">
                    <label for="last-name">Last Name:</label>
                    <input type="text" class="form-control" id="last-name" name="last_name" aria-describedby="last-name" value="{{ old('last_name') ?? $user->last_name ?? '' }}" required>
                </div>
            </div>

            <div class="form-group">
                <label for="address">Address:</label>
                <input type="text" class="form-control" id="address" name="address" aria-describedby="address" value="{{ old('address') ?? $user->address ?? '' }}" required>
            </div>

            <div class="form-row">
                <div class="form-group col-6 col-md-4">
                    <label for="country">Country:</label>
                    <select class="form-control" id="country" name="country" aria-describedby="Country" required>
                        @yield('countries')
                    </select>
                </div>

                <div class="form-group col-6 col-md-4">
                    <label for="city">City:</label>
                    <select class="form-control" id="city" name="city" aria-describedby="City" required>
                        @yield('cities')
                    </select>
                </div>

                <div class="form-group col-md-4">
                    <label for="zip_code">Zip-code:</label>
                    <input type="text" class="form-control" id="zip_code" name="zip_code" aria-describedby="zip_code" value="{{ old('zip_code') ?? $user->zip_code ?? '' }}" pattern="{{ $zip_code_regex }}" title="Please enter an alphanumeric sequence possibly separated by a space or dash" required>
                    @include('components.form_error_msg', ['errorName' => 'zip_code'])
                </div>

            </div>

            @yield('form-bottom')
        </form>
    </div>
    </div>
@endsection