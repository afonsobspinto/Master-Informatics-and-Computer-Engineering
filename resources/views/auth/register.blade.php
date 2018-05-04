@extends('layouts.profile_form', ['categories' => $categories, 'user'=> [] ])

@section('title', 'Register')

@section('form-title', 'Register')

@section('form-url', url('register'))

@section('form-bottom')
<a href="{{ url('/login') }}" class="text-center mb-2">Already have an account? Login</a>
<button type="submit" class="btn btn-primary mx-auto w-50 mb-3 mt-4">Register</button>
@endsection