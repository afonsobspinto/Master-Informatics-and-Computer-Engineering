@extends('layouts.base', ['categories' => $categories])

@section('title', 'FAQs')

@section('resources')
@parent
<link rel="stylesheet" href="{{ asset('css/faq.css') }}">
@endsection

@section('content')


@endsection
