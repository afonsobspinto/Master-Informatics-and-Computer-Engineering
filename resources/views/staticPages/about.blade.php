@extends('layouts.base', ['categories' => $categories])

@section('title', 'About')

@section('resources')
@parent
<link rel="stylesheet" href="{{ asset('css/about.css') }}">
@endsection

@section('content')


@endsection
