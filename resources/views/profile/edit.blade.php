@extends('layouts.profile_form', ['categories' => $categories, 'user' => $user])

@section('title', 'Edit Profile')

@section('form-title', 'Edit Profile')

@section('form-url', url('register'))

@section('form-type')
    <input name="_method" type="hidden" value="PUT">
@endsection

@section('form-bottom')
    <button type="submit" class="btn btn-primary mx-auto w-50 mb-3 mt-4">Update</button>
    <button type="submit" class="btn btn-secondary mx-auto w-50 mb-3 mt-4">Cancel</button>
@endsection