@extends('layouts.profile_form', ['categories' => $categories, 'countries' => $countries, 'user'=> [] ])

@section('title', 'Register')

@section('form-title', 'Register')

@section('form-url', url('register'))

@section('countries')
    <option value="" {{ old('country') ? '' : 'selected' }}>All Countries</option>
    @foreach($countries as $country)
        <option value="{{ $country->id }}" {{ old('country') == $country->id ? 'selected' : '' }}>{{ ucfirst($country->country) }}</option>
    @endforeach
@endsection


@section('cities')

    @if(old('city') && old('country'))
        @php
            $country = $countries->where('id', '=', old('country') )->first();
            $cities = $country->getAllCities();
        @endphp

        @foreach($cities as $city)
            <option value="{{ $city->id }}" {{ old('city') == $city->id ? 'selected' : '' }}>{{ ucfirst($city->city) }}</option>
        @endforeach
    @endif
@endsection

@section('form-bottom')
    @include('profile.components.new_password_inputs', [ 'name_prefix' => 'password', 'pretty_name' => 'New Password', 'required' => true ])

    <a href="{{ url('/login') }}" class="text-center mb-2">Already have an account? Login</a>
    <button type="submit" class="btn btn-primary mx-auto w-50 mb-3 mt-4">Register</button>
@endsection